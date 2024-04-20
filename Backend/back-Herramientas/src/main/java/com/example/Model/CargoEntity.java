package com.example.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cargo")
public class CargoEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_Cargo")
    private Integer codigoCargo;

    @Column(name = "Descripcion")
    private String Descripcion;

    public CargoEntity(Integer codigoCargo) {
        this.codigoCargo = codigoCargo;
    }
}
