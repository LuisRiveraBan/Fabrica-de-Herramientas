package com.example.Service;

import com.example.DTO.CargoDTO;
import com.example.DTO.LineaDTO;
import com.example.Model.CargoEntity;


import com.example.Model.LineaEntity;
import com.example.Repository.CargoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    public List<CargoEntity> listarcargo()throws Exception{
        return cargoRepository.findAll();
    }

    public CargoEntity listarporCargo(Integer id) throws  Exception{
        Optional<CargoEntity> optional = cargoRepository.findById(id);
        if (optional.isPresent()){
            return optional.get();
        }else{
            return null;
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public CargoEntity registrar(CargoDTO dto) throws Exception{
        CargoEntity entity = new CargoEntity();
        entity.setDescripcion(dto.getDescripcion());
        cargoRepository.save(entity);
        return entity;
    }
    @Transactional(rollbackOn = Exception.class)
    public CargoEntity actualizar(CargoDTO dto, Integer id) throws  Exception{
        Optional<CargoEntity> optional = cargoRepository.findById(id);
        if(optional.isPresent()){
            CargoEntity entity = optional.get();
            entity.setDescripcion(dto.getDescripcion());
            cargoRepository.save(entity);
            return cargoRepository.findByCodigoCargo(id).get();
        }else {
            return null;
        }

    }
    @Transactional(rollbackOn = Exception.class)
    public void eliminar(Integer id) throws Exception{
        Optional<CargoEntity> optional = cargoRepository.findById(id);
        if (optional.isPresent()){
            cargoRepository.delete(optional.get());
        }
    }


}
