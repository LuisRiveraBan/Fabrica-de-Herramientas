package com.example.Service;

import com.example.DTO.FabricaDTO;
import com.example.Model.FabricaEntity;
import com.example.Repository.FabricaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FabricaService {

    @Autowired
    private FabricaRepository repository;

    public List<FabricaEntity> listarFabrica() throws Exception{
        return repository.findAll();
    }

    public FabricaEntity ListarporFabrica(Integer id) throws Exception{
        Optional<FabricaEntity> optional = repository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }else {
            return null;
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public FabricaEntity registrar(FabricaDTO dto) throws Exception{
        FabricaEntity entity = new FabricaEntity();
        entity.setDescripcion(dto.getDescripcion());
        entity.setTipo(dto.getTipo());
        repository.save(entity);
        return entity;
    }

    @Transactional(rollbackOn = Exception.class)
    public FabricaEntity actualizar(FabricaDTO dto, Integer id) throws  Exception{
        Optional<FabricaEntity> optional = repository.findById(id);
        if(optional.isPresent()){
            FabricaEntity entity = optional.get();
            entity.setDescripcion(dto.getDescripcion());
            entity.setTipo(dto.getTipo());
            repository.save(entity);
            return repository.findByCodigoFabrica(id).get();
        }else {
            return null;
        }

    }

    @Transactional(rollbackOn = Exception.class)
    public void eliminar(Integer id) throws Exception{
        Optional<FabricaEntity>  optional = repository.findById(id);
        if (optional.isPresent()){
            repository.delete(optional.get());
        }
    }
}
