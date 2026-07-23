/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function SakuraTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1a0011] via-[#2a0a1a] to-[#1a0011] text-white p-5 flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">🌸</div>
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/20 blur-[60px] rounded-full" />
      <div className="relative flex items-center gap-3">
        <img src={data.avatar} className="w-12 h-12 rounded-full border-2 border-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.5)]" alt="" />
        <div><div className="font-bold text-pink-100 flex gap-1">{data.nickname} <span className="text-pink-400">🌸</span></div><div className="text-[9px] text-pink-200/60 font-mono">{data.player_id} • Sakura Bloom • {data.total_skins} skins</div></div>
      </div>
      <div className="relative mt-4 flex-1 grid grid-cols-3 gap-2 content-start">
        {skins.map(s=>(
          <div key={s.id} className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-900/50 to-rose-900/30 border border-pink-400/20">
            <img src={s.img} className="w-full aspect-[3/4] object-cover" alt="" />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-pink-950 to-transparent p-2"><div className="text-[8px] font-bold text-pink-100">{s.name}</div><div className="text-[7px] text-pink-300">{s.rarity} ♡ {s.hero}</div></div>
          </div>
        ))}
      </div>
      <div className="relative mt-2 text-center text-[8px] text-pink-300/50">さくら • SA KURA • blush collection • mlchecker</div>
    </div>
  )
}
