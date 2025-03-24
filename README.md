# Dokumentasi Proyek

## 1. Pendahuluan
Proyek ini adalah aplikasi manajemen tugas pegawai yang dibangun menggunakan **Next.js 15**, **TypeScript**, **TailwindCSS**, **Redux**, dan **Axios** pada frontend, serta **Laravel** sebagai backend dengan **PostgreSQL dari Supabase.com** sebagai database.

## 2. Arsitektur Aplikasi
Aplikasi ini memiliki arsitektur **client-server** dengan pembagian sebagai berikut:
- **Frontend (Next.js 15, TypeScript, Redux)**: Bertanggung jawab atas tampilan dan interaksi pengguna.
- **Backend (Laravel, PostgreSQL)**: Bertanggung jawab atas pengelolaan data dan API.
- **Database (Supabase - PostgreSQL)**: Menyimpan data pegawai dan tugas.

## 3. Desain Aplikasi
Aplikasi ini dirancang dengan fokus pada **kemudahan penggunaan** dan **UI yang sederhana**. Terdapat dua fitur utama:
1. **Manajemen Pegawai**:
   - Input pegawai baru (hanya nama).
   - Menampilkan daftar pegawai.
2. **Manajemen Tugas**:
   - Input tugas untuk pegawai.
   - Menampilkan daftar tugas dalam format tabel.
   - Dropdown pemilihan pegawai berdasarkan nama.

## 4. Cara Setup Aplikasi
### 4.1. Persiapan
Pastikan sudah menginstal:
- **Node.js** (disarankan versi terbaru)
- **npm** atau **yarn**
- **Laravel** (untuk backend)
- **PostgreSQL** (menggunakan supabase jadi tidak perlu install)

### 4.2. Clone Repository
```sh
  git clone <repository-url>
  cd <repository-folder>
```

### 4.3. Setup Frontend (Next.js 15)
1. Change Directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Buat file `.env` dan isi dengan konfigurasi API backend:
    ```sh
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
    ```
4. Jalankan aplikasi frontend:
    ```sh
    npm run dev
    ```

### 4.4. Setup Backend (Laravel)
```sh
  cd backend
  composer install
  cp .env.example .env
  php artisan key:generate
```
Konfigurasi **database** di `.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres.clraefwsclirudhfwjcj
DB_PASSWORD=1sampai8
```
Lalu jalankan migrasi:
```sh
  php artisan migrate
  php artisan serve
```

### 4.5. Menjalankan Aplikasi
Pastikan backend berjalan, lalu jalankan frontend dengan:
```sh
  npm run dev  # atau yarn dev
```
Akses aplikasi di **http://localhost:3000**.

## 5. API Endpoint
```sh
http://localhost:8000/api
```
### 5.1. Employees
- **GET** `/employees` → Mendapatkan daftar pegawai.
- **POST** `/employees` → Menambahkan pegawai baru.
  - **Body**:
    ```json
    {
      "name": "John Doe"
    }
    ```

### 5.2. Tasks
- **GET** `/tasks` → Mendapatkan daftar tugas.
- **POST** `/tasks` → Menambahkan tugas baru.
  - **Body**:
    ```json
    {
      "employee_id": 1,
      "description": "Writing Documents",
      "hours_spent": 5,
      "hourly_rate": 100000,
      "additional_charges": 50000
    }
    ```

## 6. Teknologi yang Digunakan
- **Frontend:** Next.js 15, TypeScript, TailwindCSS, Redux, Axios.
- **Backend:** Laravel, PostgreSQL (Supabase).
- **State Management:** Redux Toolkit.

## 7. Catatan Tambahan
- Data pada frontend akan **otomatis diperbarui** setelah input pegawai/tugas tanpa perlu refresh manual.
- Jika ada error, periksa **console log** atau **network request** di browser.
- Pastikan backend dan database berjalan dengan benar sebelum mengakses frontend.

---
