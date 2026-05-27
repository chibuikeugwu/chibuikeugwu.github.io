(function () {
  const STORAGE_KEY = "site-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
      const icon = toggle.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
      const label = toggle.querySelector(".theme-toggle-label");
      if (label) {
        label.textContent = theme === "dark" ? "Light" : "Dark";
      }
    }
  }

  function preferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const saved = root.getAttribute("data-theme") || preferredTheme();
    applyTheme(saved);

    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });
})();
