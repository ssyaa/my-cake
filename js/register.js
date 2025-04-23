document.getElementById("register-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    // Mengambil data dari form pertama
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Mengambil data dari form kedua
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const username = document.getElementById('username').value.trim();
  
    // Menyusun body request
    const requestBody = {
      name, email, password,
      firstname, lastname, username
    };
  
    try {
      // Mengirim data ke API pertama
      const response1 = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data1 = await response1.json();
  
      if (data1.message) {
        alert(data1.message || "Register berhasil!");
      }
  
      // Jika pendaftaran berhasil, lanjutkan ke API kedua
      const response2 = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }),
      });
  
      const data2 = await response2.json();
      const messageBox = document.getElementById('register-error-message');
  
      if (data2.error) {
        messageBox.innerText = data2.error;
        messageBox.style.display = 'block';
      } else {
        alert(data2.message);
        window.location.href = 'login.html';
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan, coba lagi nanti.');
    }
  });
  