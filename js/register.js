// register.js
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

document.getElementById("register-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Ambil data form
  const firstname = document.getElementById('firstname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const messageBox = document.getElementById('register-error-message');

  try {
    // Buat akun di Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data tambahan di Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstname,
      lastname,
      username,
      email,
      createdAt: new Date()
    });

    alert("Registrasi berhasil!");
    window.location.href = 'login.html';
  } catch (err) {
    console.error(err);
    messageBox.innerText = err.message || 'Terjadi kesalahan, coba lagi nanti.';
    messageBox.style.display = 'block';
  }
});
