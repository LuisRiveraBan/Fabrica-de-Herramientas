///Codigo JavaScript de  Inicio
window.onload = function () {
    console.log("Onload....");
    jsListarCargo();
    jsListarPorCodigo();
  };

  
  ///Funcion para listar los datos
  function jsListarCargo() {
    fetch('http://localhost:8890/Cargo')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        $('#tbody').html("");
        data.data.forEach((element, idx) => {
          var item = `<tr>
                            <td>${element.codigoCargo}</td>
                            <td>${element.descripcion}</td>
                            <td>
                              <button type="button" onclick="jsEliminarCargo(${element.codigoCargo})" class="btn btn-danger">Eliminar</button>
                              <a onclick="jsActualizarCargo(${element.codigoCargo})" class="btn btn-primary" href="/Administrador_2/CargoActualizar.html?codigo=${element.codigoCargo}">Actualizar</a>
                            </td>
                            </td>
                          </tr>`;
          $('#tbody').append(item);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Función para Eliminar Datos
  function jsEliminarCargo(codigoCargo) {
    console.log("jsEliminar:", codigoCargo);
    fetch(`http://localhost:8890/Cargo/${codigoCargo}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        var item = `<div class="alert alert-primary alert-dismissible fade show">
                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="nc-icon nc-simple-remove"></i>
                            </button>
                            <span><b> Bien! </b><br> Registro eliminado con éxito.</span>
                          </div>`;
        $('#mensaje').html(item);
        jsListarCargo();
      })
      .catch(error => {
        console.error('Error:', error);
        var item = `<div class="alert alert-danger alert-dismissible fade show">
                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="nc-icon nc-simple-remove"></i>
                            </button>
                            <span><b> Se produjo un error. </b><br> Por favor, reintente la operación.</span>
                          </div>`;
        $('#mensaje').html(item);
      });
  }
  
  ///Funcion para registrar los datos
  
  function jsRegistrarCargo() {
    console.log("jsRegistrarCargo");
    var data = {
      descripcion: $("#Cargo").val(),
    };
    console.log("data:", data);
    fetch("http://localhost:8890/Cargo", {
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
    const codigoCargo = urlParams.get('codigo');
  
    if (codigoCargo) {
      console.log("Código de Cargo:", codigoCargo);
      jsListarPorCodigo(codigoCargo);
    }
  
    // Llamar a jsListar() u otras funciones si es necesario al cargar la página
    jsListarCargo();
  };
  
  
  ///Funcion para actulizar los datos
  function jsActualizarCargo() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoCargo = urlParams.get('codigo');
  
    console.log("jsActualizar", codigoCargo);
    var data = {
      descripcion: $("#Cargo").val(),
    };
    console.log("data:", data);
  
    fetch("http://localhost:8890/Cargo/" + codigoCargo, {
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
  
  function jsListarPorCodigo(codigoCargo) {
    fetch(`http://localhost:8890/Cargo/BuscarCargo/${codigoCargo}`)
      .then(response => response.json())
      .then(data => {
        if (data && data) {
          const elemento = data.data;
          $('#Cargo').val(elemento.descripcion);
          // Llenar otros campos del formulario si es necesario
        } else {
          console.log('No se encontraron datos para el código especificado');
        }
      })
      .catch(error => console.error('Error:', error));
  }