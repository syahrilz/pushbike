# 🚀 Quick Start Guide

## Untuk Pengguna (Non-Developer)

### Option 1: Download Installer (RECOMMENDED)
1. Download file `.exe` dari halaman Releases
2. Double-click untuk install
3. Jalankan aplikasi dari Start Menu
4. Login dengan:
   - Username: `admin`
   - Password: `admin123`

### Option 2: Portable Version
1. Download versi portable dari Releases
2. Extract file ZIP
3. Double-click `Pushbike Race System.exe`
4. Login dengan credential di atas

---

## Untuk Developer

### Prerequisites
- Node.js v16+ (Download: https://nodejs.org)
- Git (Download: https://git-scm.com)

### Development Setup

```bash
# 1. Clone repository
git clone https://github.com/syahrilz/pushbike.git
cd pushbike

# 2. Install dependencies
npm install

# 3. Run application
npm start
```

### Build untuk Windows

```bash
# Build installer (.exe)
npm run build

# Build portable version
npm run build:portable

# Output di folder: dist/
```

---

## First Time Setup

1. **Login**
   - Username: `admin`
   - Password: `admin123`

2. **Ganti Password**
   - Menu Admin > Tambah Admin
   - Buat admin baru dengan password kuat
   - Hapus atau disable admin default

3. **Tambah Peserta**
   - Menu Peserta > Tambah Peserta
   - Isi semua data required
   - Upload foto (optional)

4. **Lakukan Pengundian**
   - Menu Pengundian > Undian Otomatis
   - Sistem akan mengacak peserta

5. **Buat Jadwal**
   - Menu Jadwal > Tambah Jadwal
   - Atur waktu dan trek

6. **Ready untuk Lomba!** 🎉

---

## Struktur Aplikasi

```
Pushbike/
├── main.js              # Electron entry point
├── package.json         # Dependencies & build config
├── src/
│   ├── backend/         # API Server
│   │   ├── database.js  # SQLite schema
│   │   └── server.js    # Express API
│   └── frontend/        # User Interface
│       ├── index.html   # Main HTML
│       ├── app.js       # JavaScript logic
│       └── styles/      # CSS styling
├── public/
│   └── uploads/         # Photos peserta
└── pushbike.db         # SQLite database
```

---

## Teknologi Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Desktop**: Electron
- **Security**: JWT, bcryptjs

---

## Port yang Digunakan

- Backend API: `http://localhost:3001`
- Frontend: Embedded in Electron window

---

## Database Tables

1. `participants` - Data peserta
2. `race_draw` - Hasil undian
3. `race_schedule` - Jadwal lomba
4. `live_monitor` - Monitoring live
5. `race_results` - Hasil lomba
6. `next_stage` - Tahap berikutnya
7. `admins` - Data admin

---

## Common Commands

```bash
# Development
npm start                 # Run app

# Build
npm run build            # Windows installer
npm run build:portable   # Portable version

# Maintenance
npm install              # Install/update dependencies
```

---

## Backup & Restore

### Backup Database
1. Tutup aplikasi
2. Copy file `pushbike.db`
3. Simpan di tempat aman

### Restore Database
1. Tutup aplikasi
2. Replace `pushbike.db` dengan backup
3. Restart aplikasi

---

## Support & Help

- 📖 Full Documentation: [README.md](README.md)
- 💻 Installation Guide: [INSTALL.md](INSTALL.md)
- 📘 User Guide: [USER_GUIDE.md](USER_GUIDE.md)
- 🐛 Report Issues: [GitHub Issues](https://github.com/syahrilz/pushbike/issues)

---

## Security Notes

⚠️ **IMPORTANT:**
- Change default password immediately
- Use strong passwords
- Backup data regularly
- Don't share admin credentials

---

**Happy Racing! 🚴‍♂️🏆**
