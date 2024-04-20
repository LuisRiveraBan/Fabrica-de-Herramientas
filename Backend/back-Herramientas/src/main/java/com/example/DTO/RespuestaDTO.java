package com.example.DTO;

public class RespuestaDTO {
	private String estado;
	private String mensaje;
	private Object data;
	
	public RespuestaDTO(String estado, String mensaje, Object data) {
		super();
		this.estado = estado;
		this.mensaje = mensaje;
		this.data = data;
	}
	
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}
