package com.example.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "linea")
public class LineaEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_linea")
    private Integer codigoLinea;

    @Column(name = "Descripcion")
    private String descripcion;

    public LineaEntity(Integer codigoLinea) {
        this.codigoLinea = codigoLinea;
    }
}
