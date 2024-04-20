package com.example.Controlador;

import com.example.DTO.RespuestaDTO;
import com.example.Model.PiezasEntity;
import com.example.Service.PiezasService;
import com.example.Service.UsuarioService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.poi.ss.usermodel.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.OutputStream;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/export")
public class FormatoControlador {

    @Autowired
    private PiezasService service;


    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<RespuestaDTO> Listar(HttpServletResponse response) {
        try {
            // Creamos el libro de trabajo (workbook) y la hoja (sheet)
            Workbook workbook = new HSSFWorkbook(); // Para formatos .xls (Excel 97-2003)
            Sheet hoja = workbook.createSheet("Piezas");

            // Definimos el título en la primera fila
            Row filaTitulo = hoja.createRow(0);
            Cell celdaTitulo = filaTitulo.createCell(0);
            celdaTitulo.setCellValue("LISTADO GENERAL DE PIEZAS");

            // Definimos las cabeceras en la segunda fila
            Row filaCabeceras = hoja.createRow(1);
            String[] columnas = {"ID", "FECHA", "USUARIO", "SEDE", "LINEA", "CANTIDAD"};

            for (int i = 0; i < columnas.length; i++) {
                Cell celdaCabecera = filaCabeceras.createCell(i);
                celdaCabecera.setCellValue(columnas[i]);
            }

            // Obtenemos los datos y los escribimos en las filas siguientes
            List<PiezasEntity> listaPiezas = service.listarpiezas(); // Asumiendo que Pieza es tu modelo de datos
            int rowNum = 2; // Comenzamos desde la tercera fila para los datos


            for (PiezasEntity pieza : listaPiezas) {
                Row filaData = hoja.createRow(rowNum++);
                Date numeroSerieFecha = pieza.getFecha();
                SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyy-MM-dd");
                String fechaFormateada = formatoFecha.format(numeroSerieFecha);
                filaData.createCell(0).setCellValue(pieza.getCodigoPiezas());
                filaData.createCell(1).setCellValue(fechaFormateada);
                filaData.createCell(2).setCellValue(pieza.getUsuario().getNombre());
                filaData.createCell(3).setCellValue(pieza.getFabrica().getDescripcion());
                filaData.createCell(4).setCellValue(pieza.getCodigoLinea().getDescripcion());
                filaData.createCell(5).setCellValue(pieza.getCantidad());

            }

            // Escribir el contenido en el flujo de salida (output stream)
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"listado-piezas.xls\"");

            OutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();

            // Crear y devolver la respuesta
            RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado exportado con éxito", listaPiezas);
            return new ResponseEntity<>(respuesta, HttpStatus.OK);

        } catch (Exception e) {
            // Manejar errores
            RespuestaDTO respuestaError = new RespuestaDTO("Error", "Error al exportar el listado de piezas", null);
            return new ResponseEntity<>(respuestaError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/Usuario")
    public ResponseEntity<RespuestaDTO> ListarPorUsuario(HttpServletResponse response) {
        try {
            // Creamos el libro de trabajo (workbook) y la hoja (sheet)
            Workbook workbook = new HSSFWorkbook(); // Para formatos .xls (Excel 97-2003)
            Sheet hoja = workbook.createSheet("Piezas");

            // Definimos el título en la primera fila
            Row filaTitulo = hoja.createRow(0);
            Cell celdaTitulo = filaTitulo.createCell(0);
            celdaTitulo.setCellValue("LISTADO GENERAL DE PIEZAS");

            // Definimos las cabeceras en la segunda fila
            Row filaCabeceras = hoja.createRow(1);
            String[] columnas = {"ID", "FECHA", "USUARIO", "SEDE", "LINEA", "CANTIDAD"};

            for (int i = 0; i < columnas.length; i++) {
                Cell celdaCabecera = filaCabeceras.createCell(i);
                celdaCabecera.setCellValue(columnas[i]);
            }

            Integer codigoFabrica;
            Integer codigoUsuario;


            // Obtenemos los datos y los escribimos en las filas siguientes
            codigoFabrica = usuarioService.getCodigoFabrica();
            codigoUsuario = usuarioService.getCodigoUsuario();
            List<PiezasEntity> listaPiezas = service.listarFyU(codigoFabrica,codigoUsuario); // Asumiendo que Pieza es tu modelo de datos
            int rowNum = 2; // Comenzamos desde la tercera fila para los datos


            for (PiezasEntity pieza : listaPiezas) {
                Row filaData = hoja.createRow(rowNum++);
                Date numeroSerieFecha = pieza.getFecha();
                SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyy-MM-dd HH");
                String fechaFormateada = formatoFecha.format(numeroSerieFecha);
                filaData.createCell(0).setCellValue(pieza.getCodigoPiezas());
                filaData.createCell(1).setCellValue(fechaFormateada);
                filaData.createCell(2).setCellValue(pieza.getUsuario().getNombre());
                filaData.createCell(3).setCellValue(pieza.getFabrica().getDescripcion());
                filaData.createCell(4).setCellValue(pieza.getCodigoLinea().getDescripcion());
                filaData.createCell(5).setCellValue(pieza.getCantidad());

            }

            // Escribir el contenido en el flujo de salida (output stream)
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"listado-piezas.xls\"");

            OutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();

            // Crear y devolver la respuesta
            RespuestaDTO respuesta = new RespuestaDTO("OK", "Listado exportado con éxito", listaPiezas);
            return new ResponseEntity<>(respuesta, HttpStatus.OK);

        } catch (Exception e) {
            // Manejar errores
            RespuestaDTO respuestaError = new RespuestaDTO("Error", "Error al exportar el listado de piezas", null);
            return new ResponseEntity<>(respuestaError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}

