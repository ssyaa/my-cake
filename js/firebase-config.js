// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXaRHB6TzTo6sHYI5DTRcFvQKASiJeDLw",
    authDomain: "mycake-8e379.firebaseapp.com",
    projectId: "mycake-8e379",
    storageBucket: "mycake-8e379.appspot.com",
    messagingSenderId: "882440746587",
    appId: "1:882440746587:web:1bf4894b19ab6da69d717e",
    measurementId: "G-KT0V1Z4YSN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
