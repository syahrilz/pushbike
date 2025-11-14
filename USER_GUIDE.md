# 📘 Panduan Pengguna Pushbike Race Management System

## Daftar Isi
1. [Login](#login)
2. [Dashboard](#dashboard)
3. [Mengelola Peserta](#mengelola-peserta)
4. [Pengundian Pertandingan](#pengundian-pertandingan)
5. [Penjadwalan Lomba](#penjadwalan-lomba)
6. [Monitoring Live](#monitoring-live)
7. [Hasil Pertandingan](#hasil-pertandingan)
8. [Tahap Berikutnya](#tahap-berikutnya)
9. [Manajemen Admin](#manajemen-admin)
10. [Tampilan Penonton](#tampilan-penonton)

---

## Login

### Langkah-langkah:
1. Buka aplikasi Pushbike Race System
2. Masukkan username dan password admin
3. Klik tombol "Login"

**Login Default:**
- Username: `admin`
- Password: `admin123`

⚠️ **PENTING:** Segera ganti password default setelah login pertama!

---

## Dashboard

Dashboard menampilkan statistik utama:
- **Total Peserta** - Jumlah peserta terdaftar
- **Jadwal Lomba** - Jumlah jadwal yang sudah dibuat
- **Hasil Lomba** - Jumlah hasil yang sudah diinput

---

## Mengelola Peserta

### Menambah Peserta Baru

1. Klik menu **"Peserta"** di sidebar
2. Klik tombol **"Tambah Peserta"**
3. Isi formulir:
   - **Nama Lengkap**: Nama lengkap peserta
   - **Tanggal Lahir**: Pilih tanggal lahir (untuk validasi usia)
   - **Kategori**: Pilih kategori (U8, U10, U12, U15)
   - **Nama Orang Tua**: Nama orang tua/wali
   - **Kontak**: Nomor telepon/WA
   - **Foto**: Upload foto peserta (opsional)
4. Klik **"Simpan"**

### Melihat Daftar Peserta

- Semua peserta akan ditampilkan dalam tabel
- Informasi yang ditampilkan: ID, Nama, Tanggal Lahir, Kategori, Orang Tua, Kontak

### Menghapus Peserta

1. Cari peserta yang ingin dihapus
2. Klik tombol **"Hapus"** di kolom Aksi
3. Konfirmasi penghapusan

---

## Pengundian Pertandingan

### Melakukan Pengundian Otomatis

1. Klik menu **"Pengundian"** di sidebar
2. Pastikan sudah ada peserta terdaftar
3. Klik tombol **"Undian Otomatis"**
4. Sistem akan:
   - Mengelompokkan peserta berdasarkan kategori
   - Mengacak urutan dalam setiap kategori
   - Membagi ke dalam grup (4 peserta per grup)
   - Menentukan urutan start

### Hasil Pengundian

Tabel akan menampilkan:
- **Grup**: Nama grup (contoh: U8-Group1)
- **Urutan**: Urutan start dalam grup
- **Nama Peserta**: Nama peserta
- **Kategori**: Kategori peserta

---

## Penjadwalan Lomba

### Membuat Jadwal Baru

1. Klik menu **"Jadwal"** di sidebar
2. Klik tombol **"Tambah Jadwal"**
3. Isi formulir:
   - **Nama Grup**: Nama grup yang akan bertanding (contoh: U8-Group1)
   - **Kategori**: Kategori lomba
   - **Waktu Mulai**: Tanggal dan waktu mulai lomba
   - **Waktu Selesai**: Perkiraan waktu selesai (opsional)
   - **Nomor Trek**: Nomor trek yang digunakan
4. Klik **"Simpan"**

### Melihat Jadwal

Jadwal akan ditampilkan dalam tabel terurut berdasarkan waktu mulai.

---

## Monitoring Live

### Input Data Live

1. Klik menu **"Monitor Live"** di sidebar
2. Klik tombol **"Input Data Live"**
3. Isi formulir:
   - **Peserta**: Pilih peserta dari dropdown
   - **Posisi**: Posisi peserta saat ini (1, 2, 3, dst)
   - **Waktu Lap**: Waktu lap dalam format mm:ss.ms (contoh: 01:23.45)
4. Klik **"Simpan"**

### Refresh Data

- Klik tombol **"Refresh"** untuk melihat data terbaru
- Data akan menampilkan posisi terkini semua peserta

---

## Hasil Pertandingan

### Input Hasil Lomba

1. Klik menu **"Hasil Lomba"** di sidebar
2. Klik tombol **"Input Hasil"**
3. Isi formulir:
   - **Peserta**: Pilih peserta
   - **Kategori**: Pilih kategori
   - **Waktu Finish**: Waktu finish dalam format mm:ss.ms
   - **Ranking**: Peringkat peserta (1, 2, 3, dst)
4. Klik **"Simpan"**

### Filter Hasil

- Gunakan dropdown **"Filter Kategori"** untuk melihat hasil berdasarkan kategori tertentu
- Pilih "Semua Kategori" untuk melihat semua hasil

### Melihat Hasil

Hasil ditampilkan dalam tabel dengan urutan ranking.

---

## Tahap Berikutnya

### Menambah Peserta ke Tahap Berikutnya

1. Klik menu **"Tahap Berikutnya"** di sidebar
2. Klik tombol **"Tambah ke Tahap Berikutnya"**
3. Isi formulir:
   - **Peserta**: Pilih peserta
   - **Tahap**: Pilih tahap (Semifinal, Final, Grand Final)
   - **Status**: Pilih status:
     - **Qualified**: Lolos ke tahap berikutnya
     - **Pending**: Menunggu konfirmasi
     - **Eliminated**: Tersingkir
4. Klik **"Simpan"**

### Melihat Daftar Tahap Berikutnya

Tabel menampilkan peserta yang lolos beserta tahap dan statusnya.

---

## Manajemen Admin

### Menambah Admin Baru

1. Klik menu **"Admin"** di sidebar
2. Klik tombol **"Tambah Admin"**
3. Isi formulir:
   - **Username**: Username admin baru
   - **Password**: Password admin baru
4. Klik **"Simpan"**

⚠️ **Tips Keamanan:**
- Gunakan password yang kuat
- Jangan gunakan password yang mudah ditebak
- Catat username dan password dengan aman

### Melihat Daftar Admin

Tabel menampilkan semua admin yang terdaftar beserta tanggal pembuatan.

---

## Tampilan Penonton

Menu ini menampilkan informasi yang bisa dilihat oleh penonton dan orang tua:

### Hasil Lomba Terbaru
- Menampilkan 10 hasil lomba terbaru
- Informasi: Ranking, Nama, Kategori, Waktu

### Jadwal Lomba
- Menampilkan jadwal lomba yang akan datang
- Informasi: Grup, Kategori, Waktu Mulai

### Refresh Data

Klik tombol **"Refresh"** untuk memperbarui data tampilan penonton.

---

## Tips Penggunaan

### Workflow Standar

1. **Persiapan**
   - Tambahkan semua peserta
   - Lakukan pengundian otomatis
   - Buat jadwal lomba

2. **Hari Lomba**
   - Gunakan Monitor Live untuk tracking real-time
   - Input hasil setelah setiap race selesai

3. **Pasca Lomba**
   - Tentukan peserta yang lolos ke tahap berikutnya
   - Generate jadwal untuk tahap berikutnya

### Best Practices

1. **Backup Data Reguler**
   - Backup file `pushbike.db` secara berkala
   - Simpan backup di tempat yang aman

2. **Input Data Segera**
   - Input hasil lomba segera setelah race selesai
   - Update monitoring live secara real-time

3. **Verifikasi Data**
   - Cek kembali data sebelum menyimpan
   - Pastikan ranking dan waktu sudah benar

4. **Keamanan**
   - Ganti password default
   - Jangan share password admin
   - Logout setelah selesai menggunakan

---

## Troubleshooting

### Tidak bisa login
- Pastikan username dan password benar
- Cek capslock
- Gunakan password default jika lupa

### Data tidak muncul
- Klik refresh/reload halaman
- Pastikan koneksi database normal

### Error saat input data
- Pastikan semua field required terisi
- Cek format data (tanggal, waktu, dsb)
- Pastikan peserta sudah terdaftar

### Upload foto gagal
- Pastikan ukuran file tidak terlalu besar (max 5MB)
- Gunakan format gambar (JPG, PNG)
- Pastikan ada space di storage

---

## Keyboard Shortcuts

- **Ctrl + S** - Save form (jika ada form aktif)
- **Esc** - Cancel/Close form
- **F5** - Refresh halaman

---

## Dukungan

Jika mengalami kesulitan:
1. Baca panduan ini dengan teliti
2. Cek dokumentasi README.md
3. Hubungi administrator sistem
4. Buat issue di GitHub repository

---

**Selamat menggunakan Pushbike Race Management System! 🚴**