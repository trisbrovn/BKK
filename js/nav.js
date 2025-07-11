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
