// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF6hudG4x20HxpgU2-l-GhUGRsI5qt8NQ",
  authDomain: "spck-jsi-78969.firebaseapp.com",
  projectId: "spck-jsi-78969",
  storageBucket: "spck-jsi-78969.firebasestorage.app",
  messagingSenderId: "190714465712",
  appId: "1:190714465712:web:eacf1b4c55da831ab3da75",
  measurementId: "G-3215DFRK7P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);