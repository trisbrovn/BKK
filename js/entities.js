import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { db } from "./firebase_config.js";

class User {
  constructor(
    username,
    email,
    uid,
    photoURL = "https://i.pinimg.com/originals/7c/d3/d4/7cd3d4a24e4821ead74b90cb8a55a692.jpg",
  ) {
    this.$username = username;
    this.$email = email;
    this.$uid = uid;
    this.$photoURL = photoURL;
  }

  toObject() {
    return {
      username: this.$username,
      email: this.$email,
      uid: this.$uid,
      photoURL: this.$photoURL,
      createdAt: new Date(),
    };
  }

  // =========================
  // AUTO-ID SAFE QUERY
  static async getByUID(uid) {
    const q = query(collection(db, "users"), where("uid", "==", uid));

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const data = snapshot.docs[0].data();
    return new User(data.username, data.email, data.uid, data.photoURL);
  }
}

//====================================
class Post {
  constructor({
    id = null,
    title,
    thumbnail = "",
    shortDesc = "",
    content,
    author,
    createdAt = new Date(),
    updatedAt = new Date(),
    views = 0,
    category = "Công nghệ",
  }) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.shortDesc = shortDesc || content?.slice(0, 120) + "...";
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.views = views;
    this.category = category;
  }

  // =======================
  // FIRESTORE MAPPING
  toFirestore() {
    return {
      title: this.title,
      thumbnail: this.thumbnail,
      shortDesc: this.shortDesc,
      content: this.content,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      views: this.views,
      category: this.category,
    };
  }

  static fromFirestore(docSnap) {
    return new Post({
      id: docSnap.id,
      ...docSnap.data(),
    });
  }

  // =======================
  // CRUD
  async save() {
    if (this.id) {
      this.updatedAt = new Date();
      await updateDoc(doc(db, "posts", this.id), this.toFirestore());
    } else {
      const ref = await addDoc(collection(db, "posts"), this.toFirestore());
      this.id = ref.id;
    }
  }

  async delete() {
    if (!this.id) return;
    await deleteDoc(doc(db, "posts", this.id));
  }

  async increaseView() {
    this.views++;
    await updateDoc(doc(db, "posts", this.id), {
      views: this.views,
    });
  }

  // =======================
  // QUERIES
  static async getById(id) {
    const snap = await getDoc(doc(db, "posts", id));
    if (!snap.exists()) return null;
    return Post.fromFirestore(snap);
  }

  static async getAll() {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => Post.fromFirestore(d));
  }

  // =======================
  // UI RENDERING
  toHTMLCode() {
    return `
      <div class="col-12 col-md-6 col-lg-4" data-postId="${this.id}">
        <div class="card h-100 shadow-sm border-0 hover-shadow">
          <img
            src="${this.thumbnail}"
            class="card-img-top"
            style="object-fit:cover;height:200px"
            alt="${this.title}"
          />
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between mb-2">
              <span class="badge bg-primary">${this.category}</span>
              <small class="text-muted">
                <i class="far fa-calendar-alt me-1"></i>
                ${
                  this.createdAt.toDate
                    ? this.createdAt.toDate().toLocaleDateString("vi-VN")
                    : new Date(this.createdAt).toLocaleDateString("vi-VN")
                }
              </small>
            </div>

            <h5 class="card-title fw-bold">${this.title}</h5>

            <p class="card-text text-secondary text-truncate-3">
              ${this.shortDesc}
            </p>

            <div class="mt-auto d-flex justify-content-between align-items-center">
              <a href="../pages/detail.html?postID=${this.id}"
                 class="btn btn-outline-primary btn-sm fw-bold">
                Đọc tiếp
              </a>
              <div class="text-muted small">
                <i class="far fa-eye me-1"></i>${this.views}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

//====================================
export { User, Post };
