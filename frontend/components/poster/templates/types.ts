export interface SkinDisplay {
  id: string
  name: string
  hero: string
  rarity: 'Grand' | 'Exquisite' | 'Deluxe' | 'Exceptional' | 'Common' | string
  img: string
}

export interface PosterData {
  avatar: string
  nickname: string
  player_id: string
  server_id: string
  total_skins: number
  total_heroes: number
  rarity_count: Record<string, number>
}

export interface TemplateProps {
  data: PosterData
  skins: SkinDisplay[]
  backgroundId: string
  showWatermark?: boolean
  highlightSkin?: SkinDisplay // for showcase
}
