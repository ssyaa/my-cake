// navbar.js
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const loginLogoutButton = document.getElementById('login-logout');
const navbarMenu = document.querySelector('.navbar-menu');

// Fungsi untuk memperbarui tampilan navbar
function updateNavbar(user) {
    if (user) {
        // Jika sudah login
        loginLogoutButton.textContent = 'Logout';
        loginLogoutButton.href = '#'; // Jangan arahkan ke login.html kalau udah login

        // Cek apakah menu Add Recipes sudah ada
        if (!document.getElementById('add-recipes-link')) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = 'add_recipes.html';
        link.textContent = 'Add Recipes';
        link.id = 'add-recipes-link';
        li.appendChild(link);
        navbarMenu.appendChild(li);
        }

    } else {
        // Jika belum login
        loginLogoutButton.textContent = 'Login';
        loginLogoutButton.href = 'login.html';

        // Hapus menu Add Recipes jika ada
        const addRecipesLink = document.getElementById('add-recipes-link');
        if (addRecipesLink) {
        addRecipesLink.parentElement.remove(); // hapus <li> yang berisi Add Recipes
        }
    }
}

// Fungsi saat tombol Login/Logout diklik
async function handleLoginLogout(event) {
    event.preventDefault(); // mencegah pindah halaman saat Logout

    if (auth.currentUser) {
        try {
        await signOut(auth);
        alert('You have logged out.');
        } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to logout.');
        }
    } else {
        window.location.href = 'login.html';
    }
}

// Saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    // Deteksi perubahan login secara real-time
    onAuthStateChanged(auth, (user) => {
        updateNavbar(user);
    });

    loginLogoutButton.addEventListener('click', handleLoginLogout);
});
