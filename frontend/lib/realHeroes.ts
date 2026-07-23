import realHeroes from "./real_heroes.json"

export interface RealHero {
  id: string
  name: string
  image: string
  role: string
}

export const REAL_HEROES: RealHero[] = realHeroes as any

export const REAL_RARITIES = ["Legend","Collector","Epic","Special","Elite","Starlight","Supreme","Grand","Exquisite","Deluxe"] as const

export const REAL_SKIN_TYPES = ["Collector","Legend","Epic","Starlight","Elite","Special","Luckybox","Neon","Cyber","Soul Vessel","Exorcist","Aspirants","Sanrio","Transformers","Dragon","Inferno","S.A.B.E.R","Venom","Lightborn","KOF","Abyss","Stun"] as const

export function getRandomRealHeroes(count: number, seedStr: string) {
  // Seeded random sample
  let seed = 0
  for (let i=0;i<seedStr.length;i++) seed += seedStr.charCodeAt(i)
  const shuffled = [...REAL_HEROES].sort(() => {
    seed = (seed * 9301 + 49297) % 233280
    return (seed / 233280) - 0.5
  })
  return shuffled.slice(0, count)
}
