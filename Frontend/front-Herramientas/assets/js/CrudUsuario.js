/// Funcion para listar los datos
window.onload = function () {
    console.log("Onload....");
    jsListarusuario();
};

function jsListarusuario() {
    fetch('http://localhost:8890/Login')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('#tbody').html("");
            data.data.forEach((element, idx) => {
                var fabricaDescripcion = element.fabrica ? element.fabrica.descripcion : '';
                var cargoDescripcion = element.cargo ? element.cargo.descripcion : 'Sin descripción de cargo';
                var imagenSrc = element.imagen ? element.imagen : 'ruta/de/imagen_por_defecto.jpg';

                var item = `<tr>
                    <td>${element.codigoUsuario}</td>
                    <td>${element.nombre}</td>
                    <td>${element.apellidos}</td>
                    <td>${element.correoElectronico}</td>
                    <td>${fabricaDescripcion}</td>
                    <td>${cargoDescripcion}</td>
                    <td>${element.estado}</td>
                    <td>
                        <img src="${imagenSrc}" alt="Imagen" style="max-width: 100px; height: auto;" />
                    </td>
                    <td>
                        <button type="button" onclick="jsEliminarUsuario(${element.codigoUsuario})" class="btn btn-danger">Eliminar</button>
                        <a onclick="jsActualizarUsuario(${element.codigoUsuario})" class="btn btn-primary" href="/Administrador_2/UsuarioActualizar.html?codigo=${element.codigoUsuario}&codigoF=${encodeURIComponent(fabricaDescripcion)}&codigoC=${encodeURIComponent(cargoDescripcion)}">Actualizar</a>
                    </td>
                </tr>`;
                $('#tbody').append(item);
            });
        })
        .catch(error => console.error('Error:', error));
}



// Función para Eliminar Datos
function jsEliminarUsuario(codigoUsuario) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8890/Login/${codigoUsuario}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Mostrar mensaje de éxito con SweetAlert2
            Swal.fire({
              icon: 'success',
              title: '¡Bien!',
              text: 'Registro eliminado con éxito.',
              showConfirmButton: false,
              timer: 1500 // Cerrar automáticamente después de 1.5 segundos
            });
            jsListarusuario(); // Volver a cargar la lista
          })
          .catch(error => {
            console.error('Error:', error);
            // Mostrar mensaje de error con SweetAlert2
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Se produjo un error. Por favor, reintente la operación.',
              showConfirmButton: false,
              timer: 2000 // Cerrar automáticamente después de 2 segundos
            });
          });
      }
    });
  }

///Funcion para registrar los datos

function jsRegistrarUsuario() {
    console.log("jsRegistrarUsuario");
    var data = {
        nombre: $("#Nombre").val(),
        apellidos: $("#Apellido").val(),
        fabrica: $("#Fabrica").val(),
        correoElectronico: $("#Correo").val(),
        contrasena: $("#Contraseña").val(),
        estado: $("#Estado1").val(),
        cargo: $("#Cargo").val(),
        imagen: $("#Foto").val(),
    };
    console.log("data:", data);
    fetch("http://localhost:8890/Login/Registrar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var item = `<div class="alert alert-primary alert-dismissible fade show">
                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="nc-icon nc-simple-remove"></i>
                            </button>
                            <span><b> ¡Bien! </b><br> Registro guardado con éxito.</span>
                          </div>`;
            document.getElementById('mensaje').innerHTML = item;
        })
        .catch(error => {
            console.error('Error:', error);
            var item = `<div class="alert alert-danger alert-dismissible fade show">
                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="nc-icon nc-simple-remove"></i>
                            </button>
                            <span><b> Se produjo un error. </b><br> Por favor, valida la información ingresada.</span>
                          </div>`;
            document.getElementById('mensaje').innerHTML = item;
        });
}

window.onload = function () {
    obtenerFabricaRegistrar()
    obtenerCargosRegistrar()

    const urlParams = new URLSearchParams(window.location.search);
    const codigoUsuario = urlParams.get('codigo');
    const Fabrica = urlParams.get('codigoF');
    const Cargo = urlParams.get('codigoC');

    // Almacenar las variables en el contexto global (window)
    if (codigoUsuario) {
        console.log("Código de Usuario:", codigoUsuario);
        jsListarPorCodigo(codigoUsuario);
        window.codigoUsuario = codigoUsuario;
    }

    if (Fabrica) {
        console.log("Fabrica: ", Fabrica);
        obtenerFabricaDisponibles(Fabrica);
    }

    if(Cargo){
        console.log("Cargo: ", Cargo);
        obtenerCargosDisponibles(Cargo);
    }

    jsListarusuario();
};


///Funcion para actulizar los datos
function jsActualizarUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoUsuario = urlParams.get('codigo');

    console.log("jsActualizarUsuario", codigoUsuario);
    var data = {
        nombre: $("#Nombre").val(),
        apellidos: $("#Apellido").val(),
        fabrica: $("#Fabrica").val(),
        correoElectronico: $("#Correo").val(),
        contrasena: $("#Contraseña").val(),
        estado: $("#Estado1").val(),
        cargo: $("#Cargo").val(),
        imagen: $("#Foto").val(),
    };
    console.log("data:", data);

    fetch("http://localhost:8890/Login/" + codigoUsuario, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            var item = `<div class="alert alert-primary alert-dismissible fade show">
                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="nc-icon nc-simple-remove"></i>
                            </button>
                            <span><b> ¡Bien! </b><br> Registro guardado con éxito.</span>
                          </div>`;
            document.getElementById('mensaje').innerHTML = item;
        })
        .catch(error => {
            console.error('Error:', error);
            var item = `<div class="alert alert-danger alert-dismissible fade show">
                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="nc-icon nc-simple-remove"></i>
                            </button>
                            <span><b> Se produjo un error. </b><br> Por favor, valida la información ingresada.</span>
                          </div>`;
            document.getElementById('mensaje').innerHTML = item;
        });
}

///Obtiene los datos para el actualizar

function jsListarPorCodigo(codigoUsuario) {
    fetch(`http://localhost:8890/Login/ListarUsuarioAdmin/${codigoUsuario}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                const elemento = data.data;

                $('#Nombre').val(elemento.nombre || '');
                $('#Apellido').val(elemento.apellidos || '');
                $('#Correo').val(elemento.correoElectronico || '');
                $('#Contraseña').val(elemento.contrasena || '');
                $('#Estado1').val(elemento.estado || '');
                $('#Foto').val(elemento.imagen || '');


                obtenerCargosDisponibles(indiceCargo);

                obtenerFabricaDisponibles(indiceFabrica);
            } else {
                console.log('No se encontraron datos para el código especificado');
            }
        })
        .catch(error => console.error('Error:', error));
}

function obtenerFabricaDisponibles(indiceFabrica) {
    return fetch('http://localhost:8890/Fabrica')
        .then(response => response.json())
        .then(result => {
            if (result.estado === "OK" && Array.isArray(result.data)) {
                const fabricas = result.data;
                const selectCodigoFabrica = $('#Fabrica');

                selectCodigoFabrica.empty();
                selectCodigoFabrica.append('<option value="000">SELECCIONE UNA FABRICA</option>');

                fabricas.forEach(fabrica => {
                    selectCodigoFabrica.append(`<option value="${fabrica.codigoFabrica}">${fabrica.descripcion}</option>`);
                });

                // Seleccionar automáticamente la opción basada en la descripción
                $('#Fabrica option').each(function() {
                    if ($(this).text() === indiceFabrica) {
                        $(this).prop('selected', true);
                        return false; // Termina el bucle después de seleccionar la opción
                    }
                });
            } else {
                console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
            }
        })
        .catch(error => {
            console.error('Error obteniendo las fábricas:', error);
        });
}


function obtenerCargosDisponibles(indiceCargo) {
    fetch('http://localhost:8890/Cargo')
        .then(response => response.json())
        .then(result => {
            if (result.estado === "OK" && Array.isArray(result.data)) {
                const cargos = result.data;
                const selectCodigoCargo = $('#Cargo');

                selectCodigoCargo.empty();
                selectCodigoCargo.append('<option value="000">SELECCIONE UN CARGO</option>');

                cargos.forEach(cargo => {
                    selectCodigoCargo.append(`<option value="${cargo.codigoCargo}">${cargo.descripcion}</option>`);
                });

                $('#Cargo option').each(function() {
                    if ($(this).text() === indiceCargo) {
                        $(this).prop('selected', true);
                        return false; // Termina el bucle después de seleccionar la opción
                    }
                });
            } else {
                console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
            }
        })
        .catch(error => {
            console.error('Error obteniendo los cargos:', error);
        });
}


function obtenerFabricaRegistrar() {
    return fetch('http://localhost:8890/Fabrica')
        .then(response => response.json())
        .then(result => {
            if (result.estado === "OK" && Array.isArray(result.data)) {
                const fabricas = result.data;
                const selectCodigoFabrica = $('#Fabrica');

                selectCodigoFabrica.empty();
                selectCodigoFabrica.append('<option value="000">SELECCIONE UNA FABRICA</option>');

                fabricas.forEach(fabrica => {
                    selectCodigoFabrica.append(`<option value="${fabrica.codigoFabrica}">${fabrica.descripcion}</option>`);
                });

            } else {
                console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
            }
        })
        .catch(error => {
            console.error('Error obteniendo las fábricas:', error);
        });
}


function obtenerCargosRegistrar() {
    fetch('http://localhost:8890/Cargo')
        .then(response => response.json())
        .then(result => {
            if (result.estado === "OK" && Array.isArray(result.data)) {
                const cargos = result.data;
                const selectCodigoCargo = $('#Cargo');

                selectCodigoCargo.empty();
                selectCodigoCargo.append('<option value="000">SELECCIONE UN CARGO</option>');

                cargos.forEach(cargo => {
                    selectCodigoCargo.append(`<option value="${cargo.codigoCargo}">${cargo.descripcion}</option>`);
                });

            } else {
                console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
            }
        })
        .catch(error => {
            console.error('Error obteniendo los cargos:', error);
        });
}