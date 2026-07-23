"use client"
import { templateMap, TemplateId } from "./templates"
import { SkinDisplay, PosterData } from "./templates/types"
import { useMemo } from "react"

interface Props {
  template: TemplateId
  data: PosterData
  skins: SkinDisplay[]
  backgroundId: string
  size: string
}

export default function PosterRenderer({ template, data, skins, backgroundId }: Props) {
  const Comp = templateMap[template] || templateMap["dark-gold"]
  return <Comp data={data} skins={skins} backgroundId={backgroundId} />
}

// Helper to convert API PlayerData to Poster Display
export function usePosterData(apiData: any): { posterData: PosterData, allSkins: SkinDisplay[] } {
  return useMemo(() => {
    if (!apiData) {
      const mockData: PosterData = {
        avatar: "https://i.pravatar.cc/150?img=33",
        nickname: "Wann • Pro",
        player_id: "12345678",
        server_id: "1234",
        total_skins: 387,
        total_heroes: 124,
        rarity_count: { Grand: 12, Exquisite: 45, Deluxe: 88 }
      }
      const mockSkins: SkinDisplay[] = Array.from({ length: 60 }, (_, i) => ({
        id: `skin_${i}`,
        name: `Skin ${i} Collector`,
        hero: `Hero ${i % 10}`,
        rarity: ["Grand","Exquisite","Deluxe","Exceptional","Common"][i % 5],
        img: `https://picsum.photos/seed/poster${i}/300/400`
      }))
      return { posterData: mockData, allSkins: mockSkins }
    }

    const posterData: PosterData = {
      avatar: apiData.avatar,
      nickname: apiData.nickname,
      player_id: apiData.player_id,
      server_id: apiData.server_id,
      total_skins: apiData.total_skins,
      total_heroes: apiData.total_heroes,
      rarity_count: apiData.rarity_count
    }

    const allSkins: SkinDisplay[] = apiData.heroes?.flatMap((h: any) => 
      h.skins.map((s: any) => ({
        id: s.skin_id,
        name: s.name,
        hero: h.hero_name,
        rarity: s.rarity,
        img: s.image_url
      }))
    ) || []

    return { posterData, allSkins }
  }, [apiData])
}
