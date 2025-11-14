# 🚴 Pushbike Race Management System

Aplikasi desktop Windows untuk manajemen sistem lomba Pushbike. Aplikasi ini dibangun menggunakan Electron, Node.js, Express, dan SQLite.

## 📋 Fitur

### Admin & Panitia
- ✅ Pendaftaran Peserta (dengan upload foto)
- ✅ Validasi usia otomatis
- ✅ Pengundian Pertandingan acak berdasarkan kategori
- ✅ Penjadwalan lomba otomatis
- ✅ Monitoring Live posisi peserta
- ✅ Input hasil pertandingan
- ✅ Sistem eliminasi dan tahap berikutnya
- ✅ Manajemen admin

### Penonton & Orang Tua
- ✅ Akses hasil lomba real-time
- ✅ Lihat jadwal pertandingan
- ✅ Tampilan khusus penonton

## 🗄️ Struktur Database

### Tabel Database:
- **participants** - Data peserta lomba
- **race_draw** - Hasil pengundian
- **race_schedule** - Jadwal lomba
- **live_monitor** - Data monitoring live
- **race_results** - Hasil lomba
- **next_stage** - Tahap berikutnya
- **admins** - Data admin

## 🚀 Cara Instalasi dan Menjalankan

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- NPM atau Yarn

### Instalasi

1. Clone repository:
```bash
git clone https://github.com/syahrilz/pushbike.git
cd pushbike
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi dalam mode development:
```bash
npm start
```

### Build untuk Windows (.exe)

Untuk membuat file installer .exe:
```bash
npm run build
```

File installer akan tersedia di folder `dist/`.

Untuk membuat versi portable:
```bash
npm run build:portable
```

## 🔐 Login Default

- **Username:** admin
- **Password:** admin123

⚠️ **PENTING:** Segera ganti password default setelah instalasi pertama kali!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin

### Participants
- `POST /api/participants` - Tambah peserta
- `GET /api/participants` - Lihat semua peserta
- `GET /api/participants/:id` - Detail peserta
- `DELETE /api/participants/:id` - Hapus peserta

### Race Management
- `POST /api/race-draw` - Input hasil pengundian
- `GET /api/race-draw` - Lihat hasil pengundian
- `POST /api/race-schedule` - Input jadwal lomba
- `GET /api/race-schedule` - Lihat jadwal lomba
- `POST /api/live-monitor` - Input data live posisi
- `GET /api/live-monitor` - Lihat data live monitoring

### Results
- `POST /api/race-results` - Input hasil lomba
- `GET /api/race-results` - Lihat hasil lomba
- `POST /api/next-stage` - Input peserta ke tahap berikutnya
- `GET /api/next-stage` - Lihat peserta tahap berikutnya

### Admin Management
- `POST /api/admins` - Tambah admin
- `GET /api/admins` - Lihat semua admin

### Statistics
- `GET /api/stats` - Dashboard statistics

## 🎯 Kategori Lomba

- **U8** - Under 8 tahun
- **U10** - Under 10 tahun
- **U12** - Under 12 tahun
- **U15** - Under 15 tahun

## 📱 Cara Penggunaan

1. **Login** menggunakan akun admin
2. **Tambah Peserta** melalui menu Peserta
3. **Lakukan Pengundian** otomatis untuk menentukan urutan start
4. **Buat Jadwal** lomba untuk setiap grup
5. **Monitor Live** selama lomba berlangsung
6. **Input Hasil** setelah lomba selesai
7. **Tentukan Peserta** yang lolos ke tahap berikutnya

## 🖥️ Teknologi yang Digunakan

- **Electron** - Framework untuk membuat aplikasi desktop
- **Node.js** - Runtime environment
- **Express** - Web framework untuk API backend
- **SQLite** - Database lokal
- **HTML/CSS/JavaScript** - Frontend
- **bcryptjs** - Password encryption
- **jsonwebtoken** - Authentication
- **multer** - File upload

## 📁 Struktur Proyek

```
pushbike/
├── main.js                 # Electron main process
├── package.json           # NPM configuration
├── src/
│   ├── backend/
│   │   ├── database.js    # Database schema & initialization
│   │   └── server.js      # Express API server
│   └── frontend/
│       ├── index.html     # Main UI
│       ├── app.js         # Frontend JavaScript
│       └── styles/
│           └── main.css   # Styling
├── public/
│   └── uploads/           # Uploaded photos
└── pushbike.db           # SQLite database (created on first run)
```

## 🔒 Keamanan

- Password di-hash menggunakan bcryptjs
- JWT token untuk authentication
- SQL injection protection dengan parameterized queries

## 📝 Lisensi

MIT License

## 👥 Kontributor

Pushbike Team

## 🐛 Pelaporan Bug

Jika menemukan bug, silakan buat issue di GitHub repository.

## 💡 Saran dan Kontribusi

Kontribusi dan saran sangat diterima! Silakan buat pull request atau issue di repository ini.