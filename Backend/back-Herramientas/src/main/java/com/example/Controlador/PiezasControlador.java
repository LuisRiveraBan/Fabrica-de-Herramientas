package com.example.Controlador;

import com.example.DTO.PiezasDTO;
import com.example.DTO.RespuestaDTO;
import com.example.Service.PiezasService;
import com.example.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;


@CrossOrigin /// Ofrece permisos al navegador para usar los metodos
@RestController
@RequestMapping("/Piezas") //enrutamiento correspondiente
public class PiezasControlador {

    //Autoriza y importa los metodos necesarios
    @Autowired
    private PiezasService service;

    //Autoriza y importa las variables necesarias para los metodos
    @Autowired
    private UsuarioService usuarioService;

    //Listar de Forma Predeterminada
    /*GetMapping("/Lima")
    public ResponseEntity<RespuestaDTO> ListarLima() throws Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado Lima con Exito", service.ListarPorLima());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @GetMapping("/Piura")
    public ResponseEntity<RespuestaDTO> ListarPiura() throws Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado Lima con Exito", service.ListarPorPiura());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @GetMapping("/Arequipa")
    public ResponseEntity<RespuestaDTO> ListarArequipa() throws Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado Lima con Exito", service.ListarPorArequipa());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RespuestaDTO> ListarPorFabrica(@PathVariable Integer id) throws Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado Lima con Exito", service.listarPorFabrica(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    */
    //--------------------------------------------------------------------------------------------------------------------------------
    //Variables glovables
    private Integer codigoFabrica;
    private Integer codigoUsuario;


    //Metodo que lista sin ningun tipo de filtro todas las piezas
    @GetMapping
    public ResponseEntity<RespuestaDTO> Listar() throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con Éxito", service.listarpiezas());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
    //Metodo que lista las Piezas segun el codigo del Usuario
    @GetMapping("/Usuario/{id}")
    public ResponseEntity<RespuestaDTO> BuscarUsuario(@PathVariable Integer id) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con éxito", service.listarPorUsuario(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Metodo que busca las linea segun el codigo de linea
    @GetMapping("/BuscarLinea/{id}")
    public ResponseEntity<RespuestaDTO> BuscarLinea(@PathVariable Integer id) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con éxito", service.ListarporLinea(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }


    //Metodo que Lista y realiza el filtro del administrador global para poder obtener los piezas segun el Usuario y obtener la sumatoria
    //de las lineas correspondientes
    @GetMapping("/BuscarLineaPorUsuarioAdmin/{id}/{usuario}")
    public ResponseEntity<RespuestaDTO> BuscarLineaPorUsuarioAdmin(@PathVariable Integer id, @PathVariable Integer usuario) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con éxito", service.ListarporLineayUsuario(id, usuario));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Metodo que Lista y realiza el filtro  Administrador normal para poder obtener los piezas segun el Usuario y obtener la sumatoria
    //de las lineas correspondientes
    @GetMapping("/BuscarLineaPorUsuario/{id}")
    public ResponseEntity<RespuestaDTO> BuscarLineaPorUsuario(@PathVariable Integer id) throws Exception {
        codigoUsuario = usuarioService.getCodigoUsuario();
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con éxito", service.ListarporLineayUsuario(id, codigoUsuario));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Lista las piezas segun el Usuario y fabrica correspondiente se usa en el administrador normal
    @GetMapping("Listar")
    public ResponseEntity<RespuestaDTO> ListarTodo() throws Exception {
        codigoFabrica = usuarioService.getCodigoFabrica();
        codigoUsuario = usuarioService.getCodigoUsuario();
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con Éxito", service.listarFyU(codigoFabrica, codigoUsuario));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
    //Lista las piezas por id no se esta usando por el momento
    @GetMapping("/BuscarPieza/{id}")
    public ResponseEntity<RespuestaDTO> BuscarPieza(@PathVariable Integer id) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado con éxito", service.ListarPorPieza(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //lista las piezas segun el rango de fechas usado por el administrador global
    @GetMapping("/Fecha")
    public ResponseEntity<RespuestaDTO> listarPorFechas(
            @RequestParam("fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("Ok", "Listado con Éxito", service.Listarporfecha(fechaInicio, fechaFin));

        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }


    //lista segun el rango de fehas y usuario y linea seleccionada usado por el administrador global
    @GetMapping("/FechaUsuarioAdmin/{id}/{usuario}")
    public ResponseEntity<RespuestaDTO> listarPorFechasyUsuarioAdmin(
            @RequestParam("fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin, @PathVariable Integer id, @PathVariable Integer usuario) throws Exception {
        RespuestaDTO respuesta = new RespuestaDTO("Ok", "Listado con Éxito", service.ListarporfechayUsuario(fechaInicio, fechaFin, usuario, id));

        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }



    //lista segun el rango de fechas y el codigo de linea usado por el admnistrador normal
    @GetMapping("/FechaUsuario/{id}")
    public ResponseEntity<RespuestaDTO> listarPorFechasyUsuario(
            @RequestParam("fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin, @PathVariable Integer id) throws Exception {
        codigoUsuario = usuarioService.getCodigoUsuario();
        RespuestaDTO respuesta = new RespuestaDTO("Ok", "Listado con Éxito", service.ListarporfechayUsuario(fechaInicio, fechaFin, codigoUsuario, id));

        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }


    //Registra las piezas
    @PostMapping
    public ResponseEntity<RespuestaDTO> registrar(@RequestBody PiezasDTO dto) throws  Exception{
        RespuestaDTO respuesta = new RespuestaDTO("OK","Registrado Correctamente", service.registrar(dto));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    //Actualiza las piezas
    @PutMapping("/{id}")
    public ResponseEntity<RespuestaDTO> actualizar(@RequestBody PiezasDTO dto, @PathVariable Integer id) throws  Exception{
        service.actualizar(dto, id);
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Actualizado con exito", service.buscarporid(id));
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
    //Elimina  las piezas
    @DeleteMapping("/{id}")
    public ResponseEntity<RespuestaDTO> eliminar(@PathVariable Integer id) throws Exception{
        service.eliminar(id);
        RespuestaDTO respuesta = new RespuestaDTO("OK", "Eliminado con exito",":)");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }


}
