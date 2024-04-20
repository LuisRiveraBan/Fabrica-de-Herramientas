package com.example.Repository;

import com.example.Model.FabricaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FabricaRepository  extends JpaRepository<FabricaEntity,Integer> {

    Optional<FabricaEntity> findByCodigoFabrica(Integer codigoFabrica);

}
