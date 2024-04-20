package com.example.Controlador;
import com.example.Model.PiezasEntity;
import com.example.Service.PiezasService;
import com.example.Service.UsuarioService;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/export")
public class FormatoPDFControlador extends AbstractPdfView {

    Integer codigoFabrica;
    Integer codigoUsuario;

    @Autowired
    private PiezasService service;

    @Autowired
    private UsuarioService usuarioService;

    // Método para iniciar la generación del PDF
    @GetMapping("/PDF")
    public ModelAndView generarPDF() throws Exception {
        Map<String, Object> model = new HashMap<>();

        // Agregar datos al modelo si es necesario
        List<PiezasEntity> listarpiezas = service.listarpiezas();
        model.put("listarpiezas", listarpiezas);

        return new ModelAndView(this, model);
    }

    @GetMapping("/PDF/Usuario")
    public ModelAndView generarPDFUsuario() throws Exception {
        Map<String, Object> model = new HashMap<>();
        codigoFabrica = usuarioService.getCodigoFabrica();
        codigoUsuario = usuarioService.getCodigoUsuario();
        // Agregar datos al modelo si es necesario
        List<PiezasEntity> listarpiezas = service.listarFyU(codigoFabrica,codigoUsuario);
        model.put("listarpiezas", listarpiezas);

        return new ModelAndView(this, model);
    }

    @Override
    protected void buildPdfDocument(Map<String, Object> model, Document document, PdfWriter writer,
                                    HttpServletRequest request, HttpServletResponse response) throws Exception {

        @SuppressWarnings("unchecked")
        List<PiezasEntity> listarpiezas = (List<PiezasEntity>) model.get("listarpiezas");

        //Agrega el formato horizontal de tipo carta
        document.setPageSize(PageSize.LETTER.rotate());
        document.setMargins(-20,-20,30,20);


        Font fuentetitulo = FontFactory.getFont("Helvetica",16,Color.WHITE);
        Font FuenteTituloColumnas = FontFactory.getFont(FontFactory.HELVETICA_BOLD,12,Color.black);
        Font fuenteDataCeldas = FontFactory.getFont(FontFactory.COURIER,10,Color.BLACK);



        PdfPTable tablaTitulo = new PdfPTable(1);
        PdfPCell celda = null;
        celda = new PdfPCell(new Phrase("LISTADO DE PIEZAS", fuentetitulo));


        celda.setBorder(0);
        celda.setBackgroundColor(new Color(112, 106, 103));
        celda.setHorizontalAlignment(Element.ALIGN_CENTER);
        celda.setVerticalAlignment(Element.ALIGN_CENTER);
        celda.setPadding(30);


        tablaTitulo.addCell(celda);

        //Le da una espacio o separacion del titulo de la data
        tablaTitulo.setSpacingAfter(30);

        PdfPTable tablaPiezas = new PdfPTable(6);
        tablaPiezas.setWidths(new float[]{0.8f,2f,2f,1.5f,3.5f,1.5f});

        if (listarpiezas != null) {
            try {
                document.open(); // Abre el documento antes de agregar contenido


                    PdfPCell celda1 = null;

                    celda1 = new PdfPCell(new Phrase("ID", FuenteTituloColumnas));
                    celda1.setBackgroundColor(Color.lightGray);
                    celda1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    celda1.setVerticalAlignment(Element.ALIGN_CENTER);
                    celda1.setPadding(10);
                    tablaPiezas.addCell(celda1);

                    celda1 = new PdfPCell(new Phrase("Fecha", FuenteTituloColumnas));
                    celda1.setBackgroundColor(Color.lightGray);
                    celda1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    celda1.setVerticalAlignment(Element.ALIGN_CENTER);
                    celda1.setPadding(10);
                    tablaPiezas.addCell(celda1);

                    celda1 = new PdfPCell(new Phrase("Usuario", FuenteTituloColumnas));
                    celda1.setBackgroundColor(Color.lightGray);
                    celda1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    celda1.setVerticalAlignment(Element.ALIGN_CENTER);
                    celda1.setPadding(10);
                    tablaPiezas.addCell(celda1);

                    celda1 = new PdfPCell(new Phrase("Sede", FuenteTituloColumnas));
                    celda1.setBackgroundColor(Color.lightGray);
                    celda1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    celda1.setVerticalAlignment(Element.ALIGN_CENTER);
                    celda1.setPadding(10);
                    tablaPiezas.addCell(celda1);

                    celda1 = new PdfPCell(new Phrase("Linea", FuenteTituloColumnas));
                    celda1.setBackgroundColor(Color.lightGray);
                    celda1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    celda1.setVerticalAlignment(Element.ALIGN_CENTER);
                    celda1.setPadding(10);
                    tablaPiezas.addCell(celda1);

                    celda1 = new PdfPCell(new Phrase("Cantidad", FuenteTituloColumnas));
                    celda1.setBackgroundColor(Color.lightGray);
                    celda1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    celda1.setVerticalAlignment(Element.ALIGN_CENTER);
                    celda1.setPadding(10);
                    tablaPiezas.addCell(celda1);

                    for(PiezasEntity piezas1: listarpiezas){

                        Date numeroSerieFecha = piezas1.getFecha();
                        SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyy-MM-dd");
                        String fechaFormateada = formatoFecha.format(numeroSerieFecha);

                        celda1 = new PdfPCell(new Phrase(piezas1.getCodigoPiezas().toString(), fuenteDataCeldas));
                        celda1.setPadding(5);
                        tablaPiezas.addCell(celda1);

                        celda1 = new PdfPCell(new Phrase(fechaFormateada, fuenteDataCeldas));
                        celda1.setPadding(5);
                        tablaPiezas.addCell(celda1);

                        celda1 = new PdfPCell(new Phrase(piezas1.getUsuario().getNombre(), fuenteDataCeldas));
                        celda1.setPadding(5);
                        tablaPiezas.addCell(celda1);

                        celda1 = new PdfPCell(new Phrase(piezas1.getFabrica().getDescripcion(), fuenteDataCeldas));
                        celda1.setPadding(5);
                        tablaPiezas.addCell(celda1);

                        celda1 = new PdfPCell(new Phrase(piezas1.getCodigoLinea().getDescripcion(), fuenteDataCeldas));
                        celda1.setPadding(5);
                        tablaPiezas.addCell(celda1);

                        celda1 = new PdfPCell(new Phrase(String.valueOf(piezas1.getCantidad()), fuenteDataCeldas));
                        celda1.setPadding(5);
                        tablaPiezas.addCell(celda1);

                    }
                document.add(tablaTitulo);
                document.add(tablaPiezas); // Agrega la tabla al documento

                document.close(); // Cierra el documento después de agregar contenido
            } catch (DocumentException e) {
                // Manejo de excepciones relacionadas con Document
                e.printStackTrace();
            }
        } else {
            // Manejar el caso donde listarpiezas es nulo
            System.out.println("La lista de piezas es nula.");
        }
    }
}


