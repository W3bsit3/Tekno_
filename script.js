document.addEventListener("DOMContentLoaded", () => {
    const inputBarangTable = document.getElementById("inputBarangTable");
    const rekapBarangTableBody = document.querySelector("#rekapBarangTable tbody");
    const saveDataBtn = document.getElementById("saveDataBtn");
    const barangDataKey = "rekapBarang"; // Key untuk localStorage

    // Fungsi untuk mengambil data dari localStorage
    const getStoredData = () => {
        return JSON.parse(localStorage.getItem(barangDataKey)) || [];
    };

    // Fungsi untuk menyimpan data ke localStorage
    const saveData = (data) => {
        localStorage.setItem(barangDataKey, JSON.stringify(data));
    };

    // Fungsi untuk merender tabel rekap
    const renderRekapTable = () => {
        const data = getStoredData();
        rekapBarangTableBody.innerHTML = ""; // Kosongkan tabel

        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.barang}</td>
                <td><img src="${item.gambar}" alt="${item.barang}" class="gambar-barang"></td>
                <td>${item.kegunaan}</td>
                <td>${item.alasan}</td>
                <td>${item.biaya}</td>
            `;
            rekapBarangTableBody.appendChild(row);
        });
    };

    // Tambahkan baris baru saat Enter ditekan
    inputBarangTable.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const currentRow = event.target.closest("tr");
            const newRow = currentRow.cloneNode(true);

            // Reset input pada baris baru
            newRow.querySelectorAll("input").forEach((input) => {
                if (input.type === "file") {
                    input.value = "";
                } else {
                    input.value = "";
                }
            });

            currentRow.parentNode.appendChild(newRow);
            event.preventDefault();
        }
    });

    // Simpan data ke tabel rekap dan localStorage
    saveDataBtn.addEventListener("click", () => {
        const rows = inputBarangTable.querySelectorAll("tbody tr");
        const data = getStoredData();

        rows.forEach((row) => {
            const barang = row.querySelector(".input-barang").value;
            const gambarInput = row.querySelector(".input-gambar").files[0];
            const kegunaan = row.querySelector(".input-kegunaan").value;
            const alasan = row.querySelector(".input-alasan").value;
            const biaya = row.querySelector(".input-biaya").value;

            if (barang && kegunaan && alasan && biaya) {
                let gambarURL = "";
                if (gambarInput) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        gambarURL = reader.result;
                        const newBarang = { barang, gambar: gambarURL, kegunaan, alasan, biaya };
                        data.push(newBarang);
                        saveData(data);
                        renderRekapTable();
                    };
                    reader.readAsDataURL(gambarInput);
                } else {
                    const newBarang = { barang, gambar: gambarURL, kegunaan, alasan, biaya };
                    data.push(newBarang);
                    saveData(data);
                    renderRekapTable();
                }
            }
        });

        // Kosongkan tabel input
        inputBarangTable.querySelector("tbody").innerHTML = `
            <tr>
                <td><input type="text" class="input-barang" placeholder="Nama Barang"></td>
                <td><input type="file" class="input-gambar"></td>
                <td><input type="text" class="input-kegunaan" placeholder="Kegunaan/Fungsi"></td>
                <td><input type="text" class="input-alasan" placeholder="Alasan"></td>
                <td><input type="number" class="input-biaya" placeholder="Biaya"></td>
            </tr>
        `;
    });

    // Render tabel saat halaman pertama kali dimuat
    renderRekapTable();
});

document.addEventListener("DOMContentLoaded", () => {
    const barangDataKey = "rekapBarang"; // Key untuk localStorage
    const totalBarangElement = document.getElementById("totalBarang");
    const totalBiayaElement = document.getElementById("totalBiaya");

    // Ambil data dari localStorage
    const getStoredData = () => {
        return JSON.parse(localStorage.getItem(barangDataKey)) || [];
    };

    // Hitung total barang dan biaya
    const calculateStats = () => {
        const data = getStoredData();
        const totalBarang = data.length;
        const totalBiaya = data.reduce((sum, item) => sum + parseFloat(item.biaya || 0), 0);

        totalBarangElement.textContent = totalBarang;
        totalBiayaElement.textContent = `Rp ${totalBiaya.toLocaleString()}`;
    };

    // Render statistik
    calculateStats();
});

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("rekapTable");

    // Event listener for keydown to navigate inputs
    table.addEventListener("keydown", (event) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === "input") {
            const cell = target.closest("td");
            const row = cell.parentElement;
            const cellIndex = Array.from(row.children).indexOf(cell);
            const rowIndex = Array.from(table.querySelectorAll("tbody tr")).indexOf(row);

            switch (event.key) {
                case "Enter": // Enter moves to the next column
                case "ArrowRight": // Right arrow moves to the next column
                    event.preventDefault();
                    moveToCell(rowIndex, cellIndex + 1);
                    break;
                case "ArrowLeft": // Left arrow moves to the previous column
                    event.preventDefault();
                    moveToCell(rowIndex, cellIndex - 1);
                    break;
                case "ArrowUp": // Up arrow moves to the cell above
                    event.preventDefault();
                    moveToCell(rowIndex - 1, cellIndex);
                    break;
                case "ArrowDown": // Down arrow moves to the cell below
                    event.preventDefault();
                    moveToCell(rowIndex + 1, cellIndex);
                    break;
            }
        }
    });

    /**
     * Moves focus to the specified cell.
     * @param {number} rowIndex - The row index of the cell.
     * @param {number} cellIndex - The cell index within the row.
     */
    function moveToCell(rowIndex, cellIndex) {
        const rows = table.querySelectorAll("tbody tr");
        if (rowIndex >= 0 && rowIndex < rows.length) {
            const cells = rows[rowIndex].querySelectorAll("td");
            if (cellIndex >= 0 && cellIndex < cells.length) {
                const input = cells[cellIndex].querySelector("input");
                if (input) {
                    input.focus();
                }
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Simulasi nama pengguna
    document.getElementById("logged-in-user").textContent = `User: ${localStorage.getItem("username") || "Guest"}`;

    // Event listener untuk tombol logout
    document.getElementById("logout-button").addEventListener("click", function () {
        console.log("Tombol Logout diklik");
        const confirmation = confirm("Apakah Anda yakin ingin logout?");
        if (confirmation) {
            // Hapus status login
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            // Redirect ke halaman login
            window.location.href = "login.html";
        }
    });
});
