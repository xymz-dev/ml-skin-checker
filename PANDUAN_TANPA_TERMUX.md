# 📱 JALANIN WEB TANPA TERMUX (Cuma Pakai Chrome HP)

> Termux itu buat yang mau ngoding di HP. Kalau cuma mau WEB JALAN, gak perlu Termux sama sekali!

Ada 3 cara paling gampang tanpa install apapun di HP:

---

## CARA 1: LANGSUNG DEPLOY ONLINE (Paling Gampang - Cuma Chrome HP) - 10 Menit Jadi Link

**Ini cara No-Termux, No-Laptop, No-Install. Cuma butuh Chrome HP.**

### Step 1: Upload Project ke GitHub Lewat Chrome HP

1.  Buka Chrome HP → github.com → Login
2.  **New Repository** → Name `ml-skin-checker` → Public → Create
3.  Di halaman repo baru, klik **uploading an existing file** (atau Add file → Upload files)
4.  Buka File Manager HP → Cari `ml-skin-checker-FINAL.zip` → Extract dulu jadi folder
5.  Di GitHub upload, **drag semua file & folder** dari dalam `ml-skin-checker/` (frontend, backend, netlify.toml, render.yaml, dll)
    - Tips: Di Chrome HP gak bisa drag folder banyak? Pakai trik: di File Manager HP, compress per folder jadi zip kecil, upload satu-satu, atau pakai aplikasi **MGit** (Git untuk Android) lebih gampang
6.  Commit langsung → Repo jadi ada kodenya

**Alternatif Lebih Gampang (Pakai MGit App):**

1.  Install **MGit** dari Play Store
2.  Buka MGit → Clone → `https://github.com/USERNAME/ml-skin-checker.git`
3.  Copy file project ke folder clone via File Manager
4.  Di MGit → Commit & Push

### Step 2: Deploy Backend ke Render (Via Chrome HP)

1.  Buka Chrome HP → render.com → Login pakai GitHub
2.  **New** → **Blueprint** → Connect repo `ml-skin-checker` → Pilih repo
3.  Render baca `render.yaml` otomatis → Uncheck Frontend, centang hanya Backend → Apply
4.  Isi Env Vars (di dashboard Render):
    ```
    DATABASE_URL = (kosongin dulu pakai mock)
    REDIS_URL = (kosongin dulu)
    REDIS_TOKEN = (kosongin dulu)
    CORS_ORIGINS = https://mlskinchecker.netlify.app,http://localhost:3000
    PROVIDER = mock
    ```
5.  Deploy → Tunggu 5 menit → Dapat URL: `https://ml-skin-checker-backend.onrender.com`
6.  Buka URL + `/docs` harus ada Swagger

### Step 3: Deploy Frontend ke Netlify (Via Chrome HP)

1.  Buka netlify.com → Login pakai GitHub
2.  **Add New Site** → **Import an existing project** → Pilih GitHub repo
3.  Setting:
    - Base directory: `frontend`
    - Build: `npm run build`
    - Publish: `.next`
4.  **Env Vars:**
    ```
    NEXT_PUBLIC_API_URL = https://ml-skin-checker-backend.onrender.com
    (isi URL backend Render kamu)
    ```
5.  Deploy → Tunggu 3 menit → Dapat URL: `https://xxx.netlify.app`
6.  Balik ke Render → Update `CORS_ORIGINS` tambah URL Netlify kamu → Save
7.  Buka URL Netlify → Web kamu LIVE! Test ID 12345678/1234

**Selesai! Tanpa Termux, tanpa Node, tanpa Python, cuma Chrome HP.**

---

## CARA 2: JALANIN DEV ONLINE (Replit / StackBlitz) - Tanpa Install, Langsung Koding di Browser

Kalau mau ngoding + lihat hasil langsung tanpa deploy:

### Opsi A: Replit.com (Support Python + Node sekaligus)

1.  Buka replit.com → Sign up pakai Google
2.  **Create Repl** → Import from GitHub → Paste URL repo kamu `https://github.com/USERNAME/ml-skin-checker`
3.  Replit otomatis detect → Pilih **Run** → Edit `replit.nix` atau `.replit`:
    ```
    run = "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload & cd frontend && npm install && npm run dev -- --host 0.0.0.0 --port 3000"
    ```
4.  Klik Run → Frontend akan ada di Webview Replit

### Opsi B: StackBlitz.com (Frontend doang, paling cepat)

1.  Buka stackblitz.com → Sign in GitHub → **Import GitHub Repo**
2.  Pilih repo → Otomatis install & run Next.js
3.  Edit `NEXT_PUBLIC_API_URL` di env → Gunakan backend dari Render (Cara 1) atau mock

### Opsi C: GitHub Codespaces (VS Code di Browser, Gratis)

1.  Buka GitHub repo kamu di Chrome HP
2.  Klik tombol **Code** (hijau) → Tab **Codespaces** → **Create codespace**
3.  Akan buka VS Code di browser → Terminal ada di bawah
4.  Ketik:
    ```bash
    cd backend && pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
    cd frontend && npm install && npm run dev -- --host 0.0.0.0 --port 3000
    ```
5.  Port 3000 & 8000 akan auto forward → Klik link di tab **PORTS**

---

## CARA 3: Pakai HP Android Tanpa Termux Tapi Ada App Lain

- **Acode + Acode Terminal Plugin** (dari Play Store) → bisa run Node.js terbatas
- **Spck Code Editor** → Editor + Terminal + Git, bisa run Next.js tapi agak berat
- **Dcoder** → Online compiler Python & JS

Tapi **tidak disarankan**, karena lebih ribet dari Cara 1 & 2 yang pure browser.

---

## PERBANDINGAN

| Cara | Perlu Termux? | Perlu Install? | Hasil | Cocok Untuk |
|------|---------------|----------------|-------|-------------|
| **Cara 1 Deploy Online** | ❌ Tidak | ❌ Cuma Chrome | Web live link bisa dishare ke teman | Mau flexing web live |
| **Cara 2 Replit/StackBlitz** | ❌ Tidak | ❌ Cuma Browser | Bisa edit kode + preview langsung | Mau ngoding di HP tanpa install |
| **Cara 3 Termux** | ✅ Ya | ✅ Node, Python, Git | Jalan lokal 100% kontrol | Mau full dev di HP offline |

---

## REKOMENDASI AKU UNTUK KAMU

Karena kamu di HP:

1.  **Kalau mau cepat jadi link web live buat dishare:** Pakai **CARA 1** (Upload GitHub via Chrome + Render + Netlify) → 10 menit jadi, tanpa Termux
2.  **Kalau mau ngoding ubah template poster:** Pakai **CARA 2** Replit atau GitHub Codespaces → buka VS Code di browser HP
3.  **Kalau mau offline full di HP:** Baru pakai **Termux** (panduan sebelumnya)

**Jadi JAWABAN:** Ya, bisa banget tanpa Termux, malah lebih gampang!

Mau aku bimbing Cara 1 (deploy langsung dari Chrome HP) step-by-step sekarang? Bilang aja username GitHub kamu.
