#!/bin/bash
# Setup Auto 1 Klik - ML Skin Checker
# Usage: chmod +x setup.sh && ./setup.sh

set -e

echo "🚀 ML Skin Checker - Auto Setup"
echo "=================================="

# Check Node
if ! command -v node &> /dev/null; then
  echo "❌ Node.js belum install. Install dari https://nodejs.org versi 20"
  exit 1
fi
echo "✅ Node $(node -v)"

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
  echo "❌ Python belum install. Install dari https://python.org"
  exit 1
fi
PY_CMD=$(command -v python3 || command -v python)
echo "✅ Python $($PY_CMD --version)"

# Backend setup
echo ""
echo "📦 Setup Backend..."
cd backend
if [ ! -d "venv" ]; then
  echo "  Membuat venv..."
  $PY_CMD -m venv venv
fi

echo "  Aktivasi venv & install deps..."
# Source venv for this script only
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null || true
pip install --upgrade pip > /dev/null
pip install -r requirements.txt

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "  ⚠️  .env backend dibuat dari .env.example"
  echo "     Edit backend/.env isi DATABASE_URL & REDIS_URL Kamu (bisa kosong dulu untuk mock mode)"
else
  echo "  ✅ .env backend sudah ada"
fi
cd ..

# Frontend setup
echo ""
echo "📦 Setup Frontend..."
cd frontend
if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo "  ⚠️  .env.local frontend dibuat"
  echo "     Default NEXT_PUBLIC_API_URL=http://localhost:8000"
else
  echo "  ✅ .env.local sudah ada"
fi

echo "  Install npm (bisa 2-3 menit)..."
npm install

cd ..

echo ""
echo "=================================="
echo "✅ Setup Selesai!"
echo ""
echo "Cara jalanin:"
echo " Terminal 1 - Backend:"
echo "   cd backend"
echo "   source venv/bin/activate  (Windows: venv\\Scripts\\activate)"
echo "   uvicorn app.main:app --reload --port 8000"
echo ""
echo " Terminal 2 - Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo " Buka http://localhost:3000"
echo " Test ID: 12345678 Server: 1234"
echo ""
echo " Atau pakai Docker:"
echo "   docker-compose up --build"
echo ""
echo " Baca PANDUAN_SUPER_LENGKAP_0_SAMPAI_JALAN.md untuk deploy ke Netlify+Render"
