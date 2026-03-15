function toggleTheme() {
	const isDark = document.documentElement.classList.contains("dark");
	setTheme(isDark ? "light" : "dark");
}
function closeMobile() {
	document.getElementById("mobileNav").classList.add("hidden");
}
document.getElementById("year").textContent = new Date().getFullYear();

function openModal(src) {
	document.getElementById("modal-img").src = src;
	const m = document.getElementById("modal");
	m.style.display = "flex";
}
function closeModal() {
	document.getElementById("modal").style.display = "none";
}
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") closeModal();
});

const THEME_KEY = "joao.theme";
function setTheme(mode) {
	const html = document.documentElement;
	if (mode === "dark") html.classList.add("dark");
	else html.classList.remove("dark");
	try {
		localStorage.setItem(THEME_KEY, mode);
	} catch (e) {}
}
(function initTheme() {
	try {
		const saved = localStorage.getItem(THEME_KEY);
		if (saved) {
			setTheme(saved);
		} else if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			setTheme("dark");
		}
	} catch (e) {}
})();
