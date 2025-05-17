# MyCake Recipes

**MyCake Recipes** adalah sebuah website sederhana untuk berbagi dan menyimpan berbagai resep kue. Pengguna dapat menulis, menyimpan, serta menghapus resep kue mereka secara mandiri setelah login. Website ini cocok untuk siapa saja yang ingin berbagi resep homemade cake favorit atau menyimpan resep pribadi secara online.

---

## Fitur Utama

- Autentikasi pengguna (login & logout)
- Menambahkan resep kue (dengan gambar)
- Menyimpan resep secara personal ke akun pengguna
- Melihat resep-resep dari pengguna lain secara publik
- Menghapus resep pribadi

---

## Teknologi yang Digunakan

| Teknologi      | Fungsi                         |
|----------------|--------------------------------|
| HTML, CSS, JS  | Tampilan dan interaksi frontend |
| Firebase Auth  | Autentikasi akun pengguna       |
| Firestore      | Penyimpanan data resep          |
| Cloudinary     | Penyimpanan dan hosting gambar  |
| Vercel         | Hosting dan deployment          |
| GitHub Actions | CI/CD otomatis untuk testing    |
| Jest           | Unit Testing untuk kode JavaScript |

---

## Unit Testing

Website ini menggunakan **Jest** untuk menguji bagian-bagian logika JavaScript secara otomatis.

### Tujuan:
- Memastikan fungsi-fungsi berjalan dengan benar (seperti perhitungan, validasi input, dsb)
- Meningkatkan keandalan sistem

### Contoh:
File `math.js`:
```js
export function tambah(a, b) {
    return a + b;
}

export function kurang(a, b) {
    return a - b;
}

export function kali(a, b) {
    return a * b;
}

export function bagi(a, b) {
    if (b === 0) throw new Error("Tidak bisa bagi dengan nol");
    return a / b;
}

