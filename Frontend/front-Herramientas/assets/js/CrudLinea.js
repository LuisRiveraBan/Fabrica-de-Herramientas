///Codigo JavaScript de Linea Inicio
window.onload = function () {
    console.log("Onload....");
    jsListarLinea();
    jsListarPorCodigo();
  };
  
  ///Funcion para listar los datos
  function jsListarLinea() {
    fetch('http://localhost:8890/Linea')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        $('#tbody').html("");
        data.data.forEach((element, idx) => {
          var item = `<tr>
                            <td>${element.codigoLinea}</td>
                            <td>${element.descripcion}</td>
                            <td>
                              <button type="button" onclick="jsEliminarLinea(${element.codigoLinea})" class="btn btn-danger">Eliminar</button>
                              <a onclick="jsActualizar(${element.codigoLinea})" class="btn btn-primary" href="/Administrador_2/LineaActualizar.html?codigo=${element.codigoLinea}">Actualizar</a>
                            </td>
                            </td>
                          </tr>`;
          $('#tbody').append(item);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Función para Eliminar Datos
  function jsEliminarLinea(codigoLinea) {
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
        fetch(`http://localhost:8890/Linea/${codigoLinea}`, {
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
            jsListarLinea(); // Volver a cargar la lista
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
  
  function jsRegistrarLinea() {
    console.log("jsRegistrarLinea");
    var data = {
      descripcion: $("#linea").val(),
    };
    console.log("data:", data);
    fetch("http://localhost:8890/Linea", {
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
    const codigoLinea = urlParams.get('codigo');
  
    if (codigoLinea) {
      console.log("Código de Linea:", codigoLinea);
      jsListarPorCodigo(codigoLinea);
    }
  
    // Llamar a jsListar() u otras funciones si es necesario al cargar la página
    jsListarLinea();
  };
  
  
  ///Funcion para actulizar los datos
  function jsActualizarLinea() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoLinea = urlParams.get('codigo');
  
    console.log("jsActualizar", codigoLinea);
    var data = {
      descripcion: $("#linea").val(),
    };
    console.log("data:", data);
  
    fetch("http://localhost:8890/Linea/" + codigoLinea, {
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
  
  function jsListarPorCodigo(codigoLinea) {
    fetch(`http://localhost:8890/Linea/${codigoLinea}`)
      .then(response => response.json())
      .then(data => {
        if (data && data) {
          const elemento = data.data;
          $('#linea').val(elemento.descripcion);
          // Llenar otros campos del formulario si es necesario
        } else {
          console.log('No se encontraron datos para el código especificado');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
  