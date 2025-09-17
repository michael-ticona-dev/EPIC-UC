// ============================
// ELEMENTOS DEL DOM
// ============================
const btnAbrirModal = document.getElementById('btn-abrir-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const cerrarModal = document.getElementById('cerrar-modal');
const cambiarALogin = document.getElementById('cambiar-a-login');
const cambiarARegistro = document.getElementById('cambiar-a-registro');
const formularioLogin = document.getElementById('formulario-login');
const formularioRegistro = document.getElementById('formulario-registro');


// ============================
// MANEJO DEL MODAL
// ============================

// Abrir modal
btnAbrirModal.addEventListener('click', () => {
    modalBackdrop.classList.add('activo');
    mostrarFormularioLogin();
});

// Cerrar modal
cerrarModal.addEventListener('click', () => {
    modalBackdrop.classList.remove('activo');
});

// Cerrar modal al hacer clic fuera del contenido
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('activo');
    }
});


// ============================
// CAMBIO ENTRE FORMULARIOS
// ============================

cambiarARegistro.addEventListener('click', mostrarFormularioRegistro);
cambiarALogin.addEventListener('click', mostrarFormularioLogin);

// Mostrar formulario de registro
function mostrarFormularioRegistro() {
    formularioLogin.classList.remove('activo');
    formularioRegistro.classList.add('activo');
}

// Mostrar formulario de inicio de sesión
function mostrarFormularioLogin() {
    formularioRegistro.classList.remove('activo');
    formularioLogin.classList.add('activo');
}


// ============================
// VALIDACIONES REGISTRO
// ============================

formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    ocultarTodosLosErrores();

    let esValido = true;

    // Validar nombre de usuario
    const nombreUsuario = document.getElementById('nombre-usuario').value;
    if (nombreUsuario.length < 3) {
        mostrarError('error-nombre-usuario', 'El nombre de usuario debe tener al menos 3 caracteres');
        esValido = false;
    }

    // Validar email
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        mostrarError('error-email', 'Por favor ingresa un email válido');
        esValido = false;
    }

    // Validar contraseña
    const contrasena = document.getElementById('contrasena').value;
    if (contrasena.length < 6) {
        mostrarError('error-contrasena', 'La contraseña debe tener al menos 6 caracteres');
        esValido = false;
    }

    // Validar confirmación de contraseña
    const confirmarContrasena = document.getElementById('confirmar-contrasena').value;
    if (contrasena !== confirmarContrasena) {
        mostrarError('error-confirmar-contrasena', 'Las contraseñas no coinciden');
        esValido = false;
    }

    // Validar términos y condiciones
    const terminosAceptados = document.getElementById('terminos-checkbox').checked;
    if (!terminosAceptados) {
        alert('Debes aceptar los términos y condiciones');
        esValido = false;
    }

    // Si es válido, simular registro
    if (esValido) {
        const datosRegistro = {
            nombre_usuario: nombreUsuario,
            email: email,
            contrasena: contrasena,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            fecha_nacimiento: document.getElementById('fecha-nacimiento').value,
            boletin: document.getElementById('boletin-checkbox').checked
        };

        console.log('Datos de registro:', datosRegistro);

        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        mostrarFormularioLogin();
        formularioRegistro.reset();
    }
});


// ============================
// VALIDACIONES LOGIN
// ============================

formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    ocultarTodosLosErrores();

    let esValido = true;

    // Validar nombre de usuario
    const nombreUsuario = document.getElementById('login-usuario').value;
    if (nombreUsuario.length < 3) {
        mostrarError('error-login-usuario', 'Por favor ingresa un nombre de usuario válido');
        esValido = false;
    }

    // Validar contraseña
    const contrasena = document.getElementById('login-contrasena').value;
    if (contrasena.length < 1) {
        mostrarError('error-login-contrasena', 'Por favor ingresa tu contraseña');
        esValido = false;
    }

    // Si es válido, simular login
    if (esValido) {
        const datosLogin = {
            nombre_usuario: nombreUsuario,
            contrasena: contrasena
        };

        console.log('Datos de login:', datosLogin);

        alert('¡Inicio de sesión exitoso!');
        modalBackdrop.classList.remove('activo');
        formularioLogin.reset();
    }
});


// ============================
// FUNCIONES AUXILIARES
// ============================

// Validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar mensaje de error
function mostrarError(id, mensaje) {
    const elementoError = document.getElementById(id);
    elementoError.textContent = mensaje;
    elementoError.style.display = 'block';
}

// Ocultar todos los mensajes de error
function ocultarTodosLosErrores() {
    const errores = document.querySelectorAll('.mensaje-error');
    errores.forEach(error => {
        error.style.display = 'none';
    });
}
