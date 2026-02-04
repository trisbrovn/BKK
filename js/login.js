import { auth, db } from "./firebase_config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  or,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { User } from "./entities.js";

// =================================================
// neu da dang nhap thi chuyen ve trang home
let currentUserUID = localStorage.getItem("currentUserID");
if (currentUserUID) {
  window.location.href = "../index.html";
}

// =================================================
// login
const loginForm = document.getElementById("signin-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  // sign in with firebase auth
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // luu vao local storage
      localStorage.setItem("currentUserID", user.uid);
      // thong bao dang nhap thanh cong -> chuyen sang home
      alert("Đăng nhập thành công!");
      // xoa task luu tam de load lai
      localStorage.removeItem("tasks");
      location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu.");
      console.error(errorMessage);
    });
});

// =================================================
// signup
const signupForm = document.getElementById("signup-form");
function validateSignupForm(email, username, password, confirmPassword) {
  // username >= 6 + no space
  if (username.length < 6) {
    alert("Tên người dùng phải có 6 kí tự trở lên.");
    return false;
  }
  if (username.includes(" ")) {
    alert("Tên người dùng không được dùng dấu cách");
    return false;
  }
  // pass >= 6
  if (password < 6) {
    alert("Mật khẩu phải cókhẩuí tự trở lên.");
    return false;
  }
  // pass == confirmpass
  if (password !== confirmPassword) {
    alert("Mật khẩu không trùng khớp với trường nhập lại.");
    return false;
  }
  return true;
}

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword",
  ).value;

  // =====================
  // Validate
  if (!validateSignupForm(username, email, password, confirmPassword)) {
    return;
  }

  try {
    // =====================
    // Check duplicate username OR email
    const q = query(
      collection(db, "users"),
      or(where("username", "==", username), where("email", "==", email)),
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      alert("Email hoặc Username đã được đăng kí, vui lòng đăng nhập!");
      return;
    }

    // =====================
    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const authUser = userCredential.user;

    // =====================
    // Save user to Firestore (AUTO ID)
    const newUser = new User(username, email, authUser.uid);

    await addDoc(collection(db, "users"), newUser.toObject());

    // =====================
    // Local storage
    localStorage.setItem("currentUserID", authUser.uid);

    alert("Đăng kí tài khoản thành công!");
    localStorage.removeItem("tasks");

    window.location.href = "../index.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("User is logged in");
//     console.log("UID:", user.uid);
//   } else {
//     console.log("User is not logged in");
//   }
// })
