import DarkGold from "./DarkGold"
import NeonCyber from "./NeonCyber"
import EliteCrimson from "./EliteCrimson"
import GlassFrost from "./GlassFrost"
import Polaroid from "./Polaroid"
import Emerald from "./Emerald"
import Showcase from "./Showcase"
import NeonGrid from "./NeonGrid"
import Catalog from "./Catalog"
import Sakura from "./Sakura"
import Manga from "./Manga"
import Gacha from "./Gacha"

export const templateMap = {
  "dark-gold": DarkGold,
  "neon-cyber": NeonCyber,
  "elite-crimson": EliteCrimson,
  "glass-frost": GlassFrost,
  "polaroid": Polaroid,
  "emerald": Emerald,
  "showcase": Showcase,
  "neon-grid": NeonGrid,
  "catalog": Catalog,
  "sakura": Sakura,
  "manga": Manga,
  "gacha": Gacha,
} as const

export type TemplateId = keyof typeof templateMap

export const templateList = Object.keys(templateMap) as TemplateId[]
