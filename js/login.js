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
        checkLoginStatus(); // Update status login setelah logout
        window.location.href = 'login.html'; // Mengarahkan ke halaman login setelah logout
    } else {
        // Jika belum login, arahkan ke halaman login
        window.location.href = 'login.html'; // Mengarahkan ke halaman login.html
    }
}

// Fungsi untuk login
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login berhasil!");
            // Menyimpan token di localStorage jika login berhasil
            localStorage.setItem("authToken", data.token);
            window.location.href = "index.html"; // Mengarahkan ke halaman index setelah login
        } else {
            alert(data.message || "Login gagal!"); // Menampilkan pesan error jika login gagal
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});

// Fungsi untuk logout
async function logout() {
    try {
        const token = localStorage.getItem('authToken');

        // Kirim request logout jika token ada
        if (token) {
            await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Menyertakan token untuk autentikasi
                },
            });

            alert("Logout berhasil!");
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert('An error occurred during logout.');
    }
}

// Menjalankan fungsi saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); // Pastikan status login diperiksa saat halaman dimuat
    document.getElementById('login-logout').addEventListener('click', handleLoginLogout);
});
