package com.example.Service;

import com.example.DTO.FabricaDTO;
import com.example.DTO.LineaDTO;
import com.example.Model.FabricaEntity;
import com.example.Model.LineaEntity;

import com.example.Repository.LineaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LineaService {

    @Autowired
    private LineaRepository lineaRepository;

    public List<LineaEntity> listarlinea() throws Exception{
        return lineaRepository.findAll();
    }

    public  LineaEntity listarporLinea(Integer id) throws  Exception{
        Optional<LineaEntity> optional = lineaRepository.findById(id);
        if (optional.isPresent()){
            return optional.get();
        }else{
            return null;
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public LineaEntity registrar(LineaDTO lineaDTO) throws Exception{
        LineaEntity entity = new LineaEntity();
        entity.setDescripcion(lineaDTO.getDescripcion());
        lineaRepository.save(entity);
        return entity;
    }

    @Transactional(rollbackOn = Exception.class)
    public LineaEntity actualizar(LineaDTO dto, Integer id) throws  Exception{
        Optional<LineaEntity> optional = lineaRepository.findById(id);
        if(optional.isPresent()){
            LineaEntity entity = optional.get();
            entity.setDescripcion(dto.getDescripcion());
            lineaRepository.save(entity);
            return lineaRepository.findByCodigoLinea(id).get();
        }else {
            return null;
        }

    }

    @Transactional(rollbackOn = Exception.class)
    public void eliminar(Integer id) throws Exception{
        Optional<LineaEntity> optional = lineaRepository.findById(id);
        if (optional.isPresent()){
            lineaRepository.delete(optional.get());
        }
    }

}
