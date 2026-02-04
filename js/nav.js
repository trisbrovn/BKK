function checkLoginStatus() {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const createPostBtn = document.getElementById("create-post-btn");
  const accountBtn = document.getElementById("account-btn");

  if (!loginBtn || !logoutBtn) return;

  const currentUserID = localStorage.getItem("currentUserID");

  if (currentUserID) {
    loginBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
    createPostBtn.classList.remove("d-none");
    accountBtn.classList.remove("d-none");
  } else {
    loginBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
    createPostBtn.classList.add("d-none");
    accountBtn.classList.add("d-none");
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

// ============= them cac ham vao trang web ===============================
document.addEventListener("DOMContentLoaded", () => {
  const currentUserID = localStorage.getItem("currentUserID");
  const currentURL = window.location.href;
  // kiem tra tung trang con 
  if (currentURL.includes("login.html") && currentUserID) {
    window.location.href = "../index.html"; // chuyen ve trang chu neu da dang nhap
  } else if (currentURL.includes("post.html") && !currentUserID) {
    alert("Vui lòng đăng nhập để tạo tin tức.");
    window.location.href = "./login.html"; // chuyen ve trang dang nhap neu chua dang nhap
  }
  checkLoginStatus();
  setupLogout();
});
