// Fungsi untuk memeriksa status login
function checkLoginStatus() {
  const loginLogoutButton = document.getElementById('login-logout');
  
  // Mengecek apakah token ada di localStorage
  if (localStorage.getItem('authToken')) {
      loginLogoutButton.textContent = 'Logout'; // Mengubah tombol menjadi "Logout" jika sudah login
  } else {
      loginLogoutButton.textContent = 'Login'; // Mengubah tombol menjadi "Login" jika belum login
  }
}

// Fungsi untuk menangani klik pada tombol Login/Logout
async function handleLoginLogout(event) {
  const loginLogoutButton = document.getElementById('login-logout');
  
  if (localStorage.getItem('authToken')) {
      // Jika sudah login, logout
      await logout();
      alert('You have logged out.');
      localStorage.removeItem('authToken'); // Menghapus token dari localStorage
      loginLogoutButton.textContent = 'Login'; // Mengubah teks kembali menjadi "Login"
  } else {
      // Jika belum login, arahkan ke halaman login
      window.location.href = 'login.html'; // Mengarahkan ke halaman login.html
  }
}

// Fungsi untuk login
async function login(username, password) {
  try {
      const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
          localStorage.setItem('authToken', data.token); // Menyimpan token JWT di localStorage
          alert('You have logged in!');
          checkLoginStatus(); // Update status login
      } else {
          alert(data.message); // Menampilkan pesan error jika login gagal
      }
  } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
  }
}

// Fungsi untuk logout
async function logout() {
  try {
      await fetch('http://localhost:5000/logout', { method: 'POST' });
  } catch (error) {
      console.error('Error during logout:', error);
  }
}

// Menjalankan fungsi saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  document.getElementById('login-logout').addEventListener('click', handleLoginLogout);
});
