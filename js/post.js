function format(command) {
  document.execCommand(command, false, null);
}

function insertImage() {
  const url = prompt("Nhập link ảnh:");
  if (url) document.execCommand("insertImage", false, url);
}

function submitPost() {
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
    date: new Date().toLocaleString()
  };

  console.log("Dữ liệu bài viết:", postData);
  alert("Đăng bài thành công!");

  // Lưu vào localStorage (tùy chọn)
  const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  allPosts.push(postData);
  localStorage.setItem("posts", JSON.stringify(allPosts));

  // Quay về trang chủ hoặc làm gì đó
  window.location.href = "../index.html";
}

