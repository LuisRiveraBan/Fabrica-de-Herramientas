// Ejecutar la función jsListar() cuando se carga la ventana
window.onload = function () {
  console.log("Onload....");
  jsListar();
  obtenerLineasDisponibles();
};

// Función para listar Piezas
function jsListar() {
  fetch('http://localhost:8890/Piezas/Listar')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      $('#tbody').html("");
      data.data.forEach((element, idx) => {
        const fecha = new Date(element.fecha);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

        var item = `<tr>
                        <td>${element.codigoPiezas}</td>
                        <td>${fechaFormateada}</td>
                        <td>${element.usuario.nombre}</td>
                        <td>${element.fabrica.descripcion}</td>
                        <td>${element.codigoLinea.descripcion}</td>
                        <td>${element.cantidad}</td>
                        <td>
                        <a CodigoObtenerLinea=${element.codigoLinea}> </a>
                          <button type="button" onclick="jsEliminar(${element.codigoPiezas})" class="btn btn-danger">Eliminar</button>
                          <a onclick="jsActualizar(${element.codigoPiezas})" class="btn btn-primary" href="/administracion/Actualizar_Piezas.html?codigo=${element.codigoPiezas}&codigoL=${encodeURIComponent(element.codigoLinea.descripcion)}">Actualizar</a>
                        </td>
                        </td>
                      </tr>`;
        $('#tbody').append(item);
      });
    })
    .catch(error => console.error('Error:', error));
}


// Función para listar Piezas
function jsEliminar(codigoPiezas) {
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
      fetch(`http://localhost:8890/Piezas/${codigoPiezas}`, {
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
          jsListar(); // Volver a cargar la lista
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


// Función para Regitrar Piezas
function jsAceptar() {
  console.log("jsAceptar");
  $("#Fecha").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  const fecha = $("#Fecha").datepicker("getDate");
  var data = {
    fecha: fecha,
    codigoUsuario: $("#CodigoUsuario").val(),
    fabrica: $("#Fabrica").val(),
    codigoLinea: $("#CodigoLinea").val(),
    cantidad: $("#Cantidad").val()
  };
  console.log("data:", data);

  fetch("http://localhost:8890/Piezas", {
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
  const urlParams = new URLSearchParams(window.location.search);
  const codigoPiezas = urlParams.get('codigo');
  const Linea = urlParams.get('codigoL');
  jsListar();
  obtenerLineasDisponibles();
};

function jsActualizar() {
  const urlParams = new URLSearchParams(window.location.search);
  const codigoPiezas = urlParams.get('codigo');

  console.log("jsActualizar", codigoPiezas);
  $("#Fecha").datepicker();
  const fecha = $("#Fecha").datepicker("getDate");
  var data = {
    fecha: fecha,
    codigoUsuario: $("#CodigoUsuario").val(),
    fabrica: $("#Fabrica").val(),
    codigoLinea: $("#CodigoLinea").val(),
    cantidad: $("#Cantidad").val()
  };
  console.log("data:", data);

  fetch("http://localhost:8890/Piezas/" + codigoPiezas, {
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

$(function () {
  $("#FechaInicio").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  $("#FechaFinal").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  $("#Fecha").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });
});


function BuscarPorFecha(codigoLinea) {
  $("#FechaInicio").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  $("#FechaFinal").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  $("#buscarDatos").on("click", function (event) {
    event.preventDefault(); // Prevenir la acción predeterminada del enlace

    const fechaInicio = $("#FechaInicio").datepicker("getDate"); // Obtener fecha de inicio en formato JavaScript Date
    const fechaFin = $("#FechaFinal").datepicker("getDate"); // Obtener fecha final en formato JavaScript Date

    // Verificar si las fechas son válidas antes de continuar
    if (!fechaInicio || !fechaFin || fechaInicio > fechaFin) {
      console.error('Fechas no válidas.');
      return;
    }

    // Convertir las fechas al formato requerido (yyyy-mm-dd)
    const fechaInicioFormatted = formatDateToISO(fechaInicio);
    const fechaFinFormatted = formatDateToISO(fechaFin);

    // Realizar la solicitud GET usando fetch con el formato esperado por el servidor
    const url = `http://localhost:8890/Piezas/FechaUsuario/${codigoLinea}?fechaInicio=${fechaInicioFormatted}&fechaFin=${fechaFinFormatted}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos.');
        }
        return response.json();
      })
      .then(data => {
        // Verificar si la respuesta contiene los datos esperados
        if (data && data.estado === 'Ok' && data.mensaje === 'Listado con Éxito' && data.data && data.data.PiezasEnRango) {
          const piezasEnRango = data.data.PiezasEnRango;
          const cantidadTotal = data.data.CantidadTotal;
          const CantidadTotaLinea = data.data.CantidadTotaLinea;

          // Mostrar la cantidad total en el cuadro fuera de la tabla
          $("#CantidadTotal").text(cantidadTotal);
          $("#CantidadTotalLinea").text(CantidadTotaLinea);


          // Limpiar la tabla antes de mostrar los nuevos datos
          $("#cuerpoTabla").empty();

          // Iterar sobre los datos y construir filas para la tabla
          piezasEnRango.forEach(pieza => {

            const fecha = new Date(pieza.fecha); // Convertir la fecha a un objeto Date
            const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

            // Crear una fila con los datos obtenidos y agregarla a la tabla
            var item = `<tr>
                        <td>${pieza.codigoPiezas}</td>
                        <td>${fechaFormateada}</td>
                        <td>${pieza.usuario.nombre}</td>
                        <td>${pieza.usuario.fabrica.descripcion}</td>
                        <td>${pieza.codigoLinea.descripcion}</td>
                        <td>${pieza.cantidad}</td>
                      </tr>`;

            $("#cuerpoTabla").append(item); // Agregar la fila a la tabla
          });
        } else {
          console.error('Los datos recibidos no tienen la estructura esperada.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        // Manejar el error si la solicitud falla
      });
  });
}

// Función para convertir una fecha a formato ISO (yyyy-mm-dd)
function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


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


function obtenerLineasDisponibles() {
  fetch('http://localhost:8890/Linea')
    .then(response => response.json())
    .then(result => {
      if (result.estado === "OK" && Array.isArray(result.data)) {
        const lineas = result.data;
        const selectCodigoLinea = $('#Linea');
        selectCodigoLinea.empty();

        selectCodigoLinea.append('<option value="000">SELECCIONE UNA LINEA</option>');

        lineas.forEach(linea => {
          selectCodigoLinea.append(`<option value="${linea.codigoLinea}">${linea.descripcion}</option>`);
        });

        // Agregar evento change al select
        selectCodigoLinea.on('change', function () {
          const codigoLineaSeleccionado = $(this).val();
          obtenerCantidadTotalPiezas(codigoLineaSeleccionado);
          BuscarPorFecha(codigoLineaSeleccionado);
        });

      } else {
        console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
      }
    })
    .catch(error => {
      console.error('Error obteniendo las líneas:', error);
    });
}


function obtenerCantidadTotalPiezas(codigoLinea) {
  fetch(`http://localhost:8890/Piezas/BuscarLineaPorUsuario/${codigoLinea}`)
    .then(response => response.json())
    .then(result => {
      if (result.estado === "OK" && result.data && result.data['Lineas :'] instanceof Array) {
        const lineas = result.data['Lineas :'];

        // Limpiar la tabla antes de agregar nuevos datos
        $('#tbody').empty();

        // Iterar sobre los elementos y construir las filas de la tabla
        lineas.forEach(element => {
          const fechaFormateada = new Date(element.fecha).toLocaleDateString(); // Formatear la fecha

          // Construir la fila con los valores del elemento actual
          const fila = `
            <tr>
            <td>${element.codigoPiezas}</td>
            <td>${fechaFormateada}</td>
            <td>${element.usuario.nombre}</td>
            <td>${element.fabrica.descripcion}</td>
            <td>${element.codigoLinea.descripcion}</td>
            <td>${element.cantidad}</td>
            <td>
            <a CodigoObtenerLinea=${element.codigoLinea}> </a>
              <button type="button" onclick="jsEliminar(${element.codigoPiezas})" class="btn btn-danger">Eliminar</button>
              <a onclick="jsActualizar(${element.codigoPiezas})" class="btn btn-primary" href="/administracion/Actualizar_Piezas.html?codigo=${element.codigoPiezas}">Actualizar</a>
            </td>
            </td>
            </tr>
          `;

          // Agregar la fila a la tabla
          $('#tbody').append(fila);
        });

        // Actualizar la cantidad total de piezas
        const cantidadTotal = result.data['Cantidad total: '];
        $("#CantidadTotalLinea").text(cantidadTotal);
      } else {
        console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
        // Puedes manejar el mensaje de error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
      }
    })
    .catch(error => {
      console.error('Error obteniendo la cantidad total de piezas:', error);
      // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    });
}


function obtenerLineasDisponiblesActualizar(indiceLinea) {
  fetch('http://localhost:8890/Linea')
    .then(response => response.json())
    .then(result => {
      if (result.estado === "OK" && Array.isArray(result.data)) {
        const lineas = result.data;
        const selectCodigoLinea = $('#CodigoLinea');
        selectCodigoLinea.empty();

        lineas.forEach(linea => {
          selectCodigoLinea.append(`<option value="${linea.codigoLinea}">${linea.descripcion}</option>`);
        });
        // Seleccionar automáticamente la opción basada en la descripción
        $('#CodigoLinea option').each(function () {
          if ($(this).text() === indiceLinea) {
            $(this).prop('selected', true);
            return false; // Termina el bucle después de seleccionar la opción
          }
        });
      } else {
        console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
        // Puedes manejar el mensaje de error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
      }
    })
    .catch(error => {
      console.error('Error obteniendo las líneas:', error);
      // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    });
}


