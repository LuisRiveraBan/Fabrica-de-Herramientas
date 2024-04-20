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



  function obtenerUsuarioDisponibles() {
    fetch('http://localhost:8890/Login')
      .then(response => response.json())
      .then(result => {
        if (result.estado === "OK" && Array.isArray(result.data)) {
          const lineas = result.data;
          const selectCodigoUsuario = $('#Usuario');
          selectCodigoUsuario.empty();
          
          selectCodigoUsuario.append('<option value="000">SELECCIONE UN USUARIO</option>');
  
          lineas.forEach(Usuario => {
            selectCodigoUsuario.append(`<option value="${Usuario.codigoUsuario}">${Usuario.nombre}</option>`);
          });
  
          // Agregar evento change al select
          selectCodigoUsuario.on('change', function () {
            const CodigoUsuarioSeleccionado = $(this).val();
            obtenerListadoPorUsuario(CodigoUsuarioSeleccionado);
            obtenerCantidadTotalLineas(CodigoUsuarioSeleccionado)
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
          
            obtenerCantidadTotalLineas(codigoLineaSeleccionado, codigoUsuarioSeleccionado);
  
          });
        } else {
          console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
        }
      })
      .catch(error => {
        console.error('Error obteniendo las líneas:', error);
      });
  }
  
  function obtenerCantidadTotalLineas(codigoLineaSeleccionado,CodigoUsuarioSeleccionado) {
    fetch(`http://localhost:8890/Piezas/BuscarLineaPorUsuarioAdmin/${codigoLineaSeleccionado}/${CodigoUsuarioSeleccionado}`)
      .then(response => response.json())
      .then(result => {
        if (result.estado === "OK" && result.data && result.data['Lineas :'] instanceof Array) {
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

  function obtenerListadoPorUsuario(CodigoUsuarioSeleccionado) {
    fetch(`http://localhost:8890/Piezas/Usuario/${CodigoUsuarioSeleccionado}`)
      .then(response => response.json())
      .then(result => {
        if (result.estado === "OK" && result.data && result.data['Piezas :'] instanceof Array) {
          const usuarios = result.data['Piezas :'];
  
          // Limpiar la tabla antes de agregar nuevos datos
          $('#tbody').empty();
  
          usuarios.forEach(usuario => {
            const fechaFormateada = new Date(usuario.codigoPiezas).toLocaleDateString(); // Suponiendo que "codigoPiezas" representa la fecha
  
            const fila = `
              <tr>
                <td>${usuario.codigoPiezas}</td>
                <td>${fechaFormateada}</td>
                <td>${usuario.usuario.nombre}</td>
                <td>${usuario.fabrica.descripcion}</td>
                <td>${usuario.codigoLinea ? usuario.codigoLinea.descripcion : ''}</td>
                <td>${usuario.cantidad ? usuario.cantidad : ''}</td>
                <td>
                  <button type="button" onclick="jsEliminar(${usuario.codigoPiezas})" class="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            `;
  
            $('#tbody').append(fila);
          });
  
          const cantidadTotal = result.data['Cantidad total: '];
          $("#CantidadTotal").text(cantidadTotal);
        } else {
          console.error('Error en la respuesta del servidor:', result.mensaje || 'Estructura de datos no válida');
          // Puedes manejar el mensaje de error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
        }
      })
      .catch(error => {
        console.error('Error obteniendo la información de usuario:', error);
        // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
      });
  }
