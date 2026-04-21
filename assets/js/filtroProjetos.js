(function initProjectFilter() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll("[data-tags]");

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // atualiza tab ativa
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(",").map((t) => t.trim());
        const show = filter === "todos" || tags.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
