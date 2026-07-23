/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function GachaTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-4 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)]" />
      <div className="relative flex items-center gap-2 bg-white/90 backdrop-blur rounded-full p-1 pr-4 shadow-xl border-2 border-white">
        <img src={data.avatar} className="w-10 h-10 rounded-full border-2 border-yellow-400" alt="" />
        <div className="flex-1"><div className="font-black text-sm text-purple-700">{data.nickname} 🎲</div><div className="text-[9px] font-mono text-purple-600">{data.player_id} • GACHA MACHINE • {data.total_skins} PULLS</div></div>
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-full">SSR</div>
      </div>
      <div className="relative mt-4 flex-1 grid grid-cols-4 gap-2 content-start">
        {skins.map(s=>(
          <div key={s.id} className="relative rounded-xl overflow-hidden bg-white border-2 border-white shadow-[0_4px_0_rgba(0,0,0,0.2)] rotate-[-1deg] hover:rotate-[1deg] transition-transform">
            <img src={s.img} className="w-full aspect-[3/4] object-cover" alt="" />
            <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[7px] font-black px-1 rounded-full border border-black">{s.rarity[0]}</div>
            <div className="p-1 bg-white"><div className="text-[7px] font-black truncate">{s.name.toUpperCase()}</div><div className="text-[6px] text-purple-600">{s.hero}</div></div>
          </div>
        ))}
      </div>
      <div className="relative mt-2 bg-black text-white text-center font-mono text-[8px] py-1 rounded-full">🎉 CONGRATS! {data.total_skins} SKINS UNLOCKED 🎉 • mlchecker.app</div>
    </div>
  )
}
