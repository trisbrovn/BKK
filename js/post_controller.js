import { Post } from "./entities.js";

let uid = localStorage.getItem("currentUserID");

// Hàm kiểm tra tính hợp lệ của dữ liệu
function validatePostData(data) {
  if (!data.title) {
    alert("Vui lòng nhập tiêu đề bài viết!");
    return false;
  }
  if (!data.shortDesc) {
    alert("Vui lòng nhập mô tả ngắn!");
    return false;
  }
  // Kiểm tra editor có nội dung thực sự hay không (không chỉ là các thẻ trống)
  const textContent = data.content.replace(/<[^>]*>/g, "").trim();
  if (!textContent && !data.content.includes("<img")) {
    alert("Vui lòng nhập nội dung bài viết!");
    return false;
  }
  return true;
}

// ================= CREATE
export async function createPost() {
  const title = document.getElementById("post-title").value.trim();
  const thumbnail = document.getElementById("post-thumbnail").value.trim();
  const content = document.getElementById("editor").innerHTML.trim();
  const shortDesc = document.getElementById("post-short-desc")?.value.trim();

  // Chặn nếu dữ liệu trống
  if (!validatePostData({ title, shortDesc, content })) return;

  const post = new Post({
    title,
    thumbnail: thumbnail || "https://via.placeholder.com/400x200?text=No+Image", // Ảnh mặc định nếu trống
    content,
    shortDesc,
    author: uid,
  });

  await post.save();
  window.location.href = "../index.html";
}

// ================= EDIT
export async function updatePost(postID) {
  const title = document.getElementById("post-title").value.trim();
  const thumbnail = document.getElementById("post-thumbnail").value.trim();
  const content = document.getElementById("editor").innerHTML.trim();
  const shortDesc = document.getElementById("post-short-desc").value.trim();

  // Chặn nếu dữ liệu trống
  if (!validatePostData({ title, shortDesc, content })) return;

  const post = await Post.getById(postID);
  post.title = title;
  post.thumbnail = thumbnail;
  post.content = content;
  post.shortDesc = shortDesc;

  await post.save();
  window.location.href = `../pages/detail.html?postID=${postID}`;
}

// ================= DELETE (Giữ nguyên)
export async function deletePost(postID) {
  const post = await Post.getById(postID);
  await post.delete();
  window.location.href = "../index.html";
}

// ================= VIEW (Giữ nguyên)
export async function viewPost(postID) {
  const post = await Post.getById(postID);
  document.getElementById("post-title").innerText = post.title;
  if(document.getElementById("post-thumbnail")) {
      document.getElementById("post-thumbnail").src = post.thumbnail;
  }
  document.getElementById("post-content").innerHTML = post.content;
  await post.increaseView();
}

// ================= LIST (Giữ nguyên)
export async function listPosts(container) {
  const posts = await Post.getAll();
  container.innerHTML = "";
  posts.forEach((post) => {
    container.innerHTML += post.toHTMLCode();
  });
}

// ------------------------ Khởi tạo sự kiện
document.addEventListener("DOMContentLoaded", async () => {
  const postID = new URLSearchParams(window.location.search).get("postID");
  const currentURL = window.location.href;

  if (currentURL.includes("post.html")) {
    const deleteBtn = document.getElementById("delete-post-btn");
    const postBtn = document.getElementById("post");

    // Nếu là chế độ chỉnh sửa
    if (postID) {
      deleteBtn?.classList.remove("d-none");
      const post = await Post.getById(postID);
      document.getElementById("post-title").value = post.title;
      document.getElementById("post-thumbnail").value = post.thumbnail;
      document.getElementById("editor").innerHTML = post.content;
      document.getElementById("post-short-desc").value = post.shortDesc; // Sửa ID ở đây khớp với HTML
      
      postBtn.innerText = "Cập nhật bài viết";
    }

    // Sự kiện Click nút Đăng/Cập nhật
    postBtn?.addEventListener("click", async () => {
      if (postID) {
        await updatePost(postID);
      } else {
        await createPost();
      }
    });

    // Sự kiện Xoá
    deleteBtn?.addEventListener("click", async () => {
      if (confirm("Bạn có chắc muốn xoá bài viết này không?")) {
        await deletePost(postID);
      }
    });
  }

  // Các trang khác
  if (currentURL.includes("detail.html") && postID) {
    await viewPost(postID);
  }

  const listContainer = document.getElementById("newsContainer");
  if ((currentURL.includes("index.html") || currentURL.endsWith("/")) && listContainer) {
    await listPosts(listContainer);
  }
});