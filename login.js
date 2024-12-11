// Data login yang sudah ada
const validUsername = "Tekno_"; // Username valid
const validPassword = "Cibeber123"; // Password valid

// Event listener untuk form login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form untuk melakukan submit secara default

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        // Simpan status login di localStorage agar tetap teringat setelah refresh
        localStorage.setItem("isLoggedIn", "true");
        // Redirect ke halaman dashboard setelah login sukses
        window.location.href = "dashboard.html"; // Ganti dengan halaman utama aplikasi kamu
    } else {
        // Jika login gagal
        document.getElementById("error-message").textContent = "Username atau Password salah!";
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form untuk melakukan submit secara default

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        // Menyimpan username dan status login di localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        // Redirect ke halaman dashboard setelah login berhasil
        window.location.href = "dashboard.html";
    } else {
        // Jika login gagal
        document.getElementById("error-message").textContent = "Username atau Password salah!";
    }
});
