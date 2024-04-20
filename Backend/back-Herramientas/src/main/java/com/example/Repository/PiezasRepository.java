package com.example.Repository;

import com.example.Model.FabricaEntity;
import com.example.Model.LineaEntity;
import com.example.Model.PiezasEntity;


import com.example.Model.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PiezasRepository extends JpaRepository<PiezasEntity,Integer>  {


    //Obtenes el metedo de buscar usuario
    List<PiezasEntity> findByUsuario(UsuarioEntity  usuario);

    //Obtener el metodo de buscar Usuario y Fabrica a la vez
    List<PiezasEntity> findByUsuarioAndFabrica(UsuarioEntity Usuario, FabricaEntity fabrica);

    //Obtenemos el metedo de buscar por Piezas que nomas soporta un solo resultado
    Optional <PiezasEntity> findByCodigoPiezas(Integer codigoPiezas);

    //Obtenemos el metodo para buscar por Codigo de linea
    List<PiezasEntity> findAllByCodigoLinea(LineaEntity  codigoLinea );

    //Obtenemos el metodo de buscar Linea por Usuario
    List<PiezasEntity> findByCodigoLineaAndUsuario(LineaEntity  codigoLinea, UsuarioEntity Usuario);

}
