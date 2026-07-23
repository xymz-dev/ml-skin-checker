# 📚 TUTORIAL LENGKAP ML SKIN CHECKER DARI NOL (Untuk Pemula)

> Ikuti berurutan, 30 menit jadi live di Netlify + Render

---

## 0️⃣ Persiapan Akun (Gratis Semua)

1. **GitHub** - github.com daftar
2. **Supabase** - supabase.com (DB PostgreSQL gratis)
3. **Upstash** - upstash.com (Redis gratis)
4. **Render** - render.com (Backend hosting gratis)
5. **Netlify** - netlify.com (Frontend hosting gratis)
6. **Tools Lokal**: Node.js 20 + Python 3.12 + Docker Desktop (opsional)

---

## 1️⃣ Download & Ekstrak Project

- File zip: `ml-skin-checker.zip` (ada di attachment workspace)
- Ekstrak: `ml-skin-checker/`
- Buka di VS Code / Cursor

```
ml-skin-checker/
├── frontend/
├── backend/
├── netlify.toml
├── render.yaml
├── docker-compose.yml
└── ...
```

---

## 2️⃣ Setup Supabase (Database)

1. Buka supabase.com → New Project
   - Name: `ml-skin-checker`
   - Region: **Singapore**
   - Password: buat yang kuat
2. Tunggu 2 menit sampai project ready
3. Kiri menu → **SQL Editor** → New Query
4. Buka file `backend/supabase_schema.sql` di VS Code → Copy ALL → Paste di SQL Editor → **RUN**
   - Harusnya success create 5 table: players, heroes, skins, player_results, history
5. Kiri menu → **Project Settings** → **Database**
   - Scroll ke **Connection String** → Tab **Transaction Pooler**
   - Pilih **Python** + **AsyncPG** → Copy URL
   - Contoh: `postgresql+asyncpg://postgres.xxxxx:xxxx@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
   - Simpan di notepad → ini jadi `DATABASE_URL`

---

## 3️⃣ Setup Upstash (Cache Redis)

1. Buka upstash.com → Create Redis
   - Name: `ml-cache`, Region: Singapore, Type: Regional
2. Scroll → **REST API** → Copy:
   - `UPSTASH_REDIS_REST_URL` → contoh `https://xxx.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN`
   - Simpan di notepad → ini jadi `REDIS_URL` & `REDIS_TOKEN`
3. Kosongkan juga bisa! Backend punya fallback memory jadi tetap jalan tanpa Redis

---

## 4️⃣ Jalan Lokal (Tanpa Docker - Paling Gampang)

### Backend:
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt

# Buat file .env
cp .env.example .env
# Edit .env isi:
DATABASE_URL=postgresql+asyncpg://... (dari Supabase)
REDIS_URL=https://...upstash.io (dari Upstash)
REDIS_TOKEN=xxxx
CORS_ORIGINS=http://localhost:3000
PROVIDER=mock

# Jalankan
uvicorn app.main:app --reload --port 8000
# Buka http://localhost:8000/docs -> harus ada Swagger
# Test http://localhost:8000/health -> status ok
```

### Frontend (terminal baru):
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
# Buka http://localhost:3000
# Cek ID 12345678 server 1234 -> harus muncul result mock
# Buat poster -> export PNG 4x harus jalan
```

### Alternatif Pakai Docker:
```bash
# di root project
cp .env.example .env
docker-compose up --build
# FE http://localhost:3000, BE http://localhost:8000/docs
```

---

## 5️⃣ Push ke GitHub

```bash
# di root ml-skin-checker
git init
git add .
git commit -m "feat: initial fullstack ml skin checker premium"

# Buat repo baru di github.com (jangan centang README)
# Copy remote URL
git remote add origin https://github.com/username/ml-skin-checker.git
git branch -M main
git push -u origin main
```

---

## 6️⃣ Deploy Backend ke Render

1. Buka render.com → New → **Blueprint**
2. Connect GitHub repo `ml-skin-checker` → Render akan baca `render.yaml` otomatis
3. Jika pakai manual:
   - New → Web Service → Connect repo → Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Plan: Free
4. **Environment Variables** di Render dashboard:
   ```
   DATABASE_URL = (paste dari Supabase)
   REDIS_URL = https://...upstash.io
   REDIS_TOKEN = xxxxx
   CORS_ORIGINS = https://mlskinchecker.netlify.app,http://localhost:3000
   PROVIDER = mock
   ```
5. Deploy → tunggu 3-5 menit
6. Copy Backend URL: `https://ml-skin-checker-backend.onrender.com`
7. Test: buka `https://xxx.onrender.com/docs` harus ada Swagger
   Test `https://xxx.onrender.com/health`

---

## 7️⃣ Deploy Frontend ke Netlify

1. Buka netlify.com → Add New Site → Import Existing Project
2. Connect GitHub repo yang sama
3. Setting:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20 (ada di netlify.toml)
4. **Environment Variables** di Netlify:
   ```
   NEXT_PUBLIC_API_URL = https://ml-skin-checker-backend.onrender.com
   ```
5. Deploy → tunggu 2-3 menit
6. Dapat URL: `https://mlskinchecker.netlify.app`
7. **Update CORS** di Render: masukkan URL Netlify kamu ke `CORS_ORIGINS` → Save → Render redeploy otomatis

---

## 8️⃣ Verifikasi Production

1. Buka frontend Netlify URL
2. Input ID: `12345678` Server: `1234` → Klik Check
3. Harus redirect ke `/player/12345678?server=1234` muncul mock data Wann Pro 387 skins
4. Klik "Buat Poster Flexing" → `/poster/12345678`
5. Coba ganti 12 template (Dark Gold, Neon Cyber, etc) → preview harus realtime ganti
6. Coba Auto slider 1-60 + drag rarity priority
7. Coba Manual checkbox
8. Klik PNG 4x → download poster HD → cek tidak pecah
9. Share WA/IG/Discord → harus tajam

---

## 9️⃣ Cara Tambah Template Baru (Theme Engine)

1. Duplikat file `frontend/components/poster/templates/DarkGold.tsx` → `MyTemplate.tsx`
2. Edit desain pakai Tailwind (ganti gradient, layout, badge)
3. Buka `frontend/components/poster/templates/index.ts`:
```ts
import MyTemplate from "./MyTemplate"
export const templateMap = {
  ...,
  "my-template": MyTemplate
}
```
4. Buka `frontend/lib/themes.ts`:
```ts
{ id: 'my-template', name: 'My Template', thumbnail: '🔥', description: 'My custom', colors: {...}, className: '...', layout: 'grid' }
```
5. Otomatis muncul di selector poster page

---

## 🔟 Maintenance & Update

- Ganti Provider ke official jika ada izin:
  1. Buat file `backend/app/providers/official_provider.py` implement `BaseProvider`
  2. Di `factory.py` return OfficialProvider jika PROVIDER=official
  3. Set env `PROVIDER=official` di Render
- Clear cache: `DELETE /api/cache` (buat endpoint) atau flush di Upstash dashboard
- Update hero list: edit `backend/supabase_schema.sql` tambah INSERT, atau `python backend/seed.py`

---

## 🆘 Troubleshooting

| Error | Solusi |
|-------|--------|
| CORS di frontend | Cek CORS_ORIGINS di Render harus include URL Netlify persis, tanpa slash akhir |
| DB connection fail | Pakai Transaction Pooler URL (port 6543) bukan direct (5432), cek password ada karakter spesial encode |
| Upstash fail | Kosongkan aja REDIS_URL/TOKEN, akan fallback memory |
| Netlify build fail | Pastikan base `frontend`, Node 20, error ESLint → `npm run lint` lokal dulu |
| Poster pecah | Pakai export PNG 4x, jangan JPG, template sudah scale:4 |

---

## 📦 File Penting Yang Harus Diisi Env

**backend/.env**
```
DATABASE_URL=postgresql+asyncpg://...
REDIS_URL=https://...
REDIS_TOKEN=...
CORS_ORIGINS=https://your-frontend.netlify.app,http://localhost:3000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🎉 Selesai!

Sekarang kamu punya:
- ✅ Full Stack Next.js 15 + FastAPI Clean Architecture
- ✅ 12 Template Poster Premium Real Component
- ✅ Supabase PostgreSQL + Upstash Redis production
- ✅ Deploy Netlify + Render live

Flexing skin ML sekarang bisa! 🚀👑

Butuh bantuan deploy? Bilang aja username GitHub + URL Supabase/Upstash, aku bisa pandu live.
