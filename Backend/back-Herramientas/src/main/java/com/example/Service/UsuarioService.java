package com.example.Service;

import com.example.DTO.LoginDTO;

import com.example.DTO.PiezasDTO;
import com.example.DTO.UsuarioDTO;

import com.example.Model.*;
import com.example.Repository.FabricaRepository;
import com.example.Repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UsuarioService {


    //Importamos el repository para poder obtener los metodos necesarios
    @Autowired
    private UsuarioRepository repository;


    //Creamos varibles globales para poder ser llamadas en otra Clase
    Integer codigoFabrica;
    Integer codigoUsuario;

    Integer codigoCargo;

    String estado;

    public Integer getCodigoFabrica() {
        return codigoFabrica;
    }

    public Integer getCodigoUsuario() {
        return codigoUsuario;
    }

    public  String getEstado(){return  estado;}



    //Metodo que lista la tabla Usuarios
    public List<UsuarioEntity> listarusuario()throws Exception{
        return repository.findAll();
    }


    //Metodo que busca por Codigo de Usuario
    public UsuarioEntity listarporUsuario(Integer id) throws Exception{
        Optional<UsuarioEntity> optional = repository.findById(id);
        if(optional.isPresent()){
            return optional.get();
        }else {
            return null;
        }
    }

    //Ponemos el @Transactional porque vamos hacer un transacion de data en este caso el login de paso evita que se caiga
    // el programa
    @Transactional(rollbackOn = Exception.class)
    public UsuarioEntity Login(LoginDTO dto) throws Exception{
        Optional<UsuarioEntity> optionalEntity =
                repository.findByCorreoElectronicoAndContrasena(dto.getUsername(), dto.getPassword());
        if (optionalEntity.isPresent()) {
            UsuarioEntity usuario = optionalEntity.get();
            codigoFabrica = usuario.getFabrica().getCodigoFabrica();
            codigoUsuario = usuario.getCodigoUsuario();
            codigoCargo = usuario.getCargo().getCodigoCargo();
            estado = usuario.getEstado();
            // Imprimir el valor de codigoFabrica en la consola
            Logger logger = Logger.getLogger(UsuarioService.class.getName());
            logger.info("Código de fábrica obtenido: " + codigoFabrica);
            logger.info("Código de Usuario obtenido: " + codigoUsuario);
            logger.info("Código de Cargo obtenido: " + codigoCargo);
            logger.info("Estado de usuario:" + estado);
            return usuario;

        } else {
            throw new Exception("Credenciales inválidas");
        }
    }


    //Metodo de Registrar Usuarios
    @Transactional(rollbackOn = Exception.class)
    public UsuarioEntity registrar(UsuarioDTO dto) throws Exception{
        UsuarioEntity entity = new UsuarioEntity();
        entity.setApellidos(dto.getApellidos());
        entity.setNombre(dto.getNombre());
        entity.setCorreoElectronico(dto.getCorreoElectronico());
        entity.setContrasena(dto.getContrasena());
        entity.setEstado(dto.getEstado());
        entity.setCargo(new CargoEntity(dto.getCargo()));
        entity.setFabrica(new FabricaEntity(dto.getFabrica()));
        entity.setImagen(dto.getImagen());
        repository.save(entity);
        return entity;
    }


    //Metodo de Actualizar Usuarios
    @Transactional(rollbackOn = Exception.class)
    public UsuarioEntity actualizar(UsuarioDTO dto, Integer id) throws Exception{
        Optional<UsuarioEntity> optional = repository.findById(id);
        if(optional.isPresent()){
            UsuarioEntity entity = optional.get();
            entity.setApellidos(dto.getApellidos());
            entity.setNombre(dto.getNombre());
            entity.setCorreoElectronico(dto.getCorreoElectronico());
            entity.setContrasena(dto.getContrasena());
            entity.setEstado(dto.getEstado());
            entity.setCargo(new CargoEntity(dto.getCargo()));
            entity.setFabrica(new FabricaEntity(dto.getFabrica()));
            entity.setImagen(dto.getImagen());
            repository.save(entity);
            return repository.findByCodigoUsuario(id).get();
        }else {
            return null;

        }

    }

    //Metodo de Eliminar Usuarios
    @Transactional(rollbackOn = Exception.class)
    public void eliminar(Integer id) throws Exception{
        Optional<UsuarioEntity> optional = repository.findById(id);
        if (optional.isPresent()){
            repository.delete(optional.get());
        }
    }

}
