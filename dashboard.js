document.addEventListener("DOMContentLoaded", () => {
    const barangDataKey = "rekapBarang"; // Key untuk localStorage
    const totalBarangElement = document.getElementById("totalBarang");
    const totalBiayaElement = document.getElementById("totalBiaya");
    const hapusDataBtn = document.getElementById("hapusDataBtn");

    // Ambil data dari localStorage
    const getStoredData = () => {
        return JSON.parse(localStorage.getItem(barangDataKey)) || [];
    };

    // Hitung total barang dan biaya
    const calculateStats = () => {
        const data = getStoredData();
        const totalBarang = data.length;  // Hitung jumlah barang
        const totalBiaya = data.reduce((sum, item) => sum + parseFloat(item.biaya || 0), 0);  // Hitung total biaya

        totalBarangElement.textContent = `${totalBarang} Barang`;  // Update total barang di dashboard
        totalBiayaElement.textContent = `Rp ${totalBiaya.toLocaleString()}`;  // Update total biaya di dashboard
    };

    // Fungsi untuk menghapus semua data dari localStorage
    const hapusSemuaData = () => {
        localStorage.removeItem(barangDataKey); // Hapus data dari localStorage
        calculateStats(); // Perbarui statistik setelah data dihapus
    };

    // Event listener untuk tombol hapus
    hapusDataBtn.addEventListener("click", () => {
        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus semua data?");
        if (confirmDelete) {
            hapusSemuaData(); // Hapus semua data jika konfirmasi
        }
    });

    // Render statistik saat halaman pertama kali dimuat
    calculateStats();
});
