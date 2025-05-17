// js/login.js
import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Fungsi untuk memeriksa status login
function checkLoginStatus() {
    const loginLogoutButton = document.getElementById("login-logout");

    onAuthStateChanged(auth, (user) => {
        if (user) {
        loginLogoutButton.textContent = "Logout";
        } else {
        loginLogoutButton.textContent = "Login";
        }
    });
}

// Fungsi untuk menangani klik pada tombol Login/Logout
async function handleLoginLogout() {
    const user = auth.currentUser;

    if (user) {
        // Logout jika sudah login
        try {
        await signOut(auth);
        alert("You have logged out.");
        window.location.href = "login.html";
        } catch (error) {
        console.error("Logout error:", error);
        alert("Logout failed.");
        }
    } else {
        window.location.href = "login.html";
    }
}

// Fungsi untuk login
document
    .getElementById("login-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login berhasil!");
        window.location.href = "index.html";
        } catch (error) {
        console.error("Login error:", error);
        alert("Login gagal: " + error.message);
        }
    });

// Menjalankan fungsi saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    document
        .getElementById("login-logout")
        .addEventListener("click", handleLoginLogout);
});
