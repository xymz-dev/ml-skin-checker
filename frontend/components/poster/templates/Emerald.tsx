/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function EmeraldTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#022c22] via-[#001a12] to-black text-white p-5 flex flex-col">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/20 to-transparent" />
      <div className="relative flex items-center gap-3">
        <img src={data.avatar} className="w-14 h-14 rounded-full border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]" alt="" />
        <div><div className="font-black text-emerald-200">{data.nickname}</div><div className="text-[10px] text-emerald-300/60 font-mono">{data.player_id} • {data.total_skins} SKIN • EMERALD RANK</div></div>
        <div className="ml-auto w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black">E</div>
      </div>
      <div className="relative mt-4 flex-1 grid grid-cols-4 gap-2 content-start">
        {skins.map(s=>(
          <div key={s.id} className="aspect-[3/4] rounded-xl overflow-hidden border border-emerald-500/20 bg-emerald-950/50">
            <img src={s.img} className="w-full h-full object-cover" alt="" />
            <div className="bg-emerald-950/80 p-1 border-t border-emerald-500/20"><div className="text-[7px] font-bold truncate text-emerald-100">{s.name}</div><div className="text-[6px] text-emerald-400">{s.rarity}</div></div>
          </div>
        ))}
      </div>
      <div className="relative mt-3 text-[8px] text-emerald-300/30 flex justify-between"><span>EMERALD • NATURE • PROSPERITY</span><span>mlchecker</span></div>
    </div>
  )
}
