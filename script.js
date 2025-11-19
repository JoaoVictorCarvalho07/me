      function toggleTheme() {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }
      function closeMobile() {
        document.getElementById("mobileNav").classList.add("hidden");
      }
      document.getElementById("year").textContent = new Date().getFullYear();