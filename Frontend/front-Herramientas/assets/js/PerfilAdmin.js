
$(document).ready(function () {
    jsListarUsuario(); // Llama a la función para obtener y mostrar los datos del usuario
  });

  
function jsListarUsuario() {
    fetch(`http://localhost:8890/Login/ListarUsuario`)
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          const elemento = data.data;
          $('#Nombre').text(elemento.nombre + " " + elemento.apellidos);
          $('#Nombre1').text(elemento.nombre + " " + elemento.apellidos);
          $('#Cargo').text('Cargo: ' + elemento.cargo.descripcion); // Asignar el valor a Cargo
          $('#Correo').text('Correo Electronico: ' + elemento.correoElectronico); // Asignar el valor a Correo
          $('#Sede').text('Sede: ' + elemento.fabrica.descripcion); // Asignar el valor a Sede
          $('#Estado').text('Estado: ' + elemento.estado); // Asignar el valor a Estado
          $('#Imagen').attr('src', elemento.imagen);
          $('#Imagen1').attr('src', elemento.imagen);
          // Llenar otros campos del formulario si es necesario
        } else {
          console.log('No se encontraron datos para el código especificado');
        }
      })
      .catch(error => console.error('Error:', error));
  }