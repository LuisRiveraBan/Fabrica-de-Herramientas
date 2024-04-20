package com.example.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fabrica")
public class FabricaEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_fabrico")
    private Integer codigoFabrica;

    @Column(name = "Descripcion")
    private String Descripcion;

    @Column(name = "Tipo")
    private String Tipo;

    public FabricaEntity(Integer codigoFabrica) {
        this.codigoFabrica = codigoFabrica;
    }
}
