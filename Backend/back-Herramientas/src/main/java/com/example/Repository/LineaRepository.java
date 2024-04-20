package com.example.Repository;

import com.example.Model.LineaEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LineaRepository extends JpaRepository<LineaEntity,Integer> {
    Optional<LineaEntity> findByCodigoLinea(Integer codigoLinea);
}
