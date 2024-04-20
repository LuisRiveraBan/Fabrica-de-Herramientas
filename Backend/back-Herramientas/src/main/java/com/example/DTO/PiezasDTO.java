package com.example.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PiezasDTO {

    private Date Fecha;
    private int Usuario;
    private int fabrica;
    private int CodigoLinea;
    private int Cantidad;
}
