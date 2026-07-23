/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function DarkGoldTemplate({ data, skins, showWatermark = true }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-black via-zinc-900 to-yellow-950 text-white p-5 flex flex-col overflow-hidden">
      {/* Gold glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/20 blur-[60px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/15 blur-[60px] rounded-full" />
      
      <div className="relative flex items-center gap-3 pb-4 border-b border-yellow-500/20">
        <div className="relative">
          <img src={data.avatar} alt={data.nickname} className="w-14 h-14 rounded-full border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.4)]" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-[10px]">👑</div>
        </div>
        <div className="flex-1">
          <div className="font-black text-[15px] tracking-wide">{data.nickname}</div>
          <div className="text-[11px] font-mono text-yellow-200/60">ID {data.player_id} ({data.server_id}) • {data.total_skins} Skins</div>
          <div className="flex gap-1 mt-1">
            {Object.entries(data.rarity_count).slice(0,3).map(([k,v])=> v>0 && <span key={k} className="text-[8px] px-1.5 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/30">{k} {v}</span>)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.2em] text-yellow-500/60 font-black">PRESTIGE</div>
          <div className="text-[9px] text-white/30">ML CHECKER</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-2 mt-4 content-start">
        {skins.map(s => (
          <div key={s.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-yellow-500/10 shadow-lg">
            <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-1.5 w-full">
              <div className="text-[8px] font-bold truncate text-white">{s.name}</div>
              <div className="text-[7px] text-yellow-300/70">{s.rarity}</div>
            </div>
            <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_6px_yellow]" />
          </div>
        ))}
      </div>

      {showWatermark && <div className="mt-3 flex justify-between text-[8px] text-yellow-200/20 font-mono tracking-widest"><span> DARK GOLD • LIMITED</span><span>mlchecker.netlify.app</span></div>}
    </div>
  )
}
