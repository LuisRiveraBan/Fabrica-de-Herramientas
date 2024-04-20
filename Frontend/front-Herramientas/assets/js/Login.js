document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;

    fetch('http://localhost:8890/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(function(response) {
        if (response.ok) {
            return response.text(); // Obtener el texto de la respuesta si es exitosa
        } else if (response.status === 401) {
            // Si las credenciales son inválidas
            Swal.fire({
                title: 'Bienvenido!',
                text: 'Deseas continuar?',
                icon: 'sucess',
                confirmButtonText: 'Cerrar',
                timer: 5000
            });
            throw new Error('Credenciales inválidas');
        } else {
            // Otro tipo de error
            Swal.fire({
                title: 'Error al procesar la solicitud!',
                text: 'Deseas continuar?',
                icon: 'error',
                confirmButtonText: 'Cerrar',
                timer: 5000
            });
            throw new Error('Error al procesar la solicitud');
        }
    })
    .then(function(data) {
        try {
            const response = JSON.parse(data); // Parsear la respuesta JSON
    
            if (response.estado === 'ACTIVO') {
                // Si el estado es ACTIVO, verificar el cargo
                const rol = response.cargo;
    
                if (rol === 'Administrador') {
                    Swal.fire({
                        title: 'Bienvenido!',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        timer: 5000
                    }).then(() => {
                        window.location.href = '/Administrador_2/menu.html'; // Redirigir a la página del administrador
                    });
                } else {
                    Swal.fire({
                        title: 'Bienvenido!',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        timer: 5000
                    }).then(() => {
                        window.location.href = '/administracion/menu.html'; // Redirigir a la página del usuario normal
                    });
                }
            } else if (response.estado === 'INACTIVO') {
                // Si el estado es INACTIVO, mostrar un mensaje de credenciales deprecadas
                Swal.fire({
                    title: 'Credenciales deprecadas',
                    text: 'Su cuenta ha sido desactivada. Por favor, contacte al administrador.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            } else {
                // Manejar otros posibles estados aquí, si es necesario
                // Por ejemplo, mostrar un mensaje de error o hacer alguna otra acción
            }
        } catch (error) {
            console.error('Error al analizar la respuesta JSON:', error);
            // Manejar el error en caso de que la respuesta no sea un JSON válido
        }
    })
    
    
    .catch(function(error) {
        console.error('Error:', error);
        // Manejar cualquier error que ocurra durante el proceso
        Swal.fire({
            title: 'Error al procesar la solicitud!',
            text: 'Deseas continuar?',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            timer: 5000
        });
    });
});
