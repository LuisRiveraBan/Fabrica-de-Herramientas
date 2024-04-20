///Codigo JavaScript de Fabrica Inicio
window.onload = function () {
  console.log("Onload....");
  jsListarFabrica();
  jsListarPorCodigo();
};

///Funcion para listar los datos
function jsListarFabrica() {
  fetch('http://localhost:8890/Fabrica')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      $('#tbody').html("");
      data.data.forEach((element, idx) => {
        var item = `<tr>
                          <td>${element.codigoFabrica}</td>
                          <td>${element.descripcion}</td>
                          <td>${element.tipo}</td>
                          <td>
                            <button type="button" onclick="jsEliminarFabrica(${element.codigoFabrica})" class="btn btn-danger">Eliminar</button>
                            <a onclick="jsActualizar(${element.codigoFabrica})" class="btn btn-primary" href="/Administrador_2/FabricaActualizar.html?codigo=${element.codigoFabrica}">Actualizar</a>
                          </td>
                          </td>
                        </tr>`;
        $('#tbody').append(item);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Función para Eliminar Datos
function jsEliminarFabrica(codigoFabrica) {
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
      fetch(`http://localhost:8890/Fabrica/${codigoFabrica}`, {
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
          jsListarFabrica(); // Volver a cargar la lista
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

function jsRegistrarFabrica() {
  console.log("jsRegistrarFabrica");
  var data = {
    descripcion: $("#Sede").val(),
    tipo: $("#Tipo").val(),
  };
  console.log("data:", data);
  fetch("http://localhost:8890/Fabrica", {
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
  const codigoFabrica = urlParams.get('codigo');

  if (codigoFabrica) {
    console.log("Código de Fabrica:", codigoFabrica);
    jsListarPorCodigo(codigoFabrica);
  }

  // Llamar a jsListar() u otras funciones si es necesario al cargar la página
  jsListarFabrica();
};


///Funcion para actulizar los datos
function jsActualizarFabrica() {
  const urlParams = new URLSearchParams(window.location.search);
  const codigoFabrica = urlParams.get('codigo');

  console.log("jsActualizar", codigoFabrica);
  var data = {
    descripcion: $("#Sede").val(),
    tipo: $("#Tipo").val(),
  };
  console.log("data:", data);

  fetch("http://localhost:8890/Fabrica/" + codigoFabrica, {
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

function jsListarPorCodigo(codigoFabrica) {
  fetch(`http://localhost:8890/Fabrica/${codigoFabrica}`)
    .then(response => response.json())
    .then(data => {
      if (data && data) {
        const elemento = data.data;
        $('#Sede').val(elemento.descripcion);
        $('#Tipo').val(elemento.tipo || '');
        // Llenar otros campos del formulario si es necesario
      } else {
        console.log('No se encontraron datos para el código especificado');
      }
    })
    .catch(error => console.error('Error:', error));
}

