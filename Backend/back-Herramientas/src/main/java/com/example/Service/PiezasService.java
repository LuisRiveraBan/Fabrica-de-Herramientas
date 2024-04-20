package com.example.Service;

import com.example.DTO.PiezasDTO;
import com.example.Model.FabricaEntity;
import com.example.Model.LineaEntity;
import com.example.Model.PiezasEntity;
import com.example.Model.UsuarioEntity;
import com.example.Repository.FabricaRepository;
import com.example.Repository.PiezasRepository;
import com.example.Repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PiezasService {


    //Autorizamos y Importamos el repository para obtener los metodos
    @Autowired
    private PiezasRepository repository;

    //Autorizamos y importamos para poder tener acceso a los atributos de la tabla fabrica
    @Autowired
    private  FabricaRepository fabricaRepository;

    //Autorizamos y Importamos el repository para obtener los metodos de Usuario
    @Autowired
    private UsuarioRepository usuarioRepository;


    //Autorizamos y Importamos para poder tener acceso a las variables necesarias para los filtros
    @Autowired
    private UsuarioService usuarioService;


    //Lista las Piezas sin filtros
    public List<PiezasEntity> listarpiezas()throws Exception{
        return repository.findAll();
    }


    //Metodo para Filtrar El resultado de la lista y Ayudar a sumar y tener la cantidad de las piezas segun
    //El Usuario seleccionado y su total
    public Map<String, Object> listarPorUsuario(Integer id) throws  Exception{
        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setCodigoUsuario(id);
        int cantidadTotal = 0;
        List<PiezasEntity> piezasList = repository.findByUsuario(usuario);

        for (PiezasEntity piezas : piezasList) {
            int cantidadPiezas = piezas.getCantidad();
            cantidadTotal += cantidadPiezas;
        }

        Map<String, Object> resultados = new HashMap<>();
        resultados.put("Piezas :", piezasList);
        resultados.put("Cantidad total: ", cantidadTotal);
        return  resultados;
    }


    //Metodo de busca por el codigo de piezas para poder encontrarlo
    public PiezasEntity buscarporid(Integer id) throws Exception{
        Optional<PiezasEntity> optional = repository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }else {
            return null;
        }
    }

    //Metodo que busca segun el codigo de linea y lista el total de linea segun las piezas listadas
    public Map<String, Object> ListarporLinea(Integer id) throws Exception {
        LineaEntity linea = new LineaEntity();
        linea.setCodigoLinea(id);
        int cantidadTotal = 0;
        List<PiezasEntity> piezasList = repository.findAllByCodigoLinea(linea);

        for (PiezasEntity piezas : piezasList) {
            int cantidadPiezas = piezas.getCantidad();
            cantidadTotal += cantidadPiezas;
        }

        Map<String, Object> resultados = new HashMap<>();

        resultados.put("Cantidad total: ", cantidadTotal);
        return  resultados;
    }


    //Filtro que lista Segun  la linea selecionado y Usuario seleccionado asi obtiene los datos mas precisos y tambien te da el total
    public Map<String, Object> ListarporLineayUsuario(Integer id, Integer Usuario) throws Exception {
        LineaEntity linea = new LineaEntity();
        UsuarioEntity usuario = new UsuarioEntity();
        int cantidadTotal = 0;
        linea.setCodigoLinea(id);
        usuario.setCodigoUsuario(Usuario);
        List<PiezasEntity> piezasList = repository.findByCodigoLineaAndUsuario(linea, usuario);

        for (PiezasEntity piezas : piezasList) {
            int cantidadPiezas = piezas.getCantidad();
            cantidadTotal += cantidadPiezas;
        }

        Map<String, Object> resultados = new HashMap<>();
        resultados.put("Lineas :", piezasList);
        resultados.put("Cantidad total: ", cantidadTotal);
        return  resultados;
    }



    //Filtro que lista segun las fechas obtenidas y de paso Suma su total de piezas encontradas
    public Map<String, Object> Listarporfecha(Date Fechainicio, Date Fechafinal) throws Exception {
        List<PiezasEntity> result = new ArrayList<>();
        int cantidadTotal = 0;

        for (PiezasEntity piezas : listarpiezas()) {
            Date fechaPieza = piezas.getFecha();

            if (fechaPieza.compareTo(Fechainicio) >= 0 && fechaPieza.compareTo(Fechafinal) <= 0) {
                int cantidadPieza = piezas.getCantidad();
                result.add(piezas);
                cantidadTotal += cantidadPieza; // Incrementa la cantidad total
            }
        }

        Map<String, Object> resultados = new HashMap<>();
        resultados.put("PiezasEnRango", result);
        resultados.put("CantidadTotal", cantidadTotal);

        return resultados;
    }

    //Filtro que lista segun el rango de fechas tambien segun el usuario seleccionado y te dice el total del rango de piezas
    // seleccionadas segun el usuario y el total de lineas segun el mismo rango y el mismo usuario
    public Map<String, Object> ListarporfechayUsuario(Date Fechainicio, Date Fechafinal, Integer usuario, Integer Linea) throws Exception {
        List<PiezasEntity> result = new ArrayList<>();
        LineaEntity linea = new LineaEntity();
        int cantidadTotal = 0;
        int cantidadTotaLinea = 0;

        linea.setCodigoLinea(Linea);
        UsuarioEntity usuarioEntity = obtenerUsuarioPorId(usuario);

        if (usuarioEntity == null) {
            throw new Exception("El usuario con ID " + usuario + " no existe.");
        }

        // Buscar todas las piezas asociadas a la línea específica
        List<PiezasEntity> piezasByLinea = repository.findAllByCodigoLinea(linea);

        for (PiezasEntity piezas : listarpiezas()) {
            Date fechaPieza = piezas.getFecha();
            if (usuario.equals(piezas.getUsuario().getCodigoUsuario()) && fechaPieza.compareTo(Fechainicio) >= 0 && fechaPieza.compareTo(Fechafinal) <= 0) {
                int cantidadPieza = piezas.getCantidad();
                result.add(piezas);
                cantidadTotal += cantidadPieza; // Incrementa la cantidad total de piezas

                // Verifica si la pieza está asociada a la línea deseada
                if (piezasByLinea.contains(piezas)) {
                    cantidadTotaLinea += cantidadPieza; // Incrementa la cantidad total de piezas por línea
                }
            }
        }

        Map<String, Object> resultados = new HashMap<>();
        resultados.put("PiezasEnRango", result);
        resultados.put("CantidadTotal", cantidadTotal);
        resultados.put("CantidadTotaLinea", cantidadTotaLinea);

        return resultados;
    }



    //variables globales para poder almacenar los valores
    private Integer codigoFabrica;
    private Integer codigoUsuario;


    //Metodo que lista segun el id de la fabrica y el id del usuario para poder listar las piezas correctas sin margen de error
    public List<PiezasEntity> listarFyU(Integer idFabrica, Integer IdUsuario)throws Exception{

        codigoFabrica = usuarioService.getCodigoFabrica();
        codigoUsuario = usuarioService.getCodigoUsuario();

        UsuarioEntity usuario = new UsuarioEntity();
        FabricaEntity fabrica = new FabricaEntity();
        fabrica.setCodigoFabrica(idFabrica);
        usuario.setCodigoUsuario(IdUsuario);
        codigoUsuario = obtenerUsuarioPorId(IdUsuario).getCodigoUsuario();
        codigoFabrica = obtenerFabricaPorId(idFabrica).getCodigoFabrica();
        return repository.findByUsuarioAndFabrica(usuario, fabrica);
    }

     //Listas las piezas por id
    public PiezasEntity ListarPorPieza(Integer id) throws Exception{
        Optional<PiezasEntity> optional = repository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }else {
            return null;
        }
    }

    //Listar Por fabrica simple
    /*
    public List<PiezasEntity> listarPorFabrica(Integer id) throws  Exception{
        FabricaEntity fabrica = new FabricaEntity();
        fabrica.setCodigoFabrica(id);
        fabrica1 = obtenerFabricaPorId(id).getCodigoFabrica();
        return repository.findByFabrica(fabrica);
    }



     //Listar de forma predeterminada
    /*
    private Integer id_lima = 103;
    private Integer id_Arequipa = 102;
    private Integer id_Piura = 101;

    public List<PiezasEntity> ListarPorLima() throws Exception{
        FabricaEntity fabrica = new FabricaEntity();
        fabrica.setCodigoFabrica(id_lima);
        return repository.findByFabrica(fabrica);
    }

    public List<PiezasEntity> ListarPorPiura() throws Exception{
        FabricaEntity fabrica = new FabricaEntity();
        fabrica.setCodigoFabrica(id_Piura);
        return repository.findByFabrica(fabrica);
    }

    public List<PiezasEntity> ListarPorArequipa() throws Exception{
        FabricaEntity fabrica = new FabricaEntity();
        fabrica.setCodigoFabrica(id_Arequipa);
        return repository.findByFabrica(fabrica);
    }*/


    //Verifica los id y los busca para evitar errores en el sistema
    private FabricaEntity obtenerFabricaPorId(Integer idFabrica) throws Exception {
        Optional<FabricaEntity> optionalFabrica = fabricaRepository.findById(idFabrica);

        if (optionalFabrica.isPresent()) {
            return optionalFabrica.get();
        } else {
            throw new Exception("La fábrica con ID proporcionado no existe");
        }
    }

    //Verifica los id y los busca para evitar errores en el sistema
    private UsuarioEntity obtenerUsuarioPorId(Integer idUsuario) throws  Exception{
        Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(idUsuario);

        if(optionalUsuario.isPresent()){
            return optionalUsuario.get();

        }else {
            throw new Exception("El usuario no existe");
        }
    }

    //Agrega nuevas piezas
    @Transactional(rollbackOn = Exception.class)
    public PiezasEntity registrar(PiezasDTO dto) throws Exception{
        PiezasEntity entity = new PiezasEntity();
        entity.setFecha(dto.getFecha());
        entity.setFabrica(new FabricaEntity(codigoFabrica)); //Segun los id pasados por el login puede hacer un registro mas preciso
        entity.setUsuario(new UsuarioEntity(codigoUsuario));
        entity.setCodigoLinea(new LineaEntity(dto.getCodigoLinea()));
        entity.setCantidad(dto.getCantidad());
        repository.save(entity);
        return entity;
    }

    //Actualiza las piezas
    @Transactional(rollbackOn = Exception.class)
    public PiezasEntity actualizar(PiezasDTO dto, Integer id) throws Exception{
        Optional<PiezasEntity> optional = repository.findById(id);
        if(optional.isPresent()){
            PiezasEntity entity = optional.get();
            entity.setFecha(dto.getFecha());
            entity.setFabrica(new FabricaEntity(codigoFabrica));
            entity.setUsuario(new UsuarioEntity(codigoUsuario));
            entity.setCodigoLinea(new LineaEntity(dto.getCodigoLinea()));
            entity.setCantidad(dto.getCantidad());
            repository.save(entity);
            return repository.findByCodigoPiezas(id).get();
        }else {
            return null;

        }

    }
    //Elimina las piezas
    @Transactional(rollbackOn = Exception.class)
    public void eliminar(Integer id) throws Exception{
        Optional<PiezasEntity> optional = repository.findById(id);
        if (optional.isPresent()){
            repository.delete(optional.get());
        }
    }
}
