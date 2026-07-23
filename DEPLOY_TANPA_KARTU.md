# 🆓 DEPLOY BACKEND GRATIS TANPA KARTU KREDIT (Alternatif Render)

> Render sekarang wajib Add Card. Ini 4 alternatif yang 100% gratis tanpa kartu, bisa dari Chrome HP.

---

## REKOMENDASI #1: KOYEB.COM (Paling Mirip Render, No Card) ⭐

**Kenapa Koyeb?** Gratis 1 service Nano selamanya, deploy dari GitHub, no kartu kalau daftar pakai GitHub, region Singapore ada.

### Step dari HP:

1.  Chrome HP → **app.koyeb.com** → **Sign up with GitHub** (pakai akun GitHub kamu xymz-dev)
2.  **Create App** → **GitHub** → Pilih repo `xymz-dev/ml-skin-checker`
3.  Setting:
    - Branch: `master`
    - Builder: **Dockerfile**
    - Dockerfile location: `backend/Dockerfile`
    - Port: `8000`
    - Instance: **Free / Nano** (0.1 vCPU, 512MB)
4.  **Environment Variables** (klik Add Variable):
    ```
    DATABASE_URL = (kosongin dulu)
    REDIS_URL = (kosongin)
    REDIS_TOKEN = (kosongin)
    CORS_ORIGINS = https://mlskinchecker.netlify.app,http://localhost:3000
    PROVIDER = mock
    ```
5.  Klik **Deploy** → Tunggu 3-5 menit
6.  Dapat URL: `https://xxx-xxxx.koyeb.app`
7.  Test: `https://xxx.koyeb.app/docs` harus ada Swagger
8.  Copy URL → pakai buat frontend Netlify `NEXT_PUBLIC_API_URL`

**Koyeb Free Limits:** Sleep after 1 jam gak ada traffic, bangun lagi 10 detik. Tetap gratis selamanya no kartu.

---

## REKOMENDASI #2: HUGGING FACE SPACES (Docker Gratis Selamanya, No Card) ⭐⭐

Paling awet, gak pernah sleep kalau pakai Docker.

1.  Chrome HP → **huggingface.co** → Sign up pakai Google (no kartu)
2.  Klik avatar → **New Space**
    - Name: `ml-skin-checker-backend`
    - SDK: **Docker**
    - Template: Blank
    - Public
    - Create Space
3.  Di halaman Space baru, klik tab **Files** → **Add file** → **Upload files**
    - Upload semua file dari folder `backend/` (app/, Dockerfile, requirements.txt)
    - Atau paling gampang: **Clone dengan Git** (Space kasih git URL)
    - Di HP pakai MGit → Clone Space repo → Copy file backend ke situ → Commit & Push
4.  Hugging Face otomatis build Dockerfile → Tunggu 2-3 menit
5.  Dapat URL: `https://xymz-dev-ml-skin-checker-backend.hf.space`
6.  Test `/docs`

**Enak:** Gak perlu env var, mock mode jalan langsung. Kalau mau pakai Supabase, tambah env di Settings → Variables.

---

## REKOMENDASI #3: REPLIT.COM (Paling Gampang Buat HP, No Card)

Backend + Frontend bisa jalan bareng di satu Repl, gak perlu Netlify.

1.  Chrome HP → **replit.com** → Sign up pakai Google
2.  **Create Repl** → **Import from GitHub** → Paste `https://github.com/xymz-dev/ml-skin-checker`
3.  Replit detect → Ketik di Shell (bawah):
    ```bash
    cd backend && pip install -r requirements.txt
    ```
4.  Edit file `.replit` di root (buat kalau belum ada):
    ```
    run = "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 & cd frontend && npm install && npm run dev -- --host 0.0.0.0 --port 3000"
    ```
5.  Klik **Run** → Replit kasih 2 URL Webview
6.  Frontend Replit bisa langsung share

**Minus:** Replit free agak lemot, tapi no kartu dan bisa dari HP 100%.

---

## REKOMENDASI #4: VERCEL UNTUK FRONTEND + BACKEND SEKALIGUS (No Card)

Vercel itu kayak Netlify tapi bisa host Python juga, dan **tidak butuh kartu**.

Kita bisa deploy Next.js frontend + FastAPI backend jadi 1 project di Vercel.

1.  Chrome HP → **vercel.com** → Login GitHub
2.  **Add New Project** → Import `xymz-dev/ml-skin-checker`
3.  Setting:
    - Framework: Next.js
    - Root Directory: `frontend`
    - Env: `NEXT_PUBLIC_API_URL = /api` (nanti kita bikin proxy)
4.  Deploy → Dapat URL frontend

5.  Untuk backend, buat file `frontend/api/index.py` (Vercel serverless):
    ```python
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    app = FastAPI()
    app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
    
    @app.get("/api/health")
    def health(): return {"status": "ok"}
    # copy logic dari backend/app/main.py
    ```

Tapi cara ini butuh ngoding lagi. Koyeb/Hugging Face lebih gampang.

---

## JADI STRATEGI TANPA KARTU UNTUK KAMU:

**Frontend:** Tetap **Netlify.com** (gak butuh kartu, gratis)
**Backend:** Ganti Render ke salah satu:
- **Koyeb.com** ← REKOMENDASI, mirip Render, no kartu
- **Hugging Face Spaces** ← Paling awet, no kartu
- **Replit.com** ← Paling gampang di HP

Semua 3 di atas gak butuh kartu kredit, cukup login GitHub/Google.

---

## LANGKAH CEPAT HARI INI:

1.  Frontend tetap deploy di Netlify (cara lama, no kartu)
2.  Backend deploy di **Koyeb.com** (ikuti Rekomendasi #1 di atas)
3.  Copy URL Koyeb → Paste di Netlify env `NEXT_PUBLIC_API_URL`
4.  Redeploy Netlify → Done!

Mau aku bikinin panduan Koyeb bergambar step-by-step dari screenshot HP kamu?
