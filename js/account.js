import { User } from "./entities.js";
import { auth } from "./firebase_config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const uid = localStorage.getItem("currentUserID");

// DOM
const usernameEl = document.getElementById("account-username");
const uidEl = document.getElementById("account-uid");
const emailEl = document.getElementById("account-email");
const logoutBtn = document.getElementById("logout-btn");

// =====================
// Guard: must login
if (!uid) {
  window.location.href = "./login.html";
}

// =====================
// Load user info
async function loadAccountInfo() {
  try {
    const user = await User.getByUID(uid);

    if (!user) {
      alert("Không tìm thấy thông tin người dùng");
      return;
    }

    usernameEl.innerText = user.$username;
    uidEl.innerText = user.$uid;
    emailEl.innerText = user.$email;
  } catch (error) {
    console.error(error);
    alert("Lỗi khi tải thông tin tài khoản");
  }
}

loadAccountInfo();

// =====================
// Logout
logoutBtn.addEventListener("click", () => {
  // logout firebase auth
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("currentUserID");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // An error happened.
      alert("Lỗi khi đăng xuất");
      console.error("Error signing out: ", error);
    });
});
