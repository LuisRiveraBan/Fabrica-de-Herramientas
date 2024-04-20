package com.example.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Usuarios")
public class UsuarioEntity {


    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_usuario")
    private Integer codigoUsuario;


    @Column(name = "apellidos")
    private String Apellidos;

    @Column(name = "nombre")
    private String Nombre;


    @ManyToOne(targetEntity = FabricaEntity.class)
    @JoinColumn(name = "codigo_fabrico")
    private FabricaEntity fabrica;

    @Column(name = "correo_electronico")
    private String correoElectronico;

    @Column(name = "contrasena")
    private String contrasena;


    @ManyToOne(targetEntity = CargoEntity.class)
    @JoinColumn(name="codigo_Cargo")
    private CargoEntity cargo;


    @Column(name = "estado")
    private String Estado;

    @Column(name = "fotodelusuario")
    private String imagen;

    public UsuarioEntity(Integer codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }
}
