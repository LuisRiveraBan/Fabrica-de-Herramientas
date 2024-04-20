package com.example.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "piezas_fabricadas")
public class PiezasEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo")
    private Integer codigoPiezas;

    @Column(name = "Fecha")
    private Date Fecha;


    @ManyToOne(targetEntity = UsuarioEntity.class)
    @JoinColumn(name = "codigo_usuario")
    private UsuarioEntity usuario;

    @ManyToOne(targetEntity = FabricaEntity.class)
    @JoinColumn(name = "codigo_fabrico")
    private FabricaEntity fabrica;

    @ManyToOne(targetEntity = LineaEntity.class)
    @JoinColumn(name="codigo_linea")
    private LineaEntity codigoLinea;

    @Column(name = "cantidad")
    private int Cantidad;


}
