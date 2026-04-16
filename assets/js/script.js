//footer date
document.querySelectorAll(".js-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
