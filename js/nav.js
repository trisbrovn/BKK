function checkLoginStatus() {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (!loginBtn || !logoutBtn) return;

  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    loginBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
  } else {
    loginBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
  }
}

function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      alert("Đã đăng xuất.");
      window.location.reload(); // Tải lại để cập nhật nút
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();
  setupLogout();
});

// ============= Chỉnh sáng/ tối ===============================
const toggleBtn = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");
const savedTheme = localStorage.getItem("theme") || "light";

function applyTheme(theme) {
  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(`${theme}-mode`);
  
  if (icon) {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
  localStorage.setItem("theme", theme);
}

applyTheme(savedTheme);

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
}