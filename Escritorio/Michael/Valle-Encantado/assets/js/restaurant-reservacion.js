/* =========================================================
 *  SISTEMA DE RESERVAS - VALLE ENCANTAD0
 * =======================================================*/

/* ---------- 1. MAPA GLOBAL DE NOMBRES ---------- */
const nombres_platos = {
  // Piqueos / Entradas para compartir
  "tequenos-de-queso": "Tequeños de queso",
  "tequenos-de-mariscos": "Tequeños de mariscos",
  "tequenos-de-rocoto-relleno": "Tequeños de rocoto relleno",
  "piqueo-del-valle": "Piqueo del valle",
  
  // Entradas
  "choclo-con-queso": "Choclo con queso",
  "pulpo-al-olivo": "Pulpo al olivo",
  "zarsa-de-patitas-de-cerdo": "Zarsa de patitas de cerdo",
  "leche-de-tigre": "Leche de tigre",
  "yuquitas-con-queso": "Yuquitas con queso",
  
  // Ensaladas/Postres
  "delicia-de-higos-del-valle": "Delicia de higos del valle",
  
  // Carnes/Recomendaciones del Chef
  "lomo-de-cerdo-en-salsa-de-higos": "Lomo de cerdo en salsa de higos",
  "costillar-de-cerdo-a-la-caja-china": "Costillar de cerdo a la caja china",
  "cerdo-costillar-de-cerdo-ahumado": "Cerdo costillar de cerdo ahumado",
  "pollo-al-cilindro": "1 Pollo al cilindro",
  "pollo-al-cilindro-medio": "1/2 Pollo al cilindro",
  "pollo-al-cilindro-cuarto": "1/4 Pollo al cilindro",
  
  // Especiales/Sabores Criollazo
  "rocoto-con-pastel-de-papa": "Rocoto con pastel de papa",
  "triple-de-la-casa": "Triple de la casa",
  "cuadruple-de-la-casa": "Cuádruple de la casa",
  
  // Platos Criollos
  "chicharron-de-cerdo": "Chicharrón de cerdo",
  "chicharron-de-costilla-de-cerdo": "Chicharrón de costilla de cerdo",
  "chicharron-de-pollo": "Chicharrón de pollo",
  "caldo-blanco-de-lomos": "Caldo blanco de lomos",
  "costillar-de-cordero-dorado": "Costillar de cordero dorado",
  "chupe-de-camaron": "Chupe de camarón",
  "cuy-chactado": "Cuy chactado",
  "cuy-de-la-casa": "Cuy de la casa",
  
  // Parrillas
  "parrilla-de-res": "Parrilla de res",
  "parrilla-de-cerdo": "Parrilla de cerdo",
  "parrilla-de-pollo": "Parrilla de pollo",
  "parrilla-de-pescado": "Parrilla de pescado",
  
  // Platos Infantiles
  "milanesa-de-pollo": "Milanesa de pollo",
  
  // Pescados y Mariscos
  "ceviche-de-trucha": "Ceviche de trucha",
  "ceviche-de-mariscos": "Ceviche de mariscos",
  "trio-marino": "Trio marino",
  "arroz-de-mariscos": "Arroz de mariscos",
  "chaufa-de-mariscos": "Chaufa de mariscos",
  "fusion-marina": "Fusión marina",
  "sudado-de-pescado": "Sudado de pescado",
  "parihuela-de-trucha-y-mariscos": "Parihuela de trucha y mariscos",
  
  // Crocantes Marinos/Frituras
  "trucha-frita": "Trucha frita",
  "chicharron-de-trucha": "Chicharrón de trucha",
  "chicharron-de-pulpo": "Chicharrón de pulpo",
  "chicharron-de-calamar": "Chicharrón de calamar",
  "chicharron-de-camaron": "Chicharrón de camarón",
  
  // Pescados en Salsas
  "trucha-en-salsa-de-ajos": "Trucha en salsa de ajos",
  "trucha-en-salsa-de-champinones": "Trucha en salsa de champiñones",
  "trucha-en-salsa-de-mariscos": "Trucha en salsa de mariscos"
};

/* =========================================================
 * INICIALIZACIÓN DE DATOS
 * =======================================================*/
function obtener_mapa_platos_inicial() {
  return Object.fromEntries(Object.keys(nombres_platos).map(id => [id, 0]));
}

let datos_reserva = {
  personas: null,
  fecha: null,
  hora: null,
  nombre: null,
  telefono: null,
  email: null,
  comentarios: null,
  opcionMenu: "carta",
  platos: obtener_mapa_platos_inicial()
};


/* =========================================================
 * CONFIGURACIÓN INICIAL
 * =======================================================*/
document.addEventListener("DOMContentLoaded", () => {
  configurar_selector_personas();
  configurar_telefono();
  configurar_navegacion_pasos();
  configurar_seleccion_platos();
  configurar_envio_reserva();
  configurar_fecha_minima();
});

/* =========================================================
 * SELECCIÓN DE PERSONAS
 * =======================================================*/
function configurar_selector_personas() {
  const botones = document.querySelectorAll(".boton-persona");
  const input_personalizado = document.getElementById("personas-personalizado");

  botones.forEach(btn => {
    btn.addEventListener("click", () => manejar_seleccion_personas(btn, botones));
  });

  input_personalizado.addEventListener("input", () => {
    // Validar que solo sea número entero positivo
    let valor = input_personalizado.value;
    valor = valor.replace(/[^0-9]/g, ''); // Eliminar todo excepto números
    valor = valor.replace(/^0+/, ''); // Eliminar ceros al inicio
    valor = valor || '0'; // Si queda vacío, poner cero
    
    input_personalizado.value = valor;
    datos_reserva.personas = valor === '0' ? null : parseInt(valor);
  });
}

function manejar_seleccion_personas(boton, todos_botones) {
  todos_botones.forEach(b => b.classList.remove("seleccionado"));
  boton.classList.add("seleccionado");

  const grupo_personalizado = document.getElementById("grupo-personas-personalizado");
  const input_personalizado = document.getElementById("personas-personalizado");
  
  if (boton.dataset.personas === "mas") {
    grupo_personalizado.style.display = "block";
    input_personalizado.value = ''; // Limpiar el input
    input_personalizado.focus(); // Dar foco al input
    datos_reserva.personas = null;
  } else {
    grupo_personalizado.style.display = "none";
    datos_reserva.personas = parseInt(boton.dataset.personas);
  }
}

/* =========================================================
 * TELÉFONO SOLO DÍGITOS
 * =======================================================*/
function configurar_telefono() {
  const tel = document.getElementById("telefono");
  if (!tel) return;
  tel.setAttribute("inputmode", "numeric");
  tel.addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^\d]/g, "");
  });
}

/* =========================================================
 * NAVEGACIÓN ENTRE PASOS
 * =======================================================*/
function configurar_navegacion_pasos() {
  document.getElementById("siguiente-1").addEventListener("click", validar_paso1);
  document.getElementById("siguiente-2").addEventListener("click", validar_paso2);
  document.getElementById("siguiente-3").addEventListener("click", validar_paso3);
  document.getElementById("siguiente-4").addEventListener("click", validar_paso4);

  document.getElementById("anterior-2").addEventListener("click", () => mostrar_paso(1));
  document.getElementById("anterior-3").addEventListener("click", () => mostrar_paso(2));
  document.getElementById("anterior-4").addEventListener("click", () => mostrar_paso(3));
  document.getElementById("anterior-5").addEventListener("click", () => mostrar_paso(4));
}

/* =========================================================
 * VALIDACIÓN DE PASOS
 * =======================================================*/
function validar_paso1() {
  if (!datos_reserva.personas || datos_reserva.personas <= 0) {
    return alert("Selecciona un número válido de personas (mínimo 10)");
  }
  mostrar_paso(2);
}

function validar_paso2() {
  const fecha_input = document.getElementById("fecha").value;
  const hora_input = document.getElementById("hora").value;

  if (!fecha_input || !hora_input) return alert("Completa la fecha y hora");

  const [anio, mes, dia] = fecha_input.split("-").map(Number);
  const fecha_seleccionada = new Date(anio, mes - 1, dia);
  fecha_seleccionada.setHours(0, 0, 0, 0);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha_minima = new Date(hoy);
  fecha_minima.setDate(hoy.getDate() + 1);

  if (fecha_seleccionada < fecha_minima) return alert("La fecha debe ser a partir de mañana");

  datos_reserva.fecha = fecha_input;
  datos_reserva.hora = hora_input;
  mostrar_paso(3);
}

function validar_paso3() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !telefono || !email) return alert("Completa todos los datos personales");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Correo inválido");

  Object.assign(datos_reserva, { nombre, telefono, email });
  mostrar_paso(4);
}

function validar_paso4() {
  datos_reserva.opcionMenu = document.getElementById("opcion-carta").checked ? "carta" : "seleccionar";
  datos_reserva.comentarios = document.getElementById("comentarios").value.trim(); 
  actualizar_resumen_reserva();
  mostrar_paso(5);
}

function configurar_seleccion_platos() {
  document.querySelectorAll('input[name="opcion-menu"]').forEach(radio => {
    radio.addEventListener("change", () => {
      document.getElementById("seleccion-platos").style.display = radio.value === "seleccionar" ? "block" : "none";
    });
  });

  document.querySelectorAll(".boton-aumentar").forEach(btn => {
    btn.addEventListener("click", () => cambiar_cantidad(btn.dataset.plato, +1));
  });
  document.querySelectorAll(".boton-reducir").forEach(btn => {
    btn.addEventListener("click", () => cambiar_cantidad(btn.dataset.plato, -1));
  });
  document.querySelectorAll(".boton-eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      datos_reserva.platos[btn.dataset.plato] = 0;
      actualizar_cantidad_plato(btn.dataset.plato);
    });
  });
}

function cambiar_cantidad(plato_id, delta) {
  datos_reserva.platos[plato_id] = Math.max(0, datos_reserva.platos[plato_id] + delta);
  actualizar_cantidad_plato(plato_id);
}

function actualizar_cantidad_plato(platoId) {
  document.querySelector(`.cantidad-plato[data-plato="${platoId}"]`).textContent = datos_reserva.platos[platoId];
}

function mostrar_paso(n) {
  document.querySelectorAll(".paso").forEach(p => p.classList.remove("activo"));
  document.getElementById(`paso-${n}`).classList.add("activo");
  document.querySelectorAll(".paso-progreso").forEach(p => p.classList.remove("activo"));
  document.querySelector(`.paso-progreso[data-paso="${n}"]`).classList.add("activo");
}

/* =========================================================
 * RESUMEN DE RESERVA
 * =======================================================*/
function actualizar_resumen_reserva() {
  document.getElementById("resumen-personas").textContent = datos_reserva.personas;

  const [anio, mes, dia] = datos_reserva.fecha.split("-").map(Number);
  const fechaLocal = new Date(anio, mes - 1, dia);
  document.getElementById("resumen-fecha").textContent = fechaLocal.toLocaleDateString("es-ES");

  document.getElementById("resumen-hora").textContent = datos_reserva.hora;
  document.getElementById("resumen-nombre").textContent = datos_reserva.nombre;
  document.getElementById("resumen-telefono").textContent = datos_reserva.telefono;
  document.getElementById("resumen-email").textContent = datos_reserva.email;

  document.getElementById("resumen-opcion-menu").textContent =
    datos_reserva.opcionMenu === "carta" ? "Ver carta en restaurante" : "Platos seleccionados";

  const cont_platos = document.getElementById("resumen-platos-container");
  const lista_platos = document.getElementById("resumen-platos-lista");
  lista_platos.innerHTML = "";

  if (datos_reserva.opcionMenu === "seleccionar") {
    Object.entries(datos_reserva.platos).forEach(([id, cant]) => {
      if (cant > 0) {
        const nombre = nombres_platos[id] || "(sin nombre)";
        lista_platos.insertAdjacentHTML(
          "beforeend",
          `<div class="resumen-plato"><span>${nombre}</span><span>${cant}</span></div>`
        );
      }
    });
  }
  cont_platos.style.display = lista_platos.children.length ? "block" : "none";

  const cont_com = document.getElementById("resumen-comentarios-container");
  if (datos_reserva.comentarios) {
    document.getElementById("resumen-comentarios").textContent = datos_reserva.comentarios;
    cont_com.style.display = "block";
  } else {
    cont_com.style.display = "none";
  }
}

/* =========================================================
 * ENVÍO DE RESERVA POR WHATSAPP
 * =======================================================*/
function configurar_envio_reserva() {
  const boton = document.getElementById("enviar-reserva");
  if (!boton) return;

  boton.addEventListener("click", async () => {
    if (!datos_reserva.personas || !datos_reserva.fecha || !datos_reserva.hora || !datos_reserva.nombre || !datos_reserva.telefono) {
      return alert("Completa todos los campos obligatorios");
    }

    // 📨 Enviar a Google Sheets si acepta publicidad
    const checkbox_publicidad = document.getElementById("checkbox-publicidad");
    if (checkbox_publicidad && checkbox_publicidad.checked) {
      enviar_datos_publicidad(datos_reserva.nombre, datos_reserva.email);
    }

    // ✅ Continuar con WhatsApp
    const [anio, mes, dia] = datos_reserva.fecha.split("-").map(Number);
    const fecha_Local = new Date(anio, mes - 1, dia);
    const fecha_formato = fecha_Local.toLocaleDateString("es-ES", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    let msg = "=====================\n";
    msg += "  NUEVA RESERVA\n";
    msg += "  RESTAURANTE VALLE ENCANTADO\n";
    msg += "=====================\n\n";
    msg += ">>> DATOS DEL CLIENTE <<<\n";
    msg += `Nombre: ${datos_reserva.nombre}\n`;
    msg += `Teléfono: ${datos_reserva.telefono}\n`;
    if (datos_reserva.email) msg += `Email: ${datos_reserva.email}\n`;

    msg += "\n>>> DETALLES DE LA RESERVA <<<\n";
    msg += `Fecha: ${fecha_formato}\n`;
    msg += `Hora: ${datos_reserva.hora}\n`;
    msg += `Personas: ${datos_reserva.personas}\n`;
    msg += `Opción de menú: ${
      datos_reserva.opcionMenu === "carta" ? "Ver carta en restaurante" : "Platos seleccionados"
    }\n`;

    if (datos_reserva.opcionMenu === "seleccionar") {
      msg += "\n>>> PLATOS SELECCIONADOS <<<\n";
      Object.entries(datos_reserva.platos).forEach(([id, cant]) => {
        if (cant > 0) {
          const nombre = nombres_platos[id] || id;
          msg += `${nombre}: ${cant}\n`;
        }
      });
    } 

    if (datos_reserva.comentarios) {
      msg += "\n>>> COMENTARIOS <<<\n" + datos_reserva.comentarios + "\n";
    }

    const url = `https://wa.me/51980661191?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    alert("Serás redirigido a WhatsApp para confirmar tu reserva. ¡Gracias!");
    reiniciar_formulario();
  });
}


/* =========================================================
 * FECHA MÍNIMA (MAÑANA)
 * =======================================================*/
function configurar_fecha_minima() {
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const yyyy = manana.getFullYear();
  const mm = String(manana.getMonth() + 1).padStart(2, "0");
  const dd = String(manana.getDate()).padStart(2, "0");
  document.getElementById("fecha").min = `${yyyy}-${mm}-${dd}`;
}

/* =========================================================
 * REINICIO DE FORMULARIO
 * =======================================================*/
function reiniciar_formulario() {
  mostrar_paso(1);
  document.querySelectorAll(".boton-persona").forEach(b => b.classList.remove("seleccionado"));
  document.getElementById("grupo-personas-personalizado").style.display = "none";
  document.getElementById("personas-personalizado").value = "";
  document.getElementById("comentarios").value = "";

  datos_reserva = {
    personas: null,
    fecha: null,
    hora: null,
    nombre: null,
    telefono: null,
    email: null,
    comentarios: null,
    opcionMenu: "carta",
    platos: obtener_mapa_platos_inicial()
  };

  ["fecha", "hora", "nombre", "telefono", "email", "comentarios"].forEach(id => {
    document.getElementById(id).value = "";
  });

  document.getElementById("opcion-carta").checked = true;
  document.getElementById("seleccion-platos").style.display = "none";
  document.querySelectorAll(".cantidad-plato").forEach(el => el.textContent = "0");

  configurar_fecha_minima();
}



async function enviar_datos_publicidad(nombre, correo) {
  const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbyqId2AvjvsnoI-Cj9Vx_QaBga4HEe2NgNNp8b1omTHXEknyh4_qtE_o6_tKnEcuk9U-w/exec';
  
  // Método 1: Fetch estándar
  try {
    const response = await fetch(URL_SCRIPT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        nombre: nombre || '',
        correo: correo || '',
        publicidad: 'Sí',
        metodo: 'fetch'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === "success") {
        console.log('✅ Datos enviados (fetch)');
        return true;
      }
    }
  } catch (error) {
    console.warn('Error con fetch:', error);
  }
  
  // Método 2: Formulario oculto
  try {
    const form = document.createElement('form');
    form.style.display = 'none';
    form.method = 'POST';
    form.action = URL_SCRIPT;
    form.target = '_blank';
    
    const addField = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };
    
    addField('nombre', nombre || '');
    addField('correo', correo || '');
    addField('publicidad', 'Sí');
    addField('metodo', 'form');
    
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => form.remove(), 5000);
    
    console.log('📤 Datos enviados (form)');
    return true;
  } catch (error) {
    console.warn('Error con formulario:', error);
  }
  
  // Método 3: Imagen como último recurso
  try {
    const img = new Image();
    const url = new URL(URL_SCRIPT);
    url.searchParams.set('nombre', nombre || '');
    url.searchParams.set('correo', correo || '');
    url.searchParams.set('publicidad', 'Sí');
    url.searchParams.set('metodo', 'img');
    
    img.src = url.toString();
    img.style.display = 'none';
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 5000);
    
    console.log('🖼 Datos enviados (img)');
    return true;
  } catch (error) {
    console.error('❌ Todos los métodos fallaron');
    return false;
  }
}


document.getElementById("click-fecha").addEventListener("click", function () {
  document.getElementById("fecha").showPicker(); // abre el calendario
});

document.querySelectorAll(".opcion-menu").forEach(opcion => {
  opcion.addEventListener("click", function() {
    const idRadio = this.getAttribute('data-radio');
    if (idRadio) {
      const radioInput = document.getElementById(idRadio);
      if (radioInput) {
        radioInput.checked = true;
        // También deberías actualizar la selección en datosReserva
        datos_reserva.opcionMenu = radioInput.value === "seleccionar" ? "seleccionar" : "carta";
        // Mostrar/ocultar la sección de selección de platos según corresponda
        document.getElementById("seleccion-platos").style.display = 
          radioInput.value === "seleccionar" ? "block" : "none";
      }
    }
  });
});