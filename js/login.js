document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form[action='login_process.php']");

  loginForm.addEventListener("submit", function (e) {
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (username === "" || password === "") {
      alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      e.preventDefault(); // Ngăn gửi form
      return;
    }

    // Nếu bạn muốn kiểm tra ký tự đặc biệt hoặc độ dài:
    if (username.length < 3) {
      alert("Tên đăng nhập phải có ít nhất 3 ký tự.");
      e.preventDefault();
      return;
    }

    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      e.preventDefault();
      return;
    }

    // Có thể thêm kiểm tra regex ở đây nếu cần
  });
});
