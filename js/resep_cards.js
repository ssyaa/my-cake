import { getDocs, collection } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { db } from "./firebase-config.js";

const cardsContainer = document.getElementById('cards');

async function loadPublicRecipes() {
    try {
        const resepSnapshot = await getDocs(collection(db, 'resep'));

        if (resepSnapshot.empty) {
            cardsContainer.innerHTML = '<p>Tidak ada resep yang ditemukan.</p>';
            return;
        }

        cardsContainer.innerHTML = '';

        resepSnapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.classList.add('card');

            const imgSrc = data.imageUrl || 'https://via.placeholder.com/180x120?text=No+Image';

            card.innerHTML = `
                <img src="${imgSrc}" alt="${data.title}" />
                <div class="card-title">${data.title}</div>
            `;

            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error getting recipes:', error);
        cardsContainer.innerHTML = '<p>Gagal memuat resep.</p>';
    }
}

// Jalankan saat halaman dimuat
loadPublicRecipes();
