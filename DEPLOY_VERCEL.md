# 🚀 DEPLOY KE VERCEL TANPA KARTU (Rekomendasi Terbaik)

> Vercel = pembuat Next.js, jadi deploy Next.js paling cepat, gratis tanpa kartu kredit

Kamu butuh 2 project Vercel:
- **Frontend** (Next.js) → `frontend/`
- **Backend** (FastAPI Python) → `backend/`

---

## CARA 1: DEPLOY FRONTEND KE VERCEL (2 Menit - Paling Gampang)

1.  Chrome HP → **vercel.com** → **Sign Up with GitHub** (pakai akun xymz-dev)
2.  **Add New Project** → **Import Git Repository** → Pilih `xymz-dev/ml-skin-checker`
3.  Setting Project:
    - **Project Name:** `ml-skin-checker-frontend`
    - **Framework Preset:** Next.js (auto detect)
    - **Root Directory:** Klik Edit → Pilih `frontend`
    - **Build Command:** `npm run build` (default)
    - **Output Directory:** `.next` (default)
4.  **Environment Variables** (klik Add):
    ```
    NEXT_PUBLIC_API_URL = https://ml-skin-checker-backend.vercel.app
    (nanti ganti setelah backend jadi, untuk sementara isi https://ml-skin-checker-backend.vercel.app)
    ```
5.  Klik **Deploy** → Tunggu 2-3 menit → Dapat URL: `https://ml-skin-checker-frontend-xxxx.vercel.app`
6.  Bisa rename: Settings → Domains → Add custom atau ganti nama jadi `ml-skin-checker.vercel.app`

**Done! Frontend tanpa kartu sudah live.**

---

## CARA 2: DEPLOY BACKEND KE VERCEL (Python FastAPI - Tanpa Kartu)

Aku udah bikinin file khusus buat Vercel di repo kamu:
- `backend/api/index.py` → Entry point serverless
- `backend/vercel.json` → Config Vercel

Langkah:

1.  Vercel.com → **Add New Project** → **Import Git Repository** → Pilih repo yang SAMA `xymz-dev/ml-skin-checker`
    - Ini akan jadi project ke-2 (Vercel boleh 1 repo jadi banyak project)
2.  Setting:
    - **Project Name:** `ml-skin-checker-backend`
    - **Framework Preset:** Other (bukan Next.js)
    - **Root Directory:** Edit → Pilih `backend`
    - **Build Command:** (kosongin, biar Vercel auto pakai vercel.json)
3.  **Environment Variables** (Add):
    ```
    DATABASE_URL = (kosongin dulu, pakai mock)
    REDIS_URL = (kosongin)
    REDIS_TOKEN = (kosongin)
    CORS_ORIGINS = https://ml-skin-checker-frontend-xxxx.vercel.app,http://localhost:3000
    PROVIDER = mock
    ```
4.  Klik **Deploy** → Tunggu 2-4 menit (Vercel install Python + requirements.txt)
5.  Dapat URL: `https://ml-skin-checker-backend.vercel.app`
6.  Test: buka `https://xxx.vercel.app/docs` → Harus ada Swagger
    Test: `https://xxx.vercel.app/health` → `{"status":"ok"}`

---

## CARA 3: HUBUNGKAN FRONTEND + BACKEND

1.  Copy URL backend Vercel kamu (misal `https://ml-skin-checker-backend.vercel.app`)
2.  Balik ke Vercel → Buka Project **Frontend** → Settings → Environment Variables
3.  Edit `NEXT_PUBLIC_API_URL` → Isi URL backend kamu → Save
4.  Deployments → Klik **Redeploy** (titik 3 → Redeploy)
5.  Tunggu 1 menit → Frontend sekarang ngambil data dari backend Vercel

6.  Balik ke Project **Backend** → Settings → Env Vars → Update `CORS_ORIGINS` tambahin URL frontend Vercel kamu:
    ```
    https://ml-skin-checker-frontend-xxxx.vercel.app,https://ml-skin-checker.vercel.app
    ```
7.  Redeploy backend juga

---

## VERIFIKASI

1.  Buka URL Frontend Vercel kamu
2.  Input ID `12345678` Server `1234` → Check
3.  Harus muncul result Wann Pro + 387 skins (mock)
4.  Klik Buat Poster → 12 template harus realtime ganti
5.  Export PNG 4x

---

## KEUNTUNGAN VERCEL VS RENDER/NETLIFY

|  | Vercel | Render+Netlify |
|--|--------|----------------|
| Kartu Kredit | ❌ Tidak butuh | Render butuh kartu |
| Speed | ⚡ Super cepat (Edge) | Agak lambat free tier sleep |
| Next.js | ✅ Native (bikinannya) | Harus pakai plugin |
| Python FastAPI | ✅ Bisa (serverless) | ✅ Bisa |
| Free Limits | 100GB bandwidth, 6000 jam exec | 750 jam |
| Cold Start | 1-2 detik | 30-60 detik |

---

## TROUBLESHOOTING VERCEL

| Error | Solusi |
|-------|--------|
| Build failed Python | Cek `backend/requirements.txt` ada, dan `api/index.py` ada. Vercel log → lihat error |
| 404 di /docs | Cek `vercel.json` sudah ada di backend/, dan root directory = backend |
| CORS error | Update `CORS_ORIGINS` di backend Vercel env harus include URL frontend Vercel persis |
| Frontend gak connect backend | Cek `NEXT_PUBLIC_API_URL` di frontend harus URL backend Vercel, tanpa slash akhir, redeploy |

---

## JADI REKOMENDASI AKHIR TANPA KARTU:

- **Frontend:** Vercel (frontend folder) → https://ml-skin-checker.vercel.app
- **Backend:** Vercel (backend folder, Python) → https://ml-skin-checker-backend.vercel.app
- **Database (opsional):** Supabase (no kartu) + Upstash Redis (no kartu)

**2-duanya di Vercel, 1 akun, no kartu, gratis, super cepat!**

Mau aku bimbing deploy Vercel step-by-step dari screenshot HP kamu?
