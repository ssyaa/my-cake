import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { auth, db } from "./firebase-config.js";

const form = document.getElementById('recipe-form');
const loading = document.getElementById('loading');

document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back();
});

onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const ingredients = document.getElementById('ingredients').value.trim();
        const steps = document.getElementById('steps').value.trim();
        const imageFile = document.getElementById('image').files[0];

        if (!title || !ingredients || !steps) {
            alert('Please fill all required fields');
            return;
        }

        loading.style.display = 'flex';

        try {
            let imageUrl = '';
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile);
            }

            const recipeData = {
                title,
                ingredients,
                steps,
                imageUrl,
                createdAt: serverTimestamp(),
                userId: user.uid, // Optional: Untuk referensi siapa yang menambahkan
                email: user.email || '',
            };

            // Simpan ke subcollection user
            await addDoc(collection(db, 'users', user.uid, 'resep'), recipeData);

            // Simpan ke collection global
            await addDoc(collection(db, 'resep'), recipeData);

            alert('Recipe added successfully!');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add recipe: ' + error.message);
        } finally {
            loading.style.display = 'none';
        }
    });
});

async function uploadImageToCloudinary(file) {
    const url = 'https://api.cloudinary.com/v1_1/dkxlgujvc/image/upload'; // Ganti dengan URL milikmu
    const preset = 'mycake'; // Ganti dengan preset kamu

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    const res = await fetch(url, {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Upload gagal");

    return data.secure_url;
}
