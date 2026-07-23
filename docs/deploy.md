# Deploy Guide - Netlify + Render + Supabase + Upstash

## 1. Supabase (PostgreSQL) Setup
1. Buka https://supabase.com > New Project (region Singapore)
2. Copy `Connection String` -> Transaction Pooler -> AsyncPG
   Format: `postgresql+asyncpg://postgres.xxxxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
3. Masuk ke SQL Editor, paste isi `backend/supabase_schema.sql` -> Run
4. Masukkan URL ke Render env `DATABASE_URL`

## 2. Upstash Redis Setup
1. Buka https://upstash.com > Create Redis (region Singapore)
2. Copy `UPSTASH_REDIS_REST_URL` dan `UPSTASH_REDIS_REST_TOKEN`
3. Masukkan ke Render env `REDIS_URL` & `REDIS_TOKEN`
4. Jika kosong, backend otomatis fallback ke in-memory cache (tetap jalan)

## 3. Backend Deploy (Render)
1. Push project ke GitHub
2. Render.com > New > Blueprint > Connect repo > akan baca `render.yaml`
3. Atau Manual Web Service: Root Dir `backend`, Build `pip install -r requirements.txt`, Start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set Env Vars sesuai `.env.example`
5. Health Check: `/health` harus return 200
6. Swagger akan di `https://your-backend.onrender.com/docs`

## 4. Frontend Deploy (Netlify)
1. Netlify.com > Add New Site > Import GitHub
2. Base directory: `frontend`
3. Build command: `npm run build`, Publish: `.next`
4. Install plugin: `@netlify/plugin-nextjs` otomatis via `netlify.toml`
5. Env Var: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
6. Deploy. Cek log build.

## 5. Verifikasi
- Buka frontend netlify URL, cek ID 12345678 server 1234
- Harusnya redirect ke result page (mock data)
- Buat poster, export PNG 4x
- Cek cache: request kedua harus `cached: true`

## Troubleshooting
- CORS error -> cek CORS_ORIGINS di backend include netlify domain
- DB connection fail -> ganti pooler URL supabase ke port 5432 direct (bukan 6543)
- Upstash fail -> cek token, atau biarkan fallback memory
- Build Netlify fail -> pastikan Node 20, Next 15.1.3
