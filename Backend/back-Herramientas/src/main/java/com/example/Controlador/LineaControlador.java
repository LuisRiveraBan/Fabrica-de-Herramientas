package com.example.Controlador;

import com.example.DTO.LineaDTO;
import com.example.DTO.RespuestaDTO;
import com.example.Service.LineaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/Linea")
public class LineaControlador {

    @Autowired
    LineaService service;

    @GetMapping()
    public ResponseEntity<RespuestaDTO> Listar() throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con Éxito", service.listarlinea());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public  ResponseEntity<RespuestaDTO> listarporLinea(@PathVariable Integer id) throws Exception{
        RespuestaDTO respuesta = new RespuestaDTO("Ok", "Listado Corretamente", service.listarporLinea(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RespuestaDTO> registrarLinea(@RequestBody LineaDTO dto) throws Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK","Registrado Correctamente",service.registrar(dto));
        return new ResponseEntity<>(respuesta,HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RespuestaDTO> actualizar(@RequestBody LineaDTO dto, @PathVariable Integer id) throws  Exception{
        service.actualizar(dto, id);
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Actualizado con exito", service.listarporLinea(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RespuestaDTO> eliminar(@PathVariable Integer id) throws Exception{
        service.eliminar(id);
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Eliminado con exito",":)");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

}
