document.addEventListener('DOMContentLoaded', function() {
    // Datos de las habitaciones
    const rooms = [
        { id: 1, name: "habitacion-matrimonial-simple", price: 100, capacity: 2 },
        { id: 2, name: "habitacion-doble", price: 120, capacity: 2 },
        { id: 3, name: "habitacion-con-jacuzzi", price: 140, capacity: 1 }
    ];

    // Elementos del DOM
    const roomTypeSelect = document.getElementById('roomType');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const reservationForm = document.getElementById('reservationForm');
    const reservationSummary = document.getElementById('reservationSummary');
    const notification = document.getElementById('notification');
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.querySelector('.nav-bar');

    // Configurar fechas mínimas
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    checkOutInput.min = today;

    // Manejar el menú hamburguesa
    if (menuToggle && navBar) {
        // Cerrar menú al hacer clic en un enlace (para móviles)
        const navLinks = document.querySelectorAll('.nav-bar ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.checked = false;
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Controlar el scroll del body cuando el menú está abierto
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (menuToggle.checked && 
                !e.target.closest('.nav-bar') && 
                !e.target.closest('.menu-icon')) {
                menuToggle.checked = false;
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
// Actualizar el resumen de la reservación
function updateReservationSummary() {
    const roomId = parseInt(document.getElementById('roomType').value);
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const children = parseInt(document.getElementById('children').value) || 0;
    const fullName = document.getElementById('fullName').value.trim() || 'N/A';
    const email = document.getElementById('email').value.trim() || 'N/A';
    const phone = document.getElementById('phone').value.trim() || 'N/A';
    const specialRequestsValue = document.getElementById('specialRequests').value.trim() || 'Ninguna';

    const summaryContent = document.querySelector('#reservationSummary .summary-content');

    // Validar selección mínima
    if (!roomId || !checkIn || !checkOut) {
        summaryContent.innerHTML = '<p>Seleccione una habitación y fechas para ver el resumen</p>';
        return;
    }

    const room = rooms.find(r => r.id === roomId);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validar fechas
    if (checkOutDate <= checkInDate) {
        showNotification('La fecha de salida debe ser posterior a la de entrada', 'error');
        return;
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const subtotal = room.price * nights;
    const total = subtotal;

    // Actualizar resumen completo
    summaryContent.innerHTML = `
        <div class="summary-item"><span>Habitación:</span><span>${room.name}</span></div>
        <div class="summary-item"><span>Precio por noche:</span><span>&/${room.price}</span></div>
        <div class="summary-item"><span>Fechas:</span><span>${formatDate(checkIn)} - ${formatDate(checkOut)} (${nights} noches)</span></div>
        <div class="summary-item"><span>Adultos:</span><span>${adults}</span></div>
        <div class="summary-item"><span>Niños:</span><span>${children}</span></div>
        <div class="summary-item"><span>Nombre:</span><span>${fullName}</span></div>
        <div class="summary-item"><span>Email:</span><span>${email}</span></div>
        <div class="summary-item"><span>Teléfono:</span><span>${phone}</span></div>
        <div class="summary-item"><span>Subtotal:</span><span>&/${subtotal.toFixed(2)}</span></div>
        <div class="summary-item"><span>Comentario:</span><span>${specialRequestsValue}</span></div>
        <div class="summary-item summary-total"><span>Total:</span><span>&/${total.toFixed(2)}</span></div>
    `;
}

// === Escuchar cambios en todos los campos para actualización en tiempo real ===
const inputsToWatch = ['roomType', 'checkIn', 'checkOut', 'adults', 'children', 'fullName', 'email', 'phone', 'specialRequests'];
inputsToWatch.forEach(id => {
    document.getElementById(id).addEventListener('input', updateReservationSummary);
});

// Ejecutar al cargar por si ya hay valores
updateReservationSummary();


    // Formatear fecha para mostrar
    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Mostrar notificación
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = 'notification show ' + type;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Enviar reservación por WhatsApp
    function sendReservationByWhatsApp(reservationData) {
        const room = rooms.find(r => r.id === reservationData.roomId);
        const checkInDate = new Date(reservationData.checkIn);
        const checkOutDate = new Date(reservationData.checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const subtotal = room.price * nights;
        const taxes = subtotal * 0.16;
        const total = subtotal + taxes;

        let message = "=== Reservación - Hotel Valle Encantado===\n\n";
        message += "=== DATOS DE LA RESERVACIÓN ===\n";
        message += `*Habitación:* ${room.name}\n`;
        message += `*Fechas:* ${formatDate(reservationData.checkIn)} - ${formatDate(reservationData.checkOut)} (${nights} noches)\n`;
        message += `*Huéspedes:* ${reservationData.adults} adulto(s), ${reservationData.children} niño(s)\n`;
        message += "=== DATOS DEL CLIENTE ===\n";
        message += `*Nombre:* ${reservationData.fullName}\n`;
        message += `*Teléfono:* ${reservationData.phone}\n`;
        if (reservationData.email) message += `*Email:* ${reservationData.email}\n\n`;
        message += "=== COMENTARIOS ===\n";
        if (reservationData.specialRequests) message += `*Solicitudes especiales:* ${reservationData.specialRequests}\n`;

        const phoneNumber = "51980661191";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // Event listeners para el formulario
    roomTypeSelect.addEventListener('change', updateReservationSummary);
    checkInInput.addEventListener('change', function() {
        checkOutInput.min = this.value;
        updateReservationSummary();
    });
    checkOutInput.addEventListener('change', updateReservationSummary);

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const roomId = parseInt(roomTypeSelect.value);
        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const specialRequests = document.getElementById('specialRequests').value;
        
        if (!roomId || !checkIn || !checkOut || !fullName || !phone) {
            showNotification('Por favor complete todos los campos requeridos', 'error');
            return;
        }
        
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        if (checkOutDate <= checkInDate) {
            showNotification('La fecha de salida debe ser posterior a la de entrada', 'error');
            return;
        }
        
        const reservationData = {
            roomId,
            checkIn,
            checkOut,
            adults,
            children,
            fullName,
            email,
            phone,
            specialRequests
        };
        
        sendReservationByWhatsApp(reservationData);
        showNotification('Serás redirigido a WhatsApp para confirmar tu reserva');
        
        // Resetear formulario
        reservationForm.reset();
        checkInInput.min = today;
        checkOutInput.min = today;
        reservationSummary.querySelector('.summary-content').innerHTML = 
            '<p>Seleccione una habitación y fechas para ver el resumen</p>';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del menú
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.querySelector('.nav-bar');
    const menuIcon = document.querySelector('.menu-icon');
    
    // Verificar que los elementos existen
    if (!menuToggle || !navBar || !menuIcon) return;
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    const navLinks = document.querySelectorAll('.nav-bar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Controlar el scroll del body cuando el menú está abierto
    menuToggle.addEventListener('change', function() {
        document.body.style.overflow = this.checked ? 'hidden' : 'auto';
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (menuToggle.checked && 
            !e.target.closest('.nav-bar') && 
            !e.target.closest('.menu-icon')) {
            menuToggle.checked = false;
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del menú
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.querySelector('.nav-bar');
    const menuIcon = document.querySelector('.menu-icon');
    
    // Verificar que los elementos existen
    if (!menuToggle || !navBar || !menuIcon) return;
    
    // Función para cerrar el menú
    function closeMenu() {
        menuToggle.checked = false;
        document.body.style.overflow = 'auto';
        navBar.classList.remove('active');
    }
    
    // Función para abrir el menú
    function openMenu() {
        menuToggle.checked = true;
        document.body.style.overflow = 'hidden';
        navBar.classList.add('active');
    }
    
    // Alternar menú al hacer clic en el icono
    menuIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menuToggle.checked) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    const navLinks = document.querySelectorAll('.nav-bar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (menuToggle.checked && 
            !e.target.closest('.nav-bar') && 
            e.target !== menuIcon && 
            !e.target.closest('.menu-icon')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al cambiar el tamaño de la ventana (si se hace más grande)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuToggle.checked) {
            closeMenu();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const body = document.body;
  const menuIcon = document.querySelector('.menu-icon');

  // Asegurarse que el icono existe
  if (!menuIcon) {
    console.error('No se encontró el elemento .menu-icon');
    return;
  }

  // Mostrar icono en móvil
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      menuIcon.style.display = 'flex';
    } else {
      menuIcon.style.display = 'none';
    }
  }

  // Controlar estado del menú
  menuToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  });

  // Cerrar menú al hacer clic en enlaces
  document.querySelectorAll('.navegacion-principal a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menuToggle.checked = false;
        body.classList.remove('menu-open');
      }
    });
  });
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});


// Obtener todos los botones de selección de habitación
const selectButtons = document.querySelectorAll('.select-room');
const roomSelect = document.getElementById('roomType');
const reservationSection = document.getElementById('reservar');

selectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const roomId = button.getAttribute('data-id'); 
        roomSelect.value = roomId;
        reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        roomSelect.focus();
    });
});

// Seleccionar todos los contenedores de fecha
const dateGroups = document.querySelectorAll('.form-group');

dateGroups.forEach(group => {
    const input = group.querySelector('input[type="date"]');
    if (!input) return; 

    // Agregar listener al div completo
    group.addEventListener('click', () => {
        // Abrir el selector de fecha
        if (input.showPicker) {
            input.showPicker();
        } else {
            input.focus(); 
        }
    });
});

// Solución de fuerza bruta - cierra el menú con cualquier clic
// Solución definitiva para cerrar el menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.querySelector('.menu-icon');
    
    // Verificar que los elementos existen
    if (!menuToggle || !menuIcon) return;
    
    // Cerrar el menú al hacer clic en cualquier parte del documento
    document.addEventListener('click', function(event) {
        // Si el menú está abierto Y el clic NO fue en el icono del menú
        if (menuToggle.checked && !menuIcon.contains(event.target)) {
            // Forzar el cierre del menú
            menuToggle.checked = false;
            
            // También disparar el evento change por si hay otros listeners
            const changeEvent = new Event('change');
            menuToggle.dispatchEvent(changeEvent);
        }
    });
    
    // Prevenir que los clics dentro del menú cierren el menú
    const navBar = document.querySelector('.nav-bar');
    if (navBar) {
        navBar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});
//FUNCIONA ¿COMO? PUES QUIEN SABE JAJAJAJA NO LO TOQUES JAJAJA cuando lo estaba moviendo, modificando el menu bar dejo de funcionar JAJAJ HAHAHAH si funciona no lo toques iijaijijzijz