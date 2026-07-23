import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

export interface CheckPayload {
  id: string
  server: string
}

export interface PlayerData {
  avatar: string
  nickname: string
  player_id: string
  server_id: string
  region: string
  total_heroes: number
  total_skins: number
  rarity_count: Record<string, number>
  last_update: string
  heroes: HeroCollection[]
}

export interface HeroCollection {
  hero_id: string
  hero_name: string
  role: string
  image_url: string
  skin_count: number
  skins: SkinItem[]
}

export interface SkinItem {
  skin_id: string
  name: string
  rarity: string
  image_url: string
}

export const checkPlayer = (payload: CheckPayload) => 
  api.post<{ data: PlayerData; cached: boolean }>(`/api/check`, payload)

export const getPlayer = (id: string, server: string) =>
  api.get<PlayerData>(`/api/player/${id}?server=${server}`)

export const getHistory = () =>
  api.get(`/api/history`)

export default api
