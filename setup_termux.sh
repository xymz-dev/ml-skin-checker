#!/data/data/com.termux/files/usr/bin/bash
# Setup Termux 1 Klik - ML Skin Checker
# Cara pakai di Termux:
# chmod +x setup_termux.sh
# ./setup_termux.sh

echo "📱 ML Skin Checker - Termux Setup"
echo "==================================="

# Warna
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Step 1: Update & Install deps Termux...${NC}"
pkg update -y
pkg install -y nodejs-lts python git nano clang make pkg-config libffi openssl termux-tools tmux proot

echo ""
echo -e "${YELLOW}Step 2: Cek Node & Python...${NC}"
echo -n "Node: "
node -v || echo "❌ Node belum terinstall"
echo -n "Python: "
python --version || python3 --version
echo -n "NPM: "
npm -v

echo ""
echo -e "${YELLOW}Step 3: Setup Storage...${NC}"
termux-setup-storage
mkdir -p ~/storage/shared/MLChecker
echo "Folder kerja: ~/storage/shared/MLChecker"

echo ""
echo -e "${YELLOW}Step 4: Setup Backend...${NC}"
cd backend 2>/dev/null || { echo "Jalankan script dari root ml-skin-checker/"; exit 1; }
if [ ! -d "venv" ]; then
  echo "Membuat venv..."
  python -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip wheel > /dev/null
echo "Install backend deps (fastapi, uvicorn, dll)..."
pip install fastapi uvicorn[standard] sqlalchemy pydantic pydantic-settings python-dotenv slowapi python-multipart httpx structlog

echo "Install asyncpg & alembic (kalau gagal gak papa, fallback mock)..."
pip install asyncpg alembic upstash-redis || echo "⚠️ asyncpg gagal, nanti pakai mock mode"

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "✅ .env dibuat - bisa kosongin dulu buat mock mode"
fi

cd ..

echo ""
echo -e "${YELLOW}Step 5: Setup Frontend...${NC}"
cd frontend
if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo "✅ .env.local dibuat"
fi

echo "Install frontend (3-5 menit di HP, jangan lock HP)..."
echo "Pakai termux-wake-lock biar gak tidur..."
termux-wake-lock 2>/dev/null || true
npm install --no-audit --no-fund

cd ..

echo ""
echo -e "${GREEN}==================================="
echo "✅ Setup Termux Selesai!"
echo -e "===================================${NC}"
echo ""
echo "Cara jalanin:"
echo ""
echo "Opsi 1 - Manual 2 Session:"
echo "  Session 1 (Backend):"
echo "    cd backend && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
echo ""
echo "  Session 2 (Frontend) - swipe kiri Termux -> New Session:"
echo "    cd frontend && npm run dev -- --host 0.0.0.0 --port 3000"
echo ""
echo "Opsi 2 - Auto tmux (1 session kebagi 2):"
echo "    ./start_termux.sh"
echo ""
echo "Buka di Chrome HP:"
echo "  Backend Swagger: http://localhost:8000/docs"
echo "  Frontend: http://localhost:3000"
echo "  Test ID: 12345678 Server: 1234"
echo ""
echo "Tips:"
echo "  - Kalau npm install berat, tutup aplikasi lain dulu"
echo "  - Kalau asyncpg error, gak papa pakai mock mode (REDIS_URL kosong)"
echo "  - File project ada di: ~/storage/shared/MLChecker/ml-skin-checker"
echo "  - Hasil poster download ada di: ~/storage/downloads/"
