-- ML Skin Checker - Supabase Full Schema
-- Run this in Supabase SQL Editor (Singapore region)

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Players
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id TEXT NOT NULL,
  server_id TEXT NOT NULL,
  nickname TEXT,
  avatar_url TEXT,
  region TEXT,
  total_heroes INT DEFAULT 0,
  total_skins INT DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(player_id, server_id)
);
CREATE INDEX IF NOT EXISTS idx_players_player_server ON players(player_id, server_id);

-- Heroes Reference
CREATE TABLE IF NOT EXISTS heroes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skins Reference
CREATE TABLE IF NOT EXISTS skins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skin_id TEXT UNIQUE NOT NULL,
  hero_id TEXT REFERENCES heroes(hero_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  rarity TEXT NOT NULL,
  image_url TEXT,
  is_limited INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_skins_hero ON skins(hero_id);
CREATE INDEX IF NOT EXISTS idx_skins_rarity ON skins(rarity);

-- Player Results (cache JSON)
CREATE TABLE IF NOT EXISTS player_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id_fk TEXT NOT NULL,
  server_id_fk TEXT NOT NULL,
  data_json JSONB NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_player_results_lookup ON player_results(player_id_fk, server_id_fk);
CREATE INDEX IF NOT EXISTS idx_player_results_jsonb ON player_results USING GIN (data_json);

-- History
CREATE TABLE IF NOT EXISTS history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id_input TEXT NOT NULL,
  server_id_input TEXT NOT NULL,
  nickname_snapshot TEXT,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_history_checked ON history(checked_at DESC);

-- Enable RLS (optional, for Supabase you can disable if using service_role)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE skins ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- Create policies allow all for service_role (backend uses service_role key)
DROP POLICY IF EXISTS "Allow all" ON players;
CREATE POLICY "Allow all" ON players FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all" ON heroes;
CREATE POLICY "Allow all" ON heroes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all" ON skins;
CREATE POLICY "Allow all" ON skins FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all" ON player_results;
CREATE POLICY "Allow all" ON player_results FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all" ON history;
CREATE POLICY "Allow all" ON history FOR ALL USING (true) WITH CHECK (true);

-- Seed Heroes (sample 10)
INSERT INTO heroes (hero_id, name, role, image_url) VALUES
('h001','Layla','Marksman','https://picsum.photos/seed/layla/200/200'),
('h002','Miya','Marksman','https://picsum.photos/seed/miya/200/200'),
('h003','Alucard','Fighter','https://picsum.photos/seed/alucard/200/200'),
('h004','Gusion','Assassin','https://picsum.photos/seed/gusion/200/200'),
('h005','Hayabusa','Assassin','https://picsum.photos/seed/haya/200/200'),
('h006','Esmeralda','Mage','https://picsum.photos/seed/esme/200/200'),
('h007','Paquito','Fighter','https://picsum.photos/seed/paquito/200/200'),
('h008','Beatrix','Marksman','https://picsum.photos/seed/beatrix/200/200'),
('h009','Aamon','Assassin','https://picsum.photos/seed/aamon/200/200'),
('h010','Yve','Mage','https://picsum.photos/seed/yve/200/200')
ON CONFLICT (hero_id) DO NOTHING;
