const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showLoginFormBtn = document.getElementById("showLoginFormBtn");
const showSignupFormBtn = document.getElementById("showSignupFormBtn");

// Chuyển form login/signup
function changeForm(showLogin) {
  loginForm.classList.toggle("d-none", !showLogin);
  loginForm.classList.toggle("d-block", showLogin);
  signupForm.classList.toggle("d-none", showLogin);
  signupForm.classList.toggle("d-block", !showLogin);

  showLoginFormBtn.classList.toggle("btn-primary", showLogin);
  showLoginFormBtn.classList.toggle("btn-outline-primary", !showLogin);
  showSignupFormBtn.classList.toggle("btn-primary", !showLogin);
  showSignupFormBtn.classList.toggle("btn-outline-primary", showLogin);
}

// Gắn sự kiện đổi form
showLoginFormBtn.addEventListener("click", () => changeForm(true));
showSignupFormBtn.addEventListener("click", () => changeForm(false));

// Hiển thị mật khẩu login
document.getElementById("showLoginPassword").addEventListener("change", function () {
  const pwd = document.getElementById("loginPassword");
  pwd.type = this.checked ? "text" : "password";
});

// Validate form signup
function validateSignupForm(email, username, password) {
  if (username.length < 6) {
    alert("Username phải có ít nhất 6 ký tự.");
    return false;
  }
  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự.");
    return false;
  }
  return true;
}

// Kiểm tra email đã đăng ký
function isEmailRegistered(email) {
  return localStorage.getItem(email) !== null;
}

// Đăng ký: lưu dữ liệu vào localStorage
function signupToLocalStorage() {
  const email = document.getElementById("signupEmail").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!validateSignupForm(email, username, password)) return;

  if (isEmailRegistered(email)) {
    alert("Email đã được đăng ký. Vui lòng dùng email khác.");
    return;
  }

  localStorage.setItem(email, password);
  alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
  changeForm(true);
}

// Đăng nhập: kiểm tra localStorage và chuyển trang
function loginToHome() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!isEmailRegistered(email)) {
    alert("Email chưa được đăng ký. Vui lòng đăng ký trước.");
    return;
  }

  const storedPassword = localStorage.getItem(email);
  if (storedPassword !== password) {
    alert("Mật khẩu không đúng. Vui lòng thử lại.");
    return;
  }

  localStorage.setItem("currentUser", email);
  alert("Đăng nhập thành công! Chuyển về trang chủ...");
  window.location.href = "../index.html";
}

// Bắt sự kiện form
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  signupToLocalStorage();
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  loginToHome();
});
