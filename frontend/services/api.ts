import axios from 'axios'
import { REAL_HEROES } from '@/lib/realHeroes'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

export interface CheckPayload { id: string; server: string }

export interface SkinItem { skin_id: string; name: string; rarity: string; image_url: string }
export interface HeroCollection {
  hero_id: string; hero_name: string; role: string; image_url: string; skin_count: number; skins: SkinItem[]
}
export interface PlayerData {
  avatar: string; nickname: string; player_id: string; server_id: string; region: string;
  total_heroes: number; total_skins: number; rarity_count: Record<string, number>; last_update: string; heroes: HeroCollection[]
}

export const checkPlayer = (payload: CheckPayload) => 
  api.post<{ data: PlayerData; cached: boolean }>(`/api/check`, payload)

export const getPlayer = (id: string, server: string) =>
  api.get<PlayerData>(`/api/player/${id}?server=${server}`)

export const getHistory = () => api.get(`/api/history`)

// Real heroes fallback generator
export function genRealMockFallback(player_id: string, server_id: string): PlayerData {
  const seed = player_id + server_id
  let seedNum = 0; for(let i=0;i<seed.length;i++) seedNum += seed.charCodeAt(i)
  const rnd = (max: number) => {
    seedNum = (seedNum * 9301 + 49297) % 233280
    return Math.floor((seedNum / 233280) * max)
  }
  const rarities = ["Legend","Collector","Epic","Special","Elite","Starlight","Supreme"]
  const types = ["Collector","Legend","Epic","Starlight","Elite","Special","Luckybox","Neon"]
  const roles = ["Tank","Fighter","Assassin","Mage","Marksman","Support"]
  const nicks = ["Wann","R7","Clay","Lemon","Sanz","xymz","Rahizel"]
  
  const selected = [...REAL_HEROES].sort(() => 0.5 - (rnd(100)/100)).slice(0, 30)
  let totalSkins = 0
  const rarityCount: Record<string, number> = {}
  const heroes: HeroCollection[] = selected.map((h, i) => {
    const sc = rnd(7)+1
    totalSkins += sc
    const skins: SkinItem[] = Array.from({length: sc}, (_, j) => {
      const r = rarities[rnd(rarities.length)]
      rarityCount[r] = (rarityCount[r]||0)+1
      return {
        skin_id: `skin_${player_id}_${h.id}_${j}`,
        name: `${h.name} - ${types[rnd(types.length)]}`,
        rarity: r,
        image_url: h.image
      }
    })
    return {
      hero_id: h.id,
      hero_name: h.name,
      role: roles[rnd(roles.length)],
      image_url: h.image,
      skin_count: sc,
      skins
    }
  })

  return {
    avatar: `https://i.pravatar.cc/150?img=${rnd(70)+1}`,
    nickname: `${nicks[rnd(nicks.length)]} • Pro`,
    player_id,
    server_id,
    region: "Indonesia",
    total_heroes: 124,
    total_skins: totalSkins,
    rarity_count: rarityCount,
    last_update: new Date().toISOString(),
    heroes
  }
}

export default api
