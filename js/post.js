import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { db,auth } from "./firebase_config.js";

function format(command) {
  document.execCommand(command, false, null);
}

function insertImage() {
  const url = prompt("Nhập link ảnh:");
  if (url) document.execCommand("insertImage", false, url);
}

async function submitPost(Uid) {
  const title = document.getElementById("post-title").value.trim();
  const thumbnail = document.getElementById("post-thumbnail").value.trim();
  const content = document.getElementById("editor").innerHTML;

  if (!title || !content) {
    alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
    return;
  }

  const postData = {
    title,
    thumbnail,
    content,
    date: new Date().toLocaleString(),
    author: Uid // Có thể lấy từ biến người dùng nếu có
  };

  console.log("Dữ liệu bài viết:", postData);

  // Lưu vào Fires (tùy chọn)
  try {
    // add data
    await addDoc(collection(db, "posts" ), postData);
    // chuyển trang về home
    // window.location.href = "../index.html";

} catch (error) {
    console.error("Error adding document: ", error);
    alert("Đăng bài thất bại!");

}

}
// lấy mã người dùng
let Uid = localStorage.getItem("currentUser");

document.getElementById("post").addEventListener("click",async()=>{
  await submitPost(Uid);
});