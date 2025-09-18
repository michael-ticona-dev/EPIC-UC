// Mostrar el modal
document.getElementById("ver-politica").addEventListener("click", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modal-politica");
  modal.classList.add("mostrar");
  document.body.style.overflow = "hidden"; // 🚫 Bloquea el scroll del fondo
});

// Cerrar el modal
document.querySelector(".modal .cerrar").addEventListener("click", function () {
  const modal = document.getElementById("modal-politica");
  modal.classList.remove("mostrar");
  document.body.style.overflow = ""; // ✅ Restaura el scroll al cerrar
});

// También cerrar si se hace clic fuera del contenido
document.getElementById("modal-politica").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.remove("mostrar");
    document.body.style.overflow = "";
  }
});
