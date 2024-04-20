// Ejecutar la función jsListar() cuando se carga la ventana
window.onload = function () {
    console.log("Onload....");
    jsListar();
  };
  // Función para listar Piezas
  function jsListar() {
    fetch('http://localhost:8890/Piezas')
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
                            <button type="button" onclick="jsEliminar(${element.codigoPiezas})" class="btn btn-danger">Eliminar</button>
                          </td>
                          </td>
                        </tr>`;
          $('#tbody').append(item);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  

  

  window.onload = function () {
    obtenerUsuarioDisponibles()
    obtenerLineasDisponibles()
    const urlParams = new URLSearchParams(window.location.search);
    const codigoPiezas = urlParams.get('codigo');
  
    if (codigoPiezas) {
      console.log("Código de piezas:", codigoPiezas);
      // Lógica adicional si es necesario con el código recuperado
    }
  
    // Llamar a jsListar() u otras funciones si es necesario al cargar la página
    jsListar();
  };
  
  $(function () {
    $("#FechaInicio").datepicker({
      dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
    });
  
    $("#FechaFinal").datepicker({
      dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
    });
  });
  
  
  function BuscarPorFecha() {
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
      const url = `http://localhost:8890/Piezas/Fecha?fechaInicio=${fechaInicioFormatted}&fechaFin=${fechaFinFormatted}`;
  
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
  
            // Mostrar la cantidad total en el cuadro fuera de la tabla
            $("#CantidadTotal").text(cantidadTotal);
  
  
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
    obtenerListadoPorUsuario(CodigoUsuarioSeleccionado);
  });



//// Codigo JavaScript de Piezas Final
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// Codigo JavaScript de Perfil Inicio  
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
/// Codigo JavaScript de Perfil Final
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///CODIGO DE FILTRO POR USUARIO

function obtenerUsuarioDisponibles() {
  fetch('http://localhost:8890/Login')
    .then(response => response.json())
    .then(result => {
      if (result.estado === "OK" && Array.isArray(result.data)) {
        const lineas = result.data;
        const selectCodigoUsuario = $('#Usuario1');
        selectCodigoUsuario.empty();
        
        selectCodigoUsuario.append('<option value="000">SELECCIONE UN USUARIO</option>');

        lineas.forEach(Usuario => {
          selectCodigoUsuario.append(`<option value="${Usuario.codigoUsuario}">${Usuario.nombre}</option>`);
        });

        // Agregar evento change al select
        selectCodigoUsuario.on('change', function () {
          const CodigoUsuarioSeleccionado = $(this).val();
          obtenerLineasDisponibles(CodigoUsuarioSeleccionado)
          BuscarPorFechaLineaUsuario(CodigoUsuarioSeleccionado)
        });

      } else {
        console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
      }
    })
    .catch(error => {
      console.error('Error obteniendo las líneas:', error);
    });
}

function obtenerLineasDisponibles(CodigoUsuarioSeleccionado) {
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
          const codigoUsuarioSeleccionado = CodigoUsuarioSeleccionado // Obtener el código de usuario seleccionado de alguna manera

          BuscarPorFechaLineaUsuario(codigoLineaSeleccionado, codigoUsuarioSeleccionado);

        });
      } else {
        console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
      }
    })
    .catch(error => {
      console.error('Error obteniendo las líneas:', error);
    });
}

function BuscarPorFechaLineaUsuario(codigoLineaSeleccionado, CodigoUsuarioSeleccionado) {
  $("#FechaInicio").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  $("#FechaFinal").datepicker({
    dateFormat: 'dd/mm/yy' // Configurar el formato de fecha como Día/Mes/Año
  });

  $("#Filtrar").on("click", function (event) {
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
    const url = `http://localhost:8890/Piezas/FechaUsuarioAdmin/${codigoLineaSeleccionado}/${CodigoUsuarioSeleccionado}?fechaInicio=${fechaInicioFormatted}&fechaFin=${fechaFinFormatted}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos.');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.estado === 'Ok' && data.mensaje === 'Listado con Éxito' && data.data && data.data.PiezasEnRango) {
          const piezasEnRango = data.data.PiezasEnRango;
          const cantidadTotal = data.data.CantidadTotal;
          const cantidadLinea = data.data.CantidadTotaLinea;

          $("#CantidadTotal").text(cantidadTotal);
          $("#CantidadTotalLinea").text(cantidadLinea);

          $("#cuerpoTabla").empty();

          piezasEnRango.forEach(pieza => {
            const fecha = new Date(pieza.fecha);
            const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

            var item = `<tr>
                        <td>${pieza.codigoPiezas}</td>
                        <td>${fechaFormateada}</td>
                        <td>${pieza.usuario.nombre}</td>
                        <td>${pieza.usuario.fabrica.descripcion}</td>
                        <td>${pieza.codigoLinea.descripcion}</td>
                        <td>${pieza.cantidad}</td>
                      </tr>`;

            $("#cuerpoTabla").append(item);
          });
        } else {
          console.error('Los datos recibidos no tienen la estructura esperada.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  });
}
