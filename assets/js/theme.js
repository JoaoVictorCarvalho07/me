const THEME_KEY = "joao.theme";

function setTheme(mode) {
  const html = document.documentElement;
  if (mode === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch (_) {}
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
}

// Inicializa tema ao carregar
(function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  } catch (_) {}
})();
