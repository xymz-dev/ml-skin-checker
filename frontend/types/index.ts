export type Rarity = 'Grand' | 'Exquisite' | 'Deluxe' | 'Exceptional' | 'Common' | 'Star' | 'Special' | 'Collector' | 'Legend'

export type TemplateId = 'dark-gold' | 'neon-cyber' | 'elite-crimson' | 'glass-frost' | 'polaroid' | 'emerald' | 'showcase' | 'neon-grid' | 'catalog' | 'sakura' | 'manga' | 'gacha'

export type BackgroundId = 'dark' | 'gold' | 'blue' | 'purple' | 'green' | 'gradient' | 'neon' | 'anime' | 'abstract'

export type PosterSize = '1:1' | '4:5' | '9:16' | '16:9'

export interface PosterConfig {
  template: TemplateId
  background: BackgroundId
  size: PosterSize
  showAvatar: boolean
  showStats: boolean
  showWatermark: boolean
  selectedSkins: string[] // skin_id list
  autoCount: number
  rarityPriority: Rarity[]
}

export interface ThemeConfig {
  id: TemplateId
  name: string
  thumbnail: string
  description: string
  colors: { primary: string; secondary: string; accent: string; bg: string }
  className: string
  layout: 'grid' | 'showcase' | 'polaroid' | 'catalog'
}
