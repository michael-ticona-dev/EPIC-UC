const btnAbrirCarta = document.getElementById('btn-abrir-carta');
const modalCarta = document.getElementById('modal-carta');
const btnCerrarCarta = document.getElementById('btn-cerrar-carta');
const iframeCarta = modalCarta.querySelector('iframe');

function abrirCarta() {
  iframeCarta.src = 'assets/pdf/carta-valle-encantado.pdf';
  modalCarta.classList.remove('hidden');
  modalCarta.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarCarta() {
  modalCarta.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  setTimeout(() => {
    modalCarta.classList.add('hidden');
    iframeCarta.src = '';
  }, 300);
}

btnAbrirCarta.addEventListener('click', abrirCarta);
btnCerrarCarta.addEventListener('click', cerrarCarta);

modalCarta.addEventListener('click', (e) => {
  if (e.target === modalCarta) cerrarCarta();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalCarta.classList.contains('active')) {
    cerrarCarta();
  }
});
