function toggleMobileNav() {
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("navOverlay");

  nav.classList.toggle("open");
  overlay.classList.toggle("active");
}

function closeMobileNav() {
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("navOverlay");

  nav.classList.remove("open");
  overlay.classList.remove("active");
}

(function highlightActiveNav() {
  const path = window.location.pathname;
  // Pega o nome do arquivo (ex: "projetos.html" ou "" para index)
  const page = path.split("/").pop() || "index.html";

  document.querySelectorAll(".site-nav a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("/").pop();

    const isHome =
      (page === "index.html" || page === "") &&
      (linkPage === "index.html" || linkPage === "" || linkPage === "#");
    const isMatch = linkPage && linkPage !== "" && page.includes(linkPage);

    if (isHome || isMatch) {
      link.classList.add("active");
    }
  });
})();
