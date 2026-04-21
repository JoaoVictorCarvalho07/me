function openModal(src) {
  const img = document.getElementById("modalImg");
  const overlay = document.getElementById("modal");
  if (!img || !overlay) return;
  img.src = src;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modal");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
