# 🚀 PANDUAN SUPER LENGKAP 0 SAMPAI WEB JALAN (No Skip)

Untuk kamu yang baru pertama kali deploy. Ikuti 10 BAB berurutan, jangan loncat.

---

## BAB 0: Apa Yang Kamu Butuhin?

**Wajib Install di Laptop:**
1.  **Node.js 20** -> nodejs.org -> Download LTS -> Next next
    - Cek: buka CMD/Terminal ketik `node -v` harus keluar v20.x
2.  **Python 3.12** -> python.org -> Download -> Centang "Add to PATH"
    - Cek: `python --version` atau `python3 --version`
3.  **Git** -> git-scm.com
    - Cek: `git --version`
4.  **VS Code** -> code.visualstudio.com (buat edit kode)
5.  **Docker Desktop** (Opsional, kalau mau pakai docker-compose)

**Wajib Daftar Akun Gratis:**
- github.com
- supabase.com
- upstash.com
- render.com
- netlify.com

> Semua daftar pakai Google langsung jadi 1 klik.

---

## BAB 1: Download Project

1.  Download `ml-skin-checker.zip` yang aku kasih
2.  Klik kanan → Extract Here
3.  Buka folder hasil extract di VS Code:
    - Buka VS Code → File → Open Folder → pilih `ml-skin-checker`

---

## BAB 2: Setup Supabase (Database) - 5 Menit

1.  Buka supabase.com → Login → **New Project**
    - Name: `ml-skin-checker`
    - Database Password: bikin misal `MlChecker2026!` simpan!
    - Region: **Southeast Asia (Singapore) - paling dekat Surabaya**
    - Klik Create, tunggu 2 menit loading
2.  Masuk project → Menu kiri **SQL Editor** → **New Query**
3.  Buka file di VS Code: `backend/supabase_schema.sql`
    - Ctrl+A → Ctrl+C (copy semua)
    - Paste di Supabase SQL Editor → Klik **RUN** (pojok kanan bawah)
    - Harus keluar "Success. No rows returned"
4.  Cek Tabel: Menu kiri **Table Editor** → harus ada 5 tabel: players, heroes, skins, player_results, history
5.  Ambil DATABASE_URL:
    - Menu kiri **Project Settings** (icon gear) → **Database**
    - Scroll cari **Connection String** → Tab **URI** → Pilih **Transaction Pooler**
    - Di dropdown bawah pilih **Python** + Centang **Display with password?** → Copy URL
    - Contoh URL: `postgresql://postgres.xxxxx:MLChecker2026!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
    - Tambahin `+asyncpg` biar jadi: `postgresql+asyncpg://postgres.xxxxx:MLChecker2026!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
    - **SIMPAN DI NOTEPAD, INI PENTING**

---

## BAB 3: Setup Upstash Redis (Cache) - 2 Menit

1.  Buka upstash.com → Login → **Create Database**
    - Name: `ml-cache`, Type: Regional, Region: **Singapore (ap-southeast-1)**, Eviction: off
    - Create
2.  Masuk database → Scroll ke bawah → Tab **REST API**
    - Copy `UPSTASH_REDIS_REST_URL` → misal `https://xxx-xxx.upstash.io`
    - Copy `UPSTASH_REDIS_REST_TOKEN` → misal `AXxxx...`
    - Simpan di Notepad
3.  **Boleh skip!** Kalau skip, backend tetap jalan pakai memory cache, tapi di production disarankan pakai Upstash biar gak lemot.

---

## BAB 4: Jalanin di Laptop (LOCAL) - Wajib Test Dulu

### 4A. Backend (Terminal 1)

Buka Terminal di VS Code (Ctrl+`)

```bash
cd backend

# Buat environment isolasi Python
python -m venv venv

# Aktifin venv
# Windows:
venv\Scripts\activate
# Mac / Linux:
source venv/bin/activate

# Pasti ada tulisan (venv) di depan terminal

# Install kebutuhan
pip install -r requirements.txt

# Bikin file env
# Windows: copy .env.example .env
# Mac/Linux:
cp .env.example .env

# Edit file .env pakai VS Code, isi:
DATABASE_URL=postgresql+asyncpg://postgres.xxxxx:xxxx@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
REDIS_URL=https://xxx.upstash.io
REDIS_TOKEN=AXxxx
CORS_ORIGINS=http://localhost:3000
PROVIDER=mock
```

Jalankan:

```bash
uvicorn app.main:app --reload --port 8000
```

- Harus muncul `Uvicorn running on http://127.0.0.1:8000`
- Buka Chrome: http://localhost:8000/docs
  - Harus muncul Swagger UI keren ada endpoint POST /api/check
- Buka http://localhost:8000/health → harus `{"status":"ok"}`

**Kalau error `database connection`?** Gak papa! Karena pakai mock provider tetap jalan, cache memory fallback. Lanjut aja.

JANGAN TUTUP Terminal ini.

### 4B. Frontend (Terminal BARU, Ctrl+Shift+`)

```bash
cd frontend

# Install (agak lama 2-3 menit)
npm install

# Bikin env
# Windows: copy .env.example .env.local
# Mac/Linux:
cp .env.example .env.local

# Edit .env.local isi:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Jalanin
npm run dev
```

- Harus muncul `Ready on http://localhost:3000`
- Buka http://localhost:3000
- Muncul Landing Page premium Dark Gold
- Coba input:
  - Player ID: `12345678`
  - Server: `1234`
  - Klik Check → harus pindah ke `/player/12345678?server=1234` dan muncul data Wann Pro 387 skins
- Klik "Buat Poster Flexing" → masuk `/poster/12345678`
  - Coba ganti 12 template di kiri, harus realtime berubah
  - Klik PNG 4x → harus download poster HD

**Kalau sampai sini jalan = 70% berhasil!**

---

## BAB 5: Push ke GitHub

1.  Buka github.com → **New Repository**
    - Name: `ml-skin-checker`
    - Public
    - JANGAN centang Add README
    - Create
2.  Copy URL repo: `https://github.com/USERNAME/ml-skin-checker.git`
3.  Di VS Code Terminal root project:

```bash
cd ..
# atau cd ke folder ml-skin-checker root
git init
git add .
git commit -m "feat: ml skin checker fullstack premium"

git remote add origin https://github.com/USERNAME/ml-skin-checker.git
git branch -M main
git push -u origin main
```

- Kalau diminta login GitHub, login via browser.

---

## BAB 6: Deploy Backend ke Render (5 Menit)

1.  Buka render.com → Login → **New** → **Blueprint**
2.  Connect GitHub repo `ml-skin-checker` → Pilih repo → Connect
3.  Render otomatis baca `render.yaml` → Muncul 2 service: backend & frontend
    - Kita hanya deploy backend dulu, frontend nanti di Netlify biar lebih cepat
    - Uncheck frontend, check hanya `ml-skin-checker-backend` → Apply
4.  Atau jika manual:
    - New → Web Service → Connect repo
    - Root Directory: `backend`
    - Build Command: `pip install -r requirements.txt`
    - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5.  **Add Environment Variables** di Render Dashboard:
    ```
    DATABASE_URL = postgresql+asyncpg://... (dari Supabase BAB 2)
    REDIS_URL = https://...upstash.io
    REDIS_TOKEN = AXxx
    CORS_ORIGINS = http://localhost:3000,https://mlskinchecker.netlify.app
    PROVIDER = mock
    CACHE_TTL = 1800
    ```
6.  Klik **Create Web Service** → Tunggu Deploy 4-5 menit (Free tier agak lambat cold start)
7.  Dapat URL: `https://ml-skin-checker-backend.onrender.com`
8.  Test: buka `https://xxx.onrender.com/docs` dan `/health`

---

## BAB 7: Deploy Frontend ke Netlify (3 Menit)

1.  Buka netlify.com → **Add New Site** → **Import an existing project**
2.  Connect GitHub repo yang sama
3.  Setting:
    - Base directory: `frontend`
    - Build command: `npm run build`
    - Publish directory: `.next`
4.  **Advanced → Environment Variables:**
    ```
    NEXT_PUBLIC_API_URL = https://ml-skin-checker-backend.onrender.com
    (isi dengan URL backend Render kamu BAB 6)
    ```
5.  Deploy Site → Tunggu 2-3 menit
6.  Dapat URL: `https://mlskinchecker.netlify.app` (bisa rename di Site Settings → Domain)
7.  **PENTING:** Copy URL Netlify kamu → Balik ke Render → Environment Variables → Update `CORS_ORIGINS` tambahin URL Netlify kamu persis → Save → Render akan auto redeploy

---

## BAB 8: Verifikasi Production Live

1.  Buka URL Netlify kamu
2.  Input ID `89231234` Server `1234` → Check
3.  Result muncul → Buat Poster → Ganti template Neon Cyber, Sakura, Gacha
4.  Export PNG 4x → Upload ke WA/IG → Harus tajam tidak pecah
5.  Cek cache: refresh page, request ke-2 harus lebih cepat (cached: true di network tab)

---

## BAB 9: Kalau Error?

| Gejala | Solusi |
|--------|--------|
| Backend Render Failed Build | Cek log, biasanya lupa `requirements.txt`, coba Build Command `pip install --upgrade pip && pip install -r requirements.txt` |
| Frontend Netlify Build Failed | Cek log, biasanya Node version, pastikan di `netlify.toml` ada NODE_VERSION 20 |
| CORS Error di Console Browser | Di Render env `CORS_ORIGINS` harus include URL Netlify TANPA slash akhir, pisah koma |
| Database timeout | Ganti Supabase URL dari port 6543 ke 5432 direct: `postgresql+asyncpg://postgres:xxx@db.xxx.supabase.co:5432/postgres` |
| Redis error | Kosongin aja REDIS_URL & TOKEN di Render, biar fallback memory |
| Poster download blank | Pastikan pakai Chrome, bukan Safari, dan template sudah load image |

---

## BAB 10: Next Level

- Custom Domain: Netlify → Domain Settings → Add Custom Domain (misal mlchecker.com beli di Niagahoster)
- Analytics: Tambah Vercel Analytics atau Google Analytics di `app/layout.tsx`
- SEO: Edit `app/layout.tsx` metadata title/description
- Tambah Template: Ikuti `TUTORIAL_LENGKAP_DARI_NOL.md` BAB 9

---

## ✅ Checklist Akhir

- [ ] Supabase table 5 sudah ada
- [ ] Upstash URL & TOKEN kecopy
- [ ] Backend lokal http://localhost:8000/docs jalan
- [ ] Frontend lokal http://localhost:3000 jalan + bisa check 12345678
- [ ] GitHub repo ter-push
- [ ] Render backend live + /docs bisa dibuka
- [ ] Netlify frontend live
- [ ] CORS sudah include Netlify URL
- [ ] Test production ID 12345678/1234 jalan dan poster bisa export

Jika semua checklist centang → SELAMAT, WEB KAMU LIVE 24 JAM! 🎉

Kalau stuck di BAB mana, screenshot error-nya kirim ke aku, aku bantu debug.
