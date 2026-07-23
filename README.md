# ML Skin Checker - Premium Full Stack

Aplikasi **cek koleksi skin Mobile Legends** dengan **poster generator premium** 12 template, desain glassmorphism + gradient mesh, export HD 4x, auto/manual mode, dan legal-safe MockProvider.

> Dibuat dari MASTER PROMPT 7-in-1 gabungan (legal-safe, tidak scraping API privat Moonton tanpa izin)

## ✨ Fitur Utama
- **Landing Page Premium**: Glassmorphism, Framer Motion, Hero Banner, Input ID+Server
- **Result Page**: Avatar, Nickname, Total Hero/Skin, Rarity Breakdown, Search/Filter/Sort, Infinite Scroll
- **Poster Generator `/poster/[id]`**: 
  - 12 Template: Dark Gold, Neon Cyber, Elite Crimson, Glass Frost, Polaroid, Emerald, Showcase, Neon Grid, Catalog, Sakura, Manga, Gacha
  - 9 Background: Dark, Gold, Blue, Purple, Green, Gradient, Neon, Anime, Abstract
  - 2 Mode: ⚡ Auto (slider 1-60 + drag & drop rarity priority) & ✋ Manual (checkbox + search)
  - Realtime Preview
  - Export: PNG 4x HD, JPG, Copy Image, Copy Link, Share (Web Share API), Ukuran 1:1,4:5,9:16,16:9
- **Backend Clean Architecture**: Routers, Services, Repos, Providers, Schemas, Cache, Core
- **Legal-safe**: MockProvider default, Provider Pattern mudah switch ke Official jika ada izin
- **Cache**: Upstash Redis (fallback RAM) TTL 30 menit key `player:{id}_{server}`
- **DB**: Supabase PostgreSQL + Alembic + Repository async

## 🛠 Tech Stack
**Frontend**: Next.js 15 App Router, TS Strict, Tailwind, Shadcn UI, Framer Motion, TanStack Query v5, Axios, dnd-kit, modern-screenshot
**Backend**: FastAPI, SQLAlchemy 2.0 Async, Alembic, Pydantic v2, Uvicorn, SlowAPI Rate Limit, Structlog
**DB**: Supabase PG, **Cache**: Upstash Redis, **Deploy**: Netlify (FE), Render (BE)

## 📁 Struktur Project
```
frontend/ app/{page, player/[id], poster/[id]} components/{ui,landing,player,poster} lib/themes.ts services/api.ts
backend/ app/{routers,services,repositories,providers/{base,mock,factory},schemas,models,database,cache,core} alembic tests
docs/
docker-compose.yml
```

## 🚀 Cara Jalan Lokal

### Opsi 1: Docker (Recommended)
```bash
cp .env.example .env
docker-compose up --build
# FE: http://localhost:3000
# BE: http://localhost:8000/docs
```

### Opsi 2: Manual
Backend:
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Frontend:
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev # http://localhost:3000
```

## 🔌 API Endpoints
- `GET /` - health
- `GET /health`
- `POST /api/check` - body {id, server}
- `GET /api/player/{id}?server=xxx`
- `GET /api/history`
- `GET /api/poster/{id}?server=xxx`

Swagger: `/docs`, ReDoc `/redoc`

## 🎨 Theme Engine
Tambah template baru cukup tambah object di `frontend/lib/themes.ts`:
```ts
{ id: 'my-template', name: 'My', thumbnail: '🔥', colors: {...}, className: 'bg-gradient...', layout: 'grid' }
```
Otomatis muncul di selector.

## ⚠️ Legal Note
Aplikasi ini menggunakan **MockProvider** secara default untuk demo & menghindari pelanggaran TOS Moonton. Jangan implementasikan scraping API privat MLBB tanpa izin resmi. Provider harus diganti via `PROVIDER` env & implement `BaseProvider` jika punya sumber data berizin.

## 📦 Deploy
- Frontend Netlify: Build cmd `npm run build`, Publish `.next`, env `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
- Backend Render: Build `pip install -r requirements.txt`, Start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Supabase: copy DATABASE_URL, run Alembic `alembic upgrade head`
- Upstash Redis: copy URL & TOKEN

## ✅ Checklist Production
- [x] TS Strict, Clean Architecture
- [x] Ratelimit 20/min, CORS, Logging
- [x] Cache aside 30m
- [x] Shadcn Reusable, <200 line per component
- [x] Export 4x HD anti-pecah
- [x] Responsive 360-1440

Made with ❤️ - Premium MLBB Flexing.
