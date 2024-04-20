package com.example.DTO;

import com.example.Model.CargoEntity;
import com.example.Model.FabricaEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private String Apellidos;
    private String Nombre;
    private int fabrica;
    private String correoElectronico;
    private String contrasena;
    private int cargo;
    private String Estado;
    private String imagen;
}
