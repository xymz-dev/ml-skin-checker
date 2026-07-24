/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function EliteCrimsonTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0f0000] via-[#1a0000] to-black text-white p-5 flex flex-col">
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 blur-[50px] rounded-full" />
      <div className="flex items-center gap-3 border-b border-red-500/20 pb-3">
        <img src={data.avatar} className="w-14 h-14 rounded-xl border-2 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]" alt="" />
        <div>
          <div className="font-black text-sm tracking-wider">{data.nickname} <span className="text-red-500">ELITE</span></div>
          <div className="text-[10px] text-white/50 font-mono">{data.player_id} • {data.total_skins} SKIN • WINRATE 78%</div>
        </div>
        <div className="ml-auto bg-red-600 text-white text-[10px] px-2 py-1 rounded font-black tracking-widest">MYTHIC</div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-2 mt-4 content-start">
        {skins.map(s=>(
          <div key={s.id} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-red-500/20 bg-zinc-900">
            <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 to-transparent" />
            <div className="absolute bottom-1.5 left-1.5 right-1.5">
              <div className="text-[8px] font-bold">{s.name}</div>
              <div className="text-[7px] text-red-300">{s.rarity}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[8px] text-red-300/30 font-mono flex justify-between"><span>ELITE CRIMSON • BLOODLINE</span><span>mlchecker.app</span></div>
    </div>
  )
}
