package com.example.Repository;

import com.example.Model.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

    //public List<UsuarioEntity> findByFabrica(FabricaEntity fabrica);

    //Metodo que buscar el id de Usuario
    Optional<UsuarioEntity> findByCodigoUsuario(Integer codigoUsuario);

    //Metodo que busca a la par CorreoElectronico y Contraseña para el login
    Optional<UsuarioEntity> findByCorreoElectronicoAndContrasena(String correoElectronico, String contrasena);


    //Optional<UsuarioEntity> findByCorreoElectronico(String correoElectronico);
    //Optional<UsuarioEntity> findByContrasena(String contrasena);
}
