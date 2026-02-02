// Data soal dan kunci jawaban
const soalData = [
    {
        soal: "Saat pertama kali datang, Jepang menyebut dirinya sebagai...",
        pilihan: ["Saudara Muda Asia", "Saudara Tua Asia", "Penjajah Baru Asia", "Sekutu Asia", "Tamu Asia"],
        kunci: 1 // Indeks 1 = "Saudara Tua Asia"
    },
    {
        soal: "Tujuan utama Jepang menjajah Indonesia adalah untuk mengambil...",
        pilihan: ["Rempah-rempah", "Bahan baku industri dan perang seperti minyak", "Karya seni dan budaya", "Tenaga ahli Indonesia", "Ilmu pengetahuan dari Belanda"],
        kunci: 1
    },
    {
        soal: "Apa yang terjadi dengan bendera Merah Putih pada awal masa Jepang?",
        pilihan: ["Dilarang dikibarkan", "Dijadikan bendera resmi", "Diizinkan dikibarkan setiap hari", "Warnanya diubah", "Dikibarkan bersama bendera Belanda"],
        kunci: 0
    },
    {
        soal: "Kerja paksa tanpa bayaran pada masa Jepang disebut...",
        pilihan: ["Rodi", "Romusha", "Heiho", "Wajib kerja", "Tanam paksa"],
        kunci: 1
    },
    {
        soal: "Bahasa resmi yang diwajibkan Jepang di sekolah dan kantor adalah...",
        pilihan: ["Belanda dan Inggris", "Jepang dan Indonesia", "Jawa dan Melayu", "Daerah masing-masing", "Belanda dan Jepang"],
        kunci: 1
    },
    {
        soal: "Organisasi yang dibentuk Jepang dan dipimpin Soekarno-Hatta untuk mengerahkan tenaga rakyat membantu Jepang adalah...",
        pilihan: ["BPUPKI", "Putera", "Gerakan 3A", "PETA", "Seinendan"],
        kunci: 1
    },
    {
        soal: "Barisan pembantu polisi yang anggotanya para pemuda lokal disebut...",
        pilihan: ["Seinendan", "Keibodan", "Heiho", "Romusha", "Kempetai"],
        kunci: 1
    },
    {
        soal: "Kebijakan Jepang yang memaksa petani menyerahkan hasil padinya disebut sistem...",
        pilihan: ["Sewa tanah", "Wajib serah (setoran)", "Ekspor bebas", "Tanam paksa", "Iuran wajib"],
        kunci: 1
    },
    {
        soal: "Mengapa Jepang melarang penggunaan bahasa Belanda dan mewajibkan bahasa Jepang serta Indonesia?",
        pilihan: ["Karena bahasa Belanda sulit dipelajari.", "Untuk menghapus pengaruh Barat dan mengontrol pikiran rakyat.", "Karena tidak ada guru bahasa Belanda.", "Agar rakyat bisa bekerja di perusahaan Jepang.", "Untuk mempersatukan semua suku di Indonesia."],
        kunci: 1
    },
    {
        soal: "Upacara menyembah Kaisar Jepang dengan membungkuk ke arah Tokyo disebut...",
        pilihan: ["Harakiri", "Seikerei", "Sumpah Pemuda", "Meditasi", "Bakti sosial"],
        kunci: 1
    },
    {
        soal: "Pulau Jawa pada masa Jepang diperintah oleh tentara...",
        pilihan: ["Darat (Rikugun)", "Laut (Kaigun)", "Udara", "Gabungan", "Sekutu"],
        kunci: 0
    },
    {
        soal: "Polisi militer rahasia Jepang yang terkenal kejam adalah...",
        pilihan: ["Heiho", "Kempetai", "Seinendan", "Keibodan", "Tokkeitai"],
        kunci: 1
    },
    {
        soal: "Tanaman yang wajib ditanam rakyat untuk bahan pelumas mesin perang adalah...",
        pilihan: ["Teh", "Kopi", "Jarak", "Padi", "Karet"],
        kunci: 2
    },
    {
        soal: "Partai-partai politik zaman Belanda saat Jepang datang...",
        pilihan: ["Diberi kebebasan", "Dibubarkan", "Dijadikan satu partai", "Diizinkan berprotes", "Dibiarkan saja"],
        kunci: 1
    },
    {
        soal: "Janji Jepang yang paling menarik bagi rakyat Indonesia adalah...",
        pilihan: ["Gaji yang besar", "Indonesia akan dimerdekakan", "Banyak lowongan kerja", "Pendidikan gratis", "Tanah untuk petani"],
        kunci: 1
    }
];

// Variabel global
let jawabanSiswa = Array(15).fill(null);
let waktuMulai, timerInterval;
let waktuTotal = 13 * 60 + 45; // 13 menit 45 detik dalam detik
let waktuTersisa = waktuTotal;
let indeksSoalAktif = 0;
let statusJujur = true;
let logAktivitas = [];
let waktuPerSoal = Array(15).fill(0);
let waktuMulaiSoal;

// Deteksi kecurangan
let deteksiWindowBlur = 0;
let deteksiTabSwitch = 0;
let deteksiCopyPaste = 0;
let deteksiRightClick = 0;

// DOM Elements
const tampilanAwal = document.getElementById('tampilan-awal');
const tampilanUjian = document.getElementById('tampilan-ujian');
const tampilanHasil = document.getElementById('tampilan-hasil');
const formDataDiri = document.getElementById('form-data-diri');
const namaInput = document.getElementById('nama');
const kelasSelect = document.getElementById('kelas');
const mulaiUjianBtn = document.getElementById('mulai-ujian');
const timerDisplay = document.getElementById('timer');
const namaTampilan = document.getElementById('nama-tampilan');
const kelasTampilan = document.getElementById('kelas-tampilan');
const daftarSoal = document.getElementById('daftar-soal');
const btnSebelumnya = document.getElementById('sebelumnya');
const btnSelanjutnya = document.getElementById('selanjutnya');
const btnKirimJawaban = document.getElementById('kirim-jawaban');
const statusJujurElement = document.getElementById('status-jujur');
const peringatanCurang = document.getElementById('peringatan-curang');
const modalPeringatan = document.getElementById('modal-peringatan');
const pesanPeringatan = document.getElementById('pesan-peringatan');
const tutupModalBtn = document.getElementById('tutup-modal');

// Fungsi untuk mengacak array (Fisher-Yates shuffle)
function acakArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Acak soal untuk setiap siswa
const soalAcak = acakArray(soalData.map((soal, index) => ({ ...soal, indexAsli: index })));

// Update nomor soal yang terjawab
function updateSoalTerjawab() {
    const terjawab = jawabanSiswa.filter(j => j !== null).length;
    document.getElementById('terjawab').textContent = terjawab;
}

// Format waktu (detik ke menit:detik)
function formatWaktu(detik) {
    const menit = Math.floor(detik / 60);
    const sisaDetik = detik % 60;
    return `${menit.toString().padStart(2, '0')}:${sisaDetik.toString().padStart(2, '0')}`;
}

// Update timer
function updateTimer() {
    if (waktuTersisa <= 0) {
        clearInterval(timerInterval);
        selesaiUjian();
        return;
    }
    
    waktuTersisa--;
    timerDisplay.textContent = formatWaktu(waktuTersisa);
    
    // Peringatan warna merah saat waktu hampir habis
    if (waktuTersisa <= 60) {
        timerDisplay.style.color = '#dc2626';
        timerDisplay.style.animation = 'blink 1s infinite';
    }
}

// Tampilkan soal
function tampilkanSoal(indeks) {
    daftarSoal.innerHTML = '';
    indeksSoalAktif = indeks;
    
    // Update waktu soal sebelumnya
    if (waktuMulaiSoal) {
        const waktuSekarang = Date.now();
        const waktuDiSoal = Math.floor((waktuSekarang - waktuMulaiSoal) / 1000);
        waktuPerSoal[indeksSoalAktif] += waktuDiSoal;
    }
    
    // Set waktu mulai soal baru
    waktuMulaiSoal = Date.now();
    
    // Tampilkan soal
    const soal = soalAcak[indeks];
    const soalItem = document.createElement('div');
    soalItem.className = 'soal-item active';
    soalItem.id = `soal-${indeks}`;
    
    let pilihanHTML = '';
    soal.pilihan.forEach((pilihan, index) => {
        const terpilih = jawabanSiswa[indeks] === index ? 'terpilih' : '';
        pilihanHTML += `
        <div class="pilihan">
            <label class="${terpilih}">
                <input type="radio" name="soal-${indeks}" value="${index}" ${jawabanSiswa[indeks] === index ? 'checked' : ''}>
                <span class="huruf-pilihan">${String.fromCharCode(65 + index)}.</span>
                <span class="label-text">${pilihan}</span>
            </label>
        </div>
        `;
    });
    
    soalItem.innerHTML = `
        <h4>Soal ${indeks + 1}: ${soal.soal}</h4>
        ${pilihanHTML}
    `;
    
    daftarSoal.appendChild(soalItem);
    
    // Tambahkan event listener untuk pilihan
    const radioInputs = soalItem.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            jawabanSiswa[indeks] = parseInt(this.value);
            updateSoalTerjawab();
            
            // Update tampilan label terpilih
            const semuaLabel = soalItem.querySelectorAll('label');
            semuaLabel.forEach(label => label.classList.remove('terpilih'));
            this.closest('label').classList.add('terpilih');
        });
    });
    
    // Update tombol navigasi
    btnSebelumnya.disabled = indeks === 0;
    btnSelanjutnya.disabled = indeks === soalAcak.length - 1;
    
    // Update status soal di navigasi (jika ada)
    updateNavigasiSoal();
}

// Update navigasi soal
function updateNavigasiSoal() {
    // Hapus navigasi soal sebelumnya jika ada
    const navLama = document.querySelector('.nav-soal-indikator');
    if (navLama) navLama.remove();
    
    // Buat navigasi soal baru
    const navContainer = document.createElement('div');
    navContainer.className = 'nav-soal-indikator';
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'center';
    navContainer.style.flexWrap = 'wrap';
    navContainer.style.gap = '8px';
    navContainer.style.marginTop = '20px';
    navContainer.style.padding = '15px';
    navContainer.style.backgroundColor = '#f1f5f9';
    navContainer.style.borderRadius = '10px';
    
    soalAcak.forEach((soal, index) => {
        const btnSoal = document.createElement('button');
        btnSoal.textContent = index + 1;
        btnSoal.className = 'btn-nomor-soal';
        btnSoal.style.width = '40px';
        btnSoal.style.height = '40px';
        btnSoal.style.borderRadius = '50%';
        btnSoal.style.border = '2px solid #cbd5e1';
        btnSoal.style.backgroundColor = jawabanSiswa[index] !== null ? '#3b82f6' : 'white';
        btnSoal.style.color = jawabanSiswa[index] !== null ? 'white' : '#4b5563';
        btnSoal.style.fontWeight = '600';
        btnSoal.style.cursor = 'pointer';
        btnSoal.style.transition = 'all 0.2s';
        
        if (index === indeksSoalAktif) {
            btnSoal.style.borderColor = '#1e3a8a';
            btnSoal.style.transform = 'scale(1.1)';
            btnSoal.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
        }
        
        btnSoal.addEventListener('click', () => {
            tampilkanSoal(index);
        });
        
        btnSoal.addEventListener('mouseenter', () => {
            if (index !== indeksSoalAktif) {
                btnSoal.style.backgroundColor = jawabanSiswa[index] !== null ? '#2563eb' : '#e5e7eb';
            }
        });
        
        btnSoal.addEventListener('mouseleave', () => {
            if (index !== indeksSoalAktif) {
                btnSoal.style.backgroundColor = jawabanSiswa[index] !== null ? '#3b82f6' : 'white';
            }
        });
        
        navContainer.appendChild(btnSoal);
    });
    
    // Sisipkan navigasi setelah daftar soal
    daftarSoal.parentNode.insertBefore(navContainer, daftarSoal.nextSibling);
}

// Deteksi kecurangan
function setupDeteksiKecurangan() {
    // Deteksi keluar dari tab/window
    window.addEventListener('blur', () => {
        if (tampilanUjian.style.display !== 'none') {
            deteksiWindowBlur++;
            logAktivitas.push(`Keluar dari halaman ujian - ${new Date().toLocaleTimeString()}`);
            
            if (deteksiWindowBlur >= 2) {
                catatKecurangan("Siswa meninggalkan halaman ujian berkali-kali");
            } else {
                tampilkanPeringatan("PERINGATAN: Jangan keluar dari halaman ujian! Ini akan dicatat sebagai kecurangan.");
            }
        }
    });
    
    // Deteksi copy paste
    document.addEventListener('copy', (e) => {
        if (tampilanUjian.style.display !== 'none') {
            e.preventDefault();
            deteksiCopyPaste++;
            logAktivitas.push(`Mencoba menyalin teks - ${new Date().toLocaleTimeString()}`);
            catatKecurangan("Siswa mencoba menyalin (copy) teks");
        }
    });
    
    document.addEventListener('paste', (e) => {
        if (tampilanUjian.style.display !== 'none') {
            e.preventDefault();
            deteksiCopyPaste++;
            logAktivitas.push(`Mencoba menempel teks - ${new Date().toLocaleTimeString()}`);
            catatKecurangan("Siswa mencoba menempel (paste) teks");
        }
    });
    
    // Deteksi klik kanan
    document.addEventListener('contextmenu', (e) => {
        if (tampilanUjian.style.display !== 'none') {
            e.preventDefault();
            deteksiRightClick++;
            logAktivitas.push(`Klik kanan diblokir - ${new Date().toLocaleTimeString()}`);
            
            if (deteksiRightClick >= 3) {
                catatKecurangan("Siswa berulang kali mencoba klik kanan");
            }
        }
    });
    
    // Deteksi tombol F12 (Developer Tools)
    document.addEventListener('keydown', (e) => {
        if (tampilanUjian.style.display !== 'none') {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                (e.ctrlKey && e.keyCode === 85)) {
                e.preventDefault();
                logAktivitas.push(`Mencoba membuka developer tools - ${new Date().toLocaleTimeString()}`);
                catatKecurangan("Siswa mencoba membuka developer tools");
            }
        }
    });
    
    // Deteksi perubahan ukuran layar (mungkin mencoba keluar dari fullscreen)
    let resizeCount = 0;
    window.addEventListener('resize', () => {
        if (tampilanUjian.style.display !== 'none') {
            resizeCount++;
            if (resizeCount > 2) {
                logAktivitas.push(`Perubahan ukuran layar mencurigakan - ${new Date().toLocaleTimeString()}`);
            }
        }
    });
}

// Catat kecurangan
function catatKecurangan(alasan) {
    if (statusJujur) {
        statusJujur = false;
        statusJujurElement.style.display = 'none';
        peringatanCurang.style.display = 'flex';
        
        logAktivitas.push(`KECURANGAN TERDETEKSI: ${alasan} - ${new Date().toLocaleTimeString()}`);
        
        // Jika kecurangan parah, langsung kirim jawaban
        if (deteksiWindowBlur >= 3 || deteksiCopyPaste >= 2) {
            tampilkanPeringatan("KECURANGAN TERDETEKSI! Jawaban Anda akan dikirimkan sekarang.");
            setTimeout(() => {
                selesaiUjian();
            }, 3000);
        }
    }
}

// Tampilkan peringatan modal
function tampilkanPeringatan(pesan) {
    pesanPeringatan.textContent = pesan;
    modalPeringatan.style.display = 'flex';
}

// Selesaikan ujian
function selesaiUjian() {
    clearInterval(timerInterval);
    
    // Hitung waktu pengerjaan
    const waktuSelesai = Date.now();
    const waktuPengerjaanDetik = Math.floor((waktuSelesai - waktuMulai) / 1000);
    const waktuPengerjaanFormat = formatWaktu(waktuPengerjaanDetik);
    
    // Hitung nilai
    let jawabanBenar = 0;
    let detailJawaban = [];
    
    jawabanSiswa.forEach((jawaban, index) => {
        const soal = soalAcak[index];
        const benar = jawaban === soal.kunci;
        if (benar) jawabanBenar++;
        
        detailJawaban.push({
            soal: soal.soal,
            jawabanSiswa: jawaban !== null ? soal.pilihan[jawaban] : "Tidak dijawab",
            jawabanBenar: soal.pilihan[soal.kunci],
            status: jawaban === null ? "kosong" : (benar ? "benar" : "salah")
        });
    });
    
    const nilai = Math.round((jawabanBenar / soalData.length) * 100);
    
    // Tampilkan hasil
    tampilkanHasil(nilai, jawabanBenar, waktuPengerjaanFormat, detailJawaban);
    
    // Kirim ke Google Sheets (simulasi)
    kirimKeGoogleSheets(nilai, jawabanBenar, waktuPengerjaanDetik, detailJawaban);
}

// Tampilkan hasil
function tampilkanHasil(nilai, jawabanBenar, waktuPengerjaan, detailJawaban) {
    tampilanUjian.style.display = 'none';
    tampilanHasil.style.display = 'block';
    
    document.getElementById('hasil-nama').textContent = namaInput.value;
    document.getElementById('hasil-kelas').textContent = kelasSelect.value;
    document.getElementById('hasil-waktu').textContent = waktuPengerjaan;
    document.getElementById('hasil-status').textContent = statusJujur ? "Jujur" : "Curang";
    document.getElementById('hasil-tanggal').textContent = new Date().toLocaleString();
    
    document.getElementById('nilai-angka').textContent = nilai;
    document.getElementById('hasil-benar').textContent = jawabanBenar;
    document.getElementById('hasil-salah').textContent = soalData.length - jawabanBenar;
    
    // Laporan keamanan
    const laporanKeamanan = document.getElementById('laporan-keamanan');
    if (statusJujur) {
        laporanKeamanan.innerHTML = `
            <p><i class="fas fa-check-circle" style="color:#10b981"></i> Tidak terdeteksi kecurangan</p>
            <p><i class="fas fa-shield-alt" style="color:#3b82f6"></i> Siswa mengerjakan ujian dengan jujur</p>
        `;
    } else {
        laporanKeamanan.innerHTML = `
            <p><i class="fas fa-exclamation-triangle" style="color:#dc2626"></i> <strong>TERDETEKSI KECURANGAN!</strong></p>
            <p><i class="fas fa-times-circle" style="color:#dc2626"></i> Pelanggaran keamanan: ${logAktivitas.length} kali</p>
            <p><i class="fas fa-user-slash" style="color:#dc2626"></i> Status: TIDAK JUJUR</p>
        `;
    }
    
    // Tabel jawaban
    const tabelJawaban = document.getElementById('tabel-jawaban');
    let tabelHTML = `
        <table class="tabel-jawaban">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Soal</th>
                    <th>Jawaban Anda</th>
                    <th>Jawaban Benar</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    detailJawaban.forEach((detail, index) => {
        const statusClass = detail.status === "benar" ? "benar" : (detail.status === "salah" ? "salah" : "");
        const statusText = detail.status === "benar" ? "Benar" : (detail.status === "salah" ? "Salah" : "Kosong");
        
        tabelHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${detail.soal.substring(0, 50)}...</td>
                <td>${detail.jawabanSiswa.substring(0, 30)}${detail.jawabanSiswa.length > 30 ? '...' : ''}</td>
                <td>${detail.jawabanBenar.substring(0, 30)}${detail.jawabanBenar.length > 30 ? '...' : ''}</td>
                <td class="${statusClass}">${statusText}</td>
            </tr>
        `;
    });
    
    tabelHTML += `</tbody></table>`;
    tabelJawaban.innerHTML = tabelHTML;
}

function kirimKeGoogleSheets(nilai, jawabanBenar, waktuDetik, detailJawaban) {
    const data = {
        nama: namaInput.value,
        kelas: kelasSelect.value,
        nilai: nilai,
        jawabanBenar: jawabanBenar,
        waktuPengerjaan: waktuDetik,
        status: statusJujur ? "Jujur" : "Curang",
        logAktivitas: logAktivitas,
        timestamp: new Date().toISOString()
    };
    
    // Ganti URL_DEPLOY_APPS_SCRIPT dengan URL yang Anda dapatkan dari langkah 11
    const url = "https://script.google.com/macros/s/AKfycbwRFovGyPWuO6kj5KtQ-vyOskn6xYkyHSheWrrIcL0CToOtT-YPlNyTsy2Zz-in29Ld/exec";
    
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(err => {
        console.log("Error mengirim ke Google Sheets:", err);
    });
}

// Event Listeners
formDataDiri.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!namaInput.value.trim() || !kelasSelect.value) {
        tampilkanPeringatan("Harap isi nama dan pilih kelas terlebih dahulu!");
        return;
    }
    
    // Mulai ujian
    waktuMulai = Date.now();
    waktuTersisa = waktuTotal;
    
    // Tampilkan data siswa
    namaTampilan.textContent = namaInput.value;
    kelasTampilan.textContent = kelasSelect.value;
    
    // Setup deteksi kecurangan
    setupDeteksiKecurangan();
    
    // Mulai timer
    timerInterval = setInterval(updateTimer, 1000);
    
    // Tampilkan soal pertama
    tampilkanSoal(0);
    updateSoalTerjawab();
    
    // Switch tampilan
    tampilanAwal.style.display = 'none';
    tampilanUjian.style.display = 'block';
    
    // Mode fullscreen (hanya bisa diaktifkan oleh aksi pengguna)
    document.documentElement.requestFullscreen().catch(err => {
        console.log("Fullscreen error: ", err);
    });
    
    // Catat waktu mulai
    logAktivitas.push(`Ujian dimulai - ${new Date().toLocaleTimeString()}`);
});

btnSebelumnya.addEventListener('click', () => {
    if (indeksSoalAktif > 0) {
        tampilkanSoal(indeksSoalAktif - 1);
    }
});

btnSelanjutnya.addEventListener('click', () => {
    if (indeksSoalAktif < soalAcak.length - 1) {
        tampilkanSoal(indeksSoalAktif + 1);
    }
});

btnKirimJawaban.addEventListener('click', () => {
    const terjawab = jawabanSiswa.filter(j => j !== null).length;
    
    if (terjawab === 0) {
        if (!confirm("Anda belum menjawab satupun soal. Yakin ingin mengirim?")) {
            return;
        }
    } else if (terjawab < soalData.length) {
        if (!confirm(`Anda baru menjawab ${terjawab} dari ${soalData.length} soal. Yakin ingin mengirim?`)) {
            return;
        }
    }
    
    selesaiUjian();
});

tutupModalBtn.addEventListener('click', () => {
    modalPeringatan.style.display = 'none';
});

document.getElementById('tutup-hasil').addEventListener('click', () => {
    // Keluar dari fullscreen
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
    // Tampilkan pesan terima kasih
    alert("Terima kasih telah mengerjakan ulangan. Hasil telah dicatat oleh sistem.");
});

// Blokir keluar dari halaman dengan pesan peringatan
window.addEventListener('beforeunload', (e) => {
    if (tampilanUjian.style.display !== 'none') {
        e.preventDefault();
        e.returnValue = 'Jika Anda keluar dari halaman ini, jawaban Anda akan dikirimkan. Yakin ingin keluar?';
    }
});

// Inisialisasi
updateSoalTerjawab();