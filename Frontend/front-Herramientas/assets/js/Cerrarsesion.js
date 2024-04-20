function mostrarAlerta() {
    // Mostrar SweetAlert
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar tu sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cerrar Sesion',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Si el usuario confirma, redirige
      if (result.isConfirmed) {
        window.location.href = '/administracion/Login.html';
      }
    });
  }