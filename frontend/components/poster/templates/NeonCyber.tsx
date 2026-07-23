/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function NeonCyberTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-[#050510] text-white p-5 flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
      <div className="relative z-10 flex items-center gap-3">
        <img src={data.avatar} className="w-14 h-14 rounded-full border-2 border-cyan-300" alt="" />
        <div>
          <div className="font-mono font-black text-cyan-300 text-sm">{data.nickname}</div>
          <div className="text-[10px] text-fuchsia-300 font-mono">{data.player_id} {data.server_id} {data.total_skins} SKINS</div>
        </div>
        <div className="ml-auto px-2 py-1 rounded bg-cyan-500/20 border border-cyan-400 text-[9px] font-mono text-cyan-300">CYBER_ID</div>
      </div>
      <div className="relative z-10 mt-4 flex-1 grid grid-cols-4 gap-2 content-start">
        {skins.map(s => (
          <div key={s.id} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-cyan-400/30 bg-black">
            <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
            <div className="absolute bottom-0 w-full bg-black/80 p-1">
              <div className="text-[7px] font-mono text-cyan-200 truncate">{s.name}</div>
              <div className="text-[6px] text-fuchsia-300">{s.rarity}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative z-10 mt-3 flex justify-between text-[8px] font-mono text-cyan-300/40">
        <span>NEON CYBER RENDER 4K</span><span>ML_CHECKER</span>
      </div>
    </div>
  )
}
