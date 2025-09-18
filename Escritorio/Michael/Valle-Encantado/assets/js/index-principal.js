document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // 1. VARIABLES GLOBALES Y SELECTORES
    // =============================================
    const menuMovil = document.querySelector('.menu-movil');
    const navegacionPrincipal = document.querySelector('.navegacion-principal ul');
    const header = document.querySelector('header');
    const formularioReserva = document.getElementById('formulario-reserva');
    const tarjetasGaleria = document.querySelectorAll('.tarjeta-galeria');
    const modalLightbox = document.querySelector('.modal-lightbox');
    const imagenLightbox = document.getElementById('imagen-lightbox');
    const pieLightbox = document.querySelector('.pie-lightbox');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const anteriorBtn = document.querySelector('.anterior-btn');
    const siguienteBtn = document.querySelector('.siguiente-btn');
    const selectServicio = document.getElementById("servicio-select");
    const restaurante = document.getElementById("opciones-restaurante");
    const hotel = document.getElementById("opciones-hotel");
    const mensaje = document.getElementById("mensaje-general");
    const enlacesNav = document.querySelectorAll('.navegacion-principal a');

    let indiceImagenActual = 0;
    const imagenes = [];

    // =============================================
    // 2. MENÚ MÓVIL
    // =============================================
    function inicializarMenuMovil() {
        menuMovil.addEventListener('click', function () {
            navegacionPrincipal.classList.toggle('activo');
            menuMovil.innerHTML = navegacionPrincipal.classList.contains('activo')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Cerrar menú al hacer clic en un enlace
        enlacesNav.forEach(enlace => {
            enlace.addEventListener('click', function () {
                if (navegacionPrincipal.classList.contains('activo')) {
                    navegacionPrincipal.classList.remove('activo');
                    menuMovil.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // =============================================
    // 3. EFECTO SCROLL EN HEADER
    // =============================================
    function inicializarScrollHeader() {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // =============================================
    // 4. DESPLAZAMIENTO SUAVE
    // =============================================
    function inicializarScrollSuave() {
        document.querySelectorAll('a[href^="#"]').forEach(enlace => {
            enlace.addEventListener('click', function (e) {
                e.preventDefault();

                const idDestino = this.getAttribute('href');
                const elementoDestino = document.querySelector(idDestino);

                if (elementoDestino) {
                    window.scrollTo({
                        top: elementoDestino.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =============================================
    // 5. FORMULARIO DE RESERVA
    // =============================================
    function inicializarFormulario() {
        if (formularioReserva) {
            formularioReserva.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Gracias por tu consulta. Nos pondremos en contacto contigo pronto.');
                this.reset();
            });
        }
    }

    // =============================================
    // 6. GALERÍA LIGHTBOX
    // =============================================
    function inicializarLightbox() {
        // Inicializar galería
        tarjetasGaleria.forEach((tarjeta, indice) => {
            const img = tarjeta.querySelector('img');
            const titulo = tarjeta.querySelector('h3').textContent;
            const descripcion = tarjeta.querySelector('p').textContent;

            imagenes.push({
                src: img.src,
                alt: img.alt,
                titulo: titulo,
                descripcion: descripcion
            });

            tarjeta.addEventListener('click', function () {
                abrirLightbox(indice);
            });
        });

        // Event listeners del lightbox
        cerrarModal.addEventListener('click', cerrarLightbox);
        anteriorBtn.addEventListener('click', mostrarAnterior);
        siguienteBtn.addEventListener('click', mostrarSiguiente);
        document.addEventListener('keydown', manejarTecladoLightbox);
        modalLightbox.addEventListener('click', cerrarClickExterno);
    }

    function abrirLightbox(indice) {
        indiceImagenActual = indice;
        actualizarLightbox();
        modalLightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function actualizarLightbox() {
        imagenLightbox.src = imagenes[indiceImagenActual].src;
        imagenLightbox.alt = imagenes[indiceImagenActual].alt;
        pieLightbox.textContent = `${imagenes[indiceImagenActual].titulo} - ${imagenes[indiceImagenActual].descripcion}`;
    }

    function cerrarLightbox() {
        modalLightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function mostrarAnterior() {
        indiceImagenActual = (indiceImagenActual - 1 + imagenes.length) % imagenes.length;
        actualizarLightbox();
    }

    function mostrarSiguiente() {
        indiceImagenActual = (indiceImagenActual + 1) % imagenes.length;
        actualizarLightbox();
    }

    function manejarTecladoLightbox(e) {
        if (modalLightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                cerrarLightbox();
            } else if (e.key === 'ArrowLeft') {
                mostrarAnterior();
            } else if (e.key === 'ArrowRight') {
                mostrarSiguiente();
            }
        }
    }

    function cerrarClickExterno(e) {
        if (e.target === modalLightbox) {
            cerrarLightbox();
        }
    }

    // =============================================
    // 7. ENLACES ACTIVOS
    // =============================================
    function inicializarEnlacesActivos() {
        enlacesNav.forEach(enlace => {
            enlace.addEventListener('click', function () {
                enlacesNav.forEach(el => el.classList.remove('activo'));
                this.classList.add('activo');

                // Quitar la clase después de 1 segundo
                setTimeout(() => {
                    this.classList.remove('activo');
                }, 1000);
            });
        });
    }

    // =============================================
    // INICIALIZACIÓN DE TODAS LAS FUNCIONALIDADES
    // =============================================
    function inicializarTodo() {
        inicializarMenuMovil();
        inicializarScrollHeader();
        inicializarScrollSuave();
        inicializarFormulario();
        inicializarLightbox();
        inicializarSelectorServicio();
        inicializarEnlacesActivos();
    }

    // Ejecutar inicialización
    inicializarTodo();
});

// =============================================
// BOTONES DE ACCIÓN
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    const btnHotel = document.querySelector('.boton-accion.hotel');
    const btnRestaurante = document.querySelector('.boton-accion.restaurante');

    if (btnHotel) {
        btnHotel.addEventListener('click', function () {
            window.open('pages/hotel-valle-encantado.html', '_blank');
        });
    }

    if (btnRestaurante) {
        btnRestaurante.addEventListener('click', function () {
            window.open('pages/restaurant-valle-encantado.html', '_blank');
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".texto-sobre, .imagen-sobre");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // 🔄 Se reinicia al salir
      }
    });
  }, { threshold: 0.3 }); // 30% visible

  elementos.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const habitaciones = document.querySelectorAll(".habitacion");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // 🔄 Reinicia cuando sales
      }
    });
  }, { threshold: 0.2 }); // 20% visible activa la animación

  habitaciones.forEach(h => observer.observe(h));
});

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".info-contacto, .botones-reserva");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // 🔄 se reinicia al salir
      }
    });
  }, { threshold: 0.3 }); // activa cuando 30% del bloque es visible

  elementos.forEach(el => observer.observe(el));
});
