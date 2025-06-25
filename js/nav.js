document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-theme");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });
  }

  // Tự động bật lại giao diện trước đó
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
