# 🛡️ Javis Auth Challenge - Next.js 16

Sistem autentikasi modern yang dibangun sebagai bagian dari Rekrutmen **PT. Javis Teknologi Albarokah**. Projek ini mendemonstrasikan implementasi keamanan JWT, manajemen tema (Dark/Light Mode), dan integrasi database MySQL dengan Prisma ORM.

## 🚀 Fitur Utama
- **Autentikasi Dual-Method:** Login aman menggunakan alamat Email maupun Username.
- **Next.js 16 Ready:** Menggunakan fitur *Asynchronous Cookies* terbaru untuk manajemen sesi di server.
- **Tailwind CSS v4 Dark Mode:** Implementasi tema gelap/terang yang responsif dan ringan menggunakan `@custom-variant dark`.
- **Middleware Protection:** Proteksi rute Dashboard agar tidak bisa diakses tanpa token valid.
- **Full Responsive:** UI yang dioptimalkan untuk tampilan Desktop maupun Mobile.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** MySQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS v4 & Lucide Icons
- **Auth:** JSON Web Token (JWT) & `jwt-decode`

## 📸 Preview Tampilan

### Mode Desktop
| Light Mode | Dark Mode |
|---|---|
| ![Login Light](./screenshots/Ligh%20mode%20dekstop.png) | ![Login Dark](./screenshots/dark%20mode%20dekstop.png) |
| ![Dashboard Light](./screenshots/light%20dashboard%20dekstop.png) | ![Dashboard Dark](./screenshots/dark%20dashboard%20dekstop.png) |

### Mode Mobile
| Light Mode | Dark Mode |
|---|---|
| ![Mobile Light](./screenshots/ligh%20mode%20mobile.png) | ![Mobile Dark](./screenshots/dark%20mode%20mobile.png) |
| ![Dash Mobile Light](./screenshots/ligh%20dashbord%20mobile.png) | ![Dash Mobile Dark](./screenshots/dark%20dashbord%20mobile.png) |

## ⚙️ Instalasi & Persiapan

1. Clone dan Instal Dependensi:
npm install

2. Konfigurasi Environment:

- Buat file .env di root folder (Gunakan .env.example sebagai referensi):

- DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/javis_challenge"

JWT_SECRET="isi_dengan_secret_key_bebas"

3. Setup Database (Prisma): npx prisma db push

4. Jalankan Aplikasi: npm run dev

📁 Struktur Folder Utama

app/api/auth/ - API Route untuk logika Login dan Logout.

app/dashboard/ - Halaman utama setelah autentikasi (Server Component).

components/ - Komponen UI (ModeToggle, ThemeProvider, dll).

middleware.ts - Logika proteksi rute global.

screenshots/ - Dokumentasi visual aplikasi (Desktop & Mobile).

© Achmad Imam Dairobbi