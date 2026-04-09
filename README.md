# mealapp

Aplikasi web untuk menjelajahi ribuan resep masakan berdasarkan bahan (ingredient) yang tersedia. Dibangun menggunakan **Next.js**, **React**, dan **TypeScript**, serta mengambil data dari
**TheMealDB API** secara real-time.

---

## Fitur Utama

- **Halaman Utama** - Menampilkan featured ingredients pilihan sebagai titik awal eksplorasi.
- **Daftar Ingredients** - Browse semua bahan masakan yang tersedia.
- **Meals by Ingredient** - Temukan resep-resep yang menggunakan bahan tertentu.
- **Detail Resep** - Lihat instruksi memasak lengkap, daftar bahan & takaran, serta video tutorial YouTube.

---

## Tech Stack

| Teknologi     | Versi  |
| ------------- | ------ |
| Next.js       | 16.2.2 |
| React         | 19     |
| TypeScript    | 5      |
| Tailwind CSS  | 4      |
| TheMealDB API | v1     |

---

## Prasyarat

Pastikan sudah terinstal di komputer:

- **Node.js** versi **18** atau lebih baru — https://nodejs.org/
- **npm** (sudah termasuk dengan Node.js), atau **yarn** / **pnpm**

---

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone <url-repository>
cd cmlabs

2. Install Dependencies

npm install

3. Konfigurasi Environment Variable

Buat file .env di root project:

NEXT_PUBLIC_API_BASE_URL=https://www.themealdb.com/api/json/v1/1

File .env sudah tersedia di repository. Jika belum ada, buat manual sesuai contoh di atas.

4. Jalankan Development Server

npm run dev

Buka browser dan akses: http://localhost:3000 (http://localhost:3000)

```

## DEMO

```bash
https://dev-meal-app.vercel.app/
```
