import { Post } from "./entities.js";

let uid = localStorage.getItem("currentUserID");

// ================= CREATE
export async function createPost() {
  const post = new Post({
    title: document.getElementById("post-title").value.trim(),
    thumbnail: document.getElementById("post-thumbnail").value.trim(),
    content: document.getElementById("editor").innerHTML,
    shortDesc: document.getElementById("short-desc")?.value,
    author: uid,
  });

  await post.save();
  window.location.href = "../index.html";
}

// ================= EDIT
export async function updatePost(postID) {
  const post = await Post.getById(postID);

  post.title = document.getElementById("post-title").value;
  post.thumbnail = document.getElementById("post-thumbnail").value;
  post.content = document.getElementById("editor").innerHTML;
  post.shortDesc = document.getElementById("short-desc").value;

  await post.save();
  window.location.href = `detail.html?postID=${postID}`;
}

// ================= DELETE
export async function deletePost(postID) {
  const post = await Post.getById(postID);
  await post.delete();
  window.location.href = "../index.html";
}

// ================= VIEW
export async function viewPost(postID) {
  const post = await Post.getById(postID);

  document.getElementById("post-title").innerText = post.title;
  document.getElementById("post-thumbnail").src = post.thumbnail;
  document.getElementById("post-content").innerHTML = post.content;

  await post.increaseView();
}

// ================= LIST
export async function listPosts(container) {
  const posts = await Post.getAll();
  container.innerHTML = "";
  posts.forEach((post) => {
    console.log(post);
    container.innerHTML += post.toHTMLCode();
  });
}

// ------------------------ thêm hàm vào trang
document.addEventListener("DOMContentLoaded", async () => {
  const postID = new URLSearchParams(window.location.search).get("postID");
  const currentURL = window.location.href;

  // trang post.html
  if (currentURL.includes("post.html")) {
    const deleteBtn = document.getElementById("delete-post-btn");

    // chỉnh sửa bài viết
    if (postID) {
      // hiện nút xoá bài viết
      deleteBtn.classList.remove("d-none");
      // load dữ liệu bài viết lên form
      (async () => {
        const post = await Post.getById(postID);
        document.getElementById("post-title").value = post.title;
        document.getElementById("post-thumbnail").value = post.thumbnail;
        document.getElementById("editor").innerHTML = post.content;
        document.getElementById("short-desc").value = post.shortDesc;
      })();

      // sự kiện xoá bài viết
      deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm(
          "Bạn có chắc muốn xoá bài viết này không?",
        );
        if (confirmDelete) {
          await deletePost(postID);
        }
      });
      return;
    }

    // sự kiện đăng/ cập nhật bài viết
    document.getElementById("post")?.addEventListener("click", async () => {
      if (postID) {
        // cập nhật
        await updatePost(postID);
      } else {
        // tạo mới
        await createPost();
      }
    });
  }

  // trang detail.html
  if (currentURL.includes("detail.html") && postID) {
   await viewPost(postID);
    return;
  }

  const listContainer = document.getElementById("newsContainer");
  // trang index.html
  if (currentURL.includes("index.html") && listContainer) {
    await listPosts(listContainer);
    return;
  }
});
