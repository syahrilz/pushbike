# 📦 Panduan Instalasi Pushbike Race Management System

## Untuk Pengguna Windows (Tanpa Pengalaman Programming)

### Cara 1: Download File Installer (REKOMENDASI)

1. **Download Installer**
   - Download file installer `.exe` dari halaman Releases di GitHub
   - File akan bernama seperti: `Pushbike-Race-System-Setup-1.0.0.exe`

2. **Jalankan Installer**
   - Double-click file installer yang sudah didownload
   - Ikuti wizard instalasi
   - Pilih lokasi instalasi (default: `C:\Program Files\Pushbike Race System`)
   - Klik "Install"

3. **Jalankan Aplikasi**
   - Setelah instalasi selesai, aplikasi akan muncul di Start Menu
   - Cari "Pushbike Race System" di Start Menu dan klik untuk menjalankan
   - Atau double-click shortcut di Desktop jika membuat shortcut

4. **Login Pertama Kali**
   - Username: `admin`
   - Password: `admin123`
   - **PENTING:** Segera ganti password setelah login pertama!

### Cara 2: Build Sendiri (Untuk Developer)

#### Prasyarat
- Install Node.js dari https://nodejs.org (versi LTS)
- Install Git dari https://git-scm.com

#### Langkah-langkah:

1. **Clone Repository**
   ```bash
   git clone https://github.com/syahrilz/pushbike.git
   cd pushbike
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   Tunggu sampai semua package terinstall (bisa memakan waktu beberapa menit)

3. **Jalankan dalam Mode Development**
   ```bash
   npm start
   ```
   Aplikasi akan terbuka secara otomatis

4. **Build untuk Windows**
   ```bash
   npm run build
   ```
   Installer akan tersedia di folder `dist/`

5. **Build Versi Portable (Tanpa Instalasi)**
   ```bash
   npm run build:portable
   ```
   File portable akan tersedia di folder `dist/`

## Troubleshooting

### Masalah: Aplikasi tidak bisa dibuka
- Pastikan antivirus tidak memblokir aplikasi
- Jalankan sebagai Administrator (klik kanan > Run as administrator)

### Masalah: "Node tidak ditemukan"
- Pastikan Node.js sudah terinstall
- Restart Command Prompt/Terminal setelah instalasi Node.js

### Masalah: Error saat npm install
- Hapus folder `node_modules` dan file `package-lock.json`
- Jalankan `npm install` lagi

### Masalah: Database error
- Pastikan aplikasi memiliki permission untuk membuat file di folder aplikasi
- Hapus file `pushbike.db` dan restart aplikasi untuk membuat database baru

### Masalah: Port sudah digunakan
- Jika port 3001 sudah digunakan aplikasi lain, tutup aplikasi tersebut
- Atau edit file `main.js` untuk menggunakan port berbeda

## Kebutuhan Sistem

### Minimum:
- Windows 7 atau lebih baru
- RAM: 2GB
- Storage: 200MB free space
- Processor: Intel Core 2 Duo atau setara

### Rekomendasi:
- Windows 10 atau Windows 11
- RAM: 4GB atau lebih
- Storage: 500MB free space
- Processor: Intel Core i3 atau setara

## Backup Data

Database disimpan dalam file `pushbike.db` di folder aplikasi.
Untuk backup:
1. Tutup aplikasi
2. Copy file `pushbike.db` ke lokasi aman
3. Untuk restore, replace file `pushbike.db` dengan backup

## Update Aplikasi

1. Download installer versi terbaru
2. Jalankan installer (akan otomatis update)
3. Data tidak akan hilang saat update

## Uninstall

### Windows 10/11:
1. Buka Settings > Apps > Apps & features
2. Cari "Pushbike Race System"
3. Klik Uninstall

### Windows 7/8:
1. Buka Control Panel > Programs > Programs and Features
2. Cari "Pushbike Race System"
3. Klik Uninstall

## Support

Jika mengalami masalah, silakan:
1. Baca dokumentasi README.md
2. Cek Issues di GitHub repository
3. Buat Issue baru jika masalah belum terdokumentasi
