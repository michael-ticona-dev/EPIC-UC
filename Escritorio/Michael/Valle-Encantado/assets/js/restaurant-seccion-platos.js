document.addEventListener("DOMContentLoaded", () => {
  /* ========= PASO 1: abrir/cerrar cada sección ========= */
  document.querySelectorAll('.toggle-platos').forEach(toggle => {
    const contenedor = toggle.nextElementSibling; // el .contenedor-platos que viene justo después
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('abierto');
      contenedor.classList.toggle('visible');
      contenedor.classList.toggle('oculto');
    });
  });

  /* ========= PASO 3: mostrar descripción por plato ========= */
  document.querySelectorAll('.plato-header').forEach(header => {
    header.addEventListener('click', e => {
      // Ignorar clics en botones de cantidad/eliminar
      if (e.target.closest('button')) return;
      const descripcion = header.nextElementSibling;
      descripcion.classList.toggle('visible');
      descripcion.classList.toggle('oculto');
    });
  });
});