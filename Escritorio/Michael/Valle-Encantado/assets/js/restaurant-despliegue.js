document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.plato-header').forEach(header => {
    header.addEventListener('click', e => {
      // Evitar que gire si haces clic en botones dentro del header
      if (e.target.closest('button')) return;

      const icon = header.querySelector('.toggle-icon');
      icon.classList.toggle('girado');
    });
  });
});


