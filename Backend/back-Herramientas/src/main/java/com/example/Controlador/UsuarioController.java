package com.example.Controlador;

import com.example.DTO.*;
import com.example.Model.CargoEntity;
import com.example.Model.UsuarioEntity;
import com.example.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin//Ofrece permisos al navegador de poder usar los metodos
@RestController
@RequestMapping("/Login")
public class UsuarioController {


    //Importamos el Service de Usuario
    //Autowired autoriza poder usar las funciones del service
    @Autowired
    UsuarioService service;


    //Metodo Get Listar todos los Usuarios
    @GetMapping
    public ResponseEntity<RespuestaDTO> ListarUsuario() throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con Éxito", service.listarusuario());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Segun el Usuario ingresado en el login se lista de acuerdo a su id
    @GetMapping("ListarUsuario")
    public ResponseEntity<RespuestaDTO> ListarporUsuario() throws Exception {
        Integer usuario = service.getCodigoUsuario();
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con Éxito", service.listarporUsuario(usuario));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Metodo Usado en el Administrado Global para listar o filtrar por usuario escogido
    @GetMapping("ListarUsuarioAdmin/{id}")
    public ResponseEntity<RespuestaDTO> ListarporUsuarioAmin(@PathVariable Integer id) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con Éxito", service.listarporUsuario(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }


    //Metodo del login para verificar los Usuarios Ingresados
    String Estado ; //Declaramos una variable para almacenar el estado del Usuario
    @PostMapping
    public ResponseEntity<VerificacionDTO> iniciarSesion(@RequestBody LoginDTO loginDTO) {
        try {
            UsuarioEntity usuarioAutenticado = service.Login(loginDTO);
            if (usuarioAutenticado != null) {
                CargoEntity cargo = usuarioAutenticado.getCargo();
                Estado = service.getEstado(); // Asignar el estado obtenido al atributo estado de la clase

                if (cargo != null) {
                    VerificacionDTO respuesta = new VerificacionDTO(cargo.getDescripcion(), Estado);
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Cambié 401 por el código más apropiado HttpStatus.UNAUTHORIZED
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Metodo para Registrar Usuario
    @PostMapping("/Registrar")
    public ResponseEntity<RespuestaDTO> registrar(@RequestBody UsuarioDTO dto) throws  Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK","Registrado Correctamente", service.registrar(dto));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Metodo para Actualizar Usuario
    @PutMapping("/{id}")
    public ResponseEntity<RespuestaDTO> actualizar(@RequestBody UsuarioDTO dto, @PathVariable Integer id) throws  Exception{
        service.actualizar(dto, id);
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Actualizado con exito", service.listarporUsuario(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Metodo para Eliminar Usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<RespuestaDTO> eliminar(@PathVariable Integer id) throws Exception{
        service.eliminar(id);
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Eliminado con exito",":)");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

}
