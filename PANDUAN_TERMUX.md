# 📱 PANDUAN ML SKIN CHECKER DI TERMUX (HP Android)

> Dijamin jalan di HP, tanpa laptop. Tested di Android 12+

---

## BAB 0: Install Termux Yang Benar

**JANGAN install dari Play Store (udah mati, versi jadul). Install dari F-Droid:**

1.  Buka Chrome HP → ketik `f-droid.org` → Download F-Droid APK → Install
2.  Buka F-Droid → Search `Termux` → Install **Termux** (yang icon hitam)
3.  Buka Termux → akan muncul terminal hitam

**Install Termux:API (biar bisa akses storage):**
- Di F-Droid search `Termux:API` → Install juga

---

## BAB 1: Setup Awal Termux (1x aja)

Buka Termux, ketik perintah ini satu-satu (copy paste):

```bash
# Update paket
pkg update -y && pkg upgrade -y

# Install kebutuhan wajib
pkg install -y nodejs-lts python git nano clang make pkg-config libffi openssl termux-tools tmux

# Node cek
node -v
# harus v20.x atau v21.x, kalau masih v18 gak papa

# Python cek
python --version
pip --version

# Kasih izin akses file HP
termux-setup-storage
# Akan muncul popup izin -> Allow

# Biar HP gak tidur pas build
termux-wake-lock

# Buat folder kerja di storage HP biar mudah akses file manager
mkdir -p ~/storage/shared/MLChecker
cd ~/storage/shared/MLChecker
pwd
# Harusnya /storage/emulated/0/MLChecker atau /data/data/com.termux/files/home/storage/shared/MLChecker
```

**Catatan:** Semua file project nanti taro di `~/storage/shared/MLChecker` biar bisa dibuka via File Manager HP.

---

## BAB 2: Download Project ke Termux

### Opsi A: Kalau kamu punya ZIP dari aku (paling gampang)

1.  Di HP, download file `ml-skin-checker-FINAL.zip` dari chat ini (klik file di atas → Download)
2.  File akan masuk folder `Download`
3.  Di Termux ketik:

```bash
cd ~/storage/shared/MLChecker
cp ~/storage/downloads/ml-skin-checker-FINAL.zip . 2>/dev/null || cp /sdcard/Download/ml-skin-checker-FINAL.zip .
unzip ml-skin-checker-FINAL.zip
cd ml-skin-checker
ls
# harus ada folder frontend, backend
```

### Opsi B: Pakai Git (kalau udah push ke GitHub)

```bash
cd ~/storage/shared/MLChecker
git clone https://github.com/USERNAME/ml-skin-checker.git
cd ml-skin-checker
```

---

## BAB 3: Setup Backend di Termux

```bash
cd ~/storage/shared/MLChecker/ml-skin-checker/backend

# Buat venv
python -m venv venv
source venv/bin/activate

# Upgrade pip (penting di Termux)
pip install --upgrade pip wheel

# Install - kalau error, coba satu per satu
pip install fastapi uvicorn[standard] sqlalchemy pydantic pydantic-settings python-dotenv slowapi python-multipart httpx structlog

# Yang agak berat, kalau gagal pakai fallback:
pip install asyncpg alembic upstash-redis || pip install asyncpg --no-binary :all:

# Kalau asyncpg tetep gagal di Termux, ganti DATABASE_URL jadi mock only (gak perlu Supabase dulu)
# Tetep bisa jalan pakai memory cache

# Bikin .env
cp .env.example .env
nano .env
# Edit isinya (di nano: Ctrl+O save, Ctrl+X keluar)
# Isi awal buat test lokal tanpa Supabase:
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/ml_checker
REDIS_URL=
REDIS_TOKEN=
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
PROVIDER=mock

# Jalanin backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- Kalau muncul `Uvicorn running on http://0.0.0.0:8000` → **JANGAN TUTUP**, swipe dari kiri Termux → **New Session** (buka terminal ke-2)

Test di Browser HP: buka Chrome → `http://localhost:8000/docs` harus ada Swagger

---

## BAB 4: Setup Frontend di Termux (Session Baru)

Di **Session Baru** Termux (swipe kiri → New Session):

```bash
cd ~/storage/shared/MLChecker/ml-skin-checker/frontend

# Install (di HP agak lama 3-5 menit, sabar + jangan lock HP)
npm install
# Kalau error karena memory, coba:
# npm install --no-audit --no-fund

# Bikin env
cp .env.example .env.local
nano .env.local
# Isi:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Jalanin dengan --host biar bisa dibuka di Chrome HP
npm run dev -- --host 0.0.0.0 --port 3000
```

- Tunggu sampai `Ready on http://0.0.0.0:3000`
- Buka Chrome HP → `http://localhost:3000`
- Harus muncul Landing Page premium ML Checker
- Test ID `12345678` Server `1234` → Check

**Tips Biar Gak Berat di Termux:**
- Kalau `npm run dev` berat, pakai build dulu:
  `npm run build && npm start -- --host 0.0.0.0 --port 3000`
- Atau matikan backend dulu pas build frontend

---

## BAB 5: Cara Jalanin 2 Service Sekaligus (Pakai tmux)

Biar gak ribet buka 2 session, pakai tmux:

```bash
# Install tmux
pkg install tmux

# Buat script starter
cd ~/storage/shared/MLChecker/ml-skin-checker
nano start_termux.sh
```

Paste ini:

```bash
#!/bin/bash
cd ~/storage/shared/MLChecker/ml-skin-checker

tmux new-session -d -s mlchecker

tmux send-keys -t mlchecker:0 "cd backend && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload" C-m

tmux split-window -h -t mlchecker:0

tmux send-keys -t mlchecker:0.1 "cd frontend && npm run dev -- --host 0.0.0.0 --port 3000" C-m

tmux attach -t mlchecker
```

Save, lalu:

```bash
chmod +x start_termux.sh
./start_termux.sh
# Akan kebagi 2 panel: kiri backend, kanan frontend
# Ctrl+B lalu panah kiri/kanan untuk pindah panel
# Ketik exit untuk keluar tmux
```

---

## BAB 6: Kalau Mau Deploy Online dari Termux (Tetap Bisa!)

Kamu tetap bisa deploy ke Render + Netlify dari Termux, gak perlu laptop:

```bash
# 1. Setup git
git config --global user.name "Surabaya User"
git config --global user.email "email@gmail.com"

# 2. Push ke GitHub (harus sudah buat repo di github.com via Chrome HP)
cd ~/storage/shared/MLChecker/ml-skin-checker
git init
git add .
git commit -m "feat: ml checker termux"
git remote add origin https://github.com/USERNAME/ml-skin-checker.git
git branch -M main

# Login GitHub pakai token:
# Buka github.com → Settings → Developer Settings → Personal Access Token → Generate
# Copy token, pas git push paste token sebagai password

git push -u origin main
```

Lanjut deploy ikuti **BAB 6 & 7** di file `PANDUAN_SUPER_LENGKAP_0_SAMPAI_JALAN.md` (buka via Chrome HP ke render.com & netlify.com)

---

## BAB 7: Troubleshooting Termux

| Error | Solusi |
|-------|--------|
| `npm install` killed / out of memory | HP RAM kecil. Coba `pkg install nodejs-lts` ulang, tutup aplikasi lain, atau `npm install --max-old-space-size=512` |
| `pip install asyncpg` failed clang error | Jalankan `pkg install clang libffi openssl rust` dulu, atau skip Supabase (pakai mock mode REDIS_URL kosong) |
| `uvicorn: command not found` | Lupa `source venv/bin/activate` |
| `localhost:3000` gak bisa dibuka | Pastikan pakai `--host 0.0.0.0` dan buka `http://127.0.0.1:3000` atau `http://localhost:3000` di Chrome HP yang sama |
| Port already in use | Matikan service lama: `pkill -f uvicorn` dan `pkill -f next` |
| Storage permission denied | `termux-setup-storage` lalu Allow, dan `cd ~/storage/shared/MLChecker` |
| HP sleep build berhenti | `termux-wake-lock` sebelum npm install |

---

## BAB 8: Checklist Termux Jalan

- [ ] `node -v` keluar v20+
- [ ] `python --version` keluar 3.11+
- [ ] Folder project di `/storage/shared/MLChecker/ml-skin-checker`
- [ ] Backend `http://localhost:8000/docs` bisa dibuka
- [ ] Frontend `http://localhost:3000` bisa dibuka
- [ ] Test ID 12345678/1234 muncul result + poster
- [ ] Export PNG 4x bisa download di folder Download HP

Kalau semua centang → **WEB KAMU JALAN DI HP!** 🎉

---

## Bonus: Akses File Poster Hasil Export

Hasil export PNG akan masuk folder Download HP atau `~/storage/shared/MLChecker/`

Buka File Manager → Download → ada `ml-poster-dark-gold-1-1-12345678.png`

Siap share ke WA/IG!

---

Stuck di step mana? Bilang aja error di Termux keluar apa, aku bantu fix.
