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
   - Input pegawai baru.
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
### 5.1. Employees (*sedang tidak dapat digunakan))
- **GET** `/employees` → Mendapatkan daftar pegawai.
- **POST** `/employees` → Menambahkan pegawai baru.
  - **Body**:
    ```json
    {
      "name": "John Doe"
    }
    ```

### 5.2. Tasks
- **GET** `/tasklists` → Mendapatkan daftar tugas.
- **POST** `/tasklists` → Menambahkan tugas baru.
  - **Body**:
    ```json
    {
        "id": 13,
        "task_description": "Task Z",
        "task_detail_id": 12,
        "employee_id": 1,
        "employee_name": "Pegawai A",
        "hourly_rate": "50.00",
        "date": "2025-03-25 01:03:59",
        "hours_spent": "5.00",
        "additional_charges": "100.00",
        "total_remuneration": "375.00"
    },
    ```

## 6. Teknologi yang Digunakan
- **Frontend:** Next.js 15, TypeScript, TailwindCSS, Redux, Axios.
- **Backend:** Laravel, PostgreSQL (Supabase).
- **State Management:** Redux Toolkit.

## 7. Catatan Tambahan
- Data pada frontend akan **otomatis diperbarui** setelah input pegawai/tugas tanpa perlu refresh manual.
- Jika ada error, periksa **console log** atau **network request** di browser.
- Pastikan backend dan database berjalan dengan benar sebelum mengakses frontend.
- untuk saat ini karena banyak perubahan, ADD masih belum bisa digunakan dari UI.
- untuk ADD bisa gunakan api http://localhost:8000/api/tasklists method POST dengan format JSON contoh:
```sh
{
    "deskripsi": "Pekerjaan X",
    "detail": [
        {
            "id_pegawai": 1,
            "jam_kerja": 5,
            "tarif_per_jam": 50,
            "biaya_tambahan": 100
        },
        {
            "id_pegawai": 2,
            "jam_kerja": 3,
            "tarif_per_jam": 60,
            "biaya_tambahan": 100
        }
    ]
}
```
- untuk EDIT masih ada error, response 200 namun tidak terupdate di database.

---
