/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function GlassFrostTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-white via-sky-50 to-blue-100 text-slate-900 p-5 flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.2),transparent_50%)]" />
      <div className="relative flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-3 shadow-xl">
        <img src={data.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow" alt="" />
        <div>
          <div className="font-bold text-sm">{data.nickname}</div>
          <div className="text-[10px] text-slate-500 font-mono">{data.player_id} ({data.server_id}) • Frost Tier</div>
        </div>
        <div className="ml-auto text-[10px] bg-slate-900 text-white px-2 py-1 rounded-full">❄️ {data.total_skins}</div>
      </div>
      <div className="relative flex-1 grid grid-cols-4 gap-2 mt-4 content-start">
        {skins.map(s=>(
          <div key={s.id} className="aspect-[3/4] rounded-xl overflow-hidden bg-white/70 backdrop-blur border border-white shadow-sm group">
            <img src={s.img} className="w-full h-full object-cover group-hover:scale-105 transition" alt="" />
            <div className="bg-white/90 p-1"><div className="text-[7px] font-bold truncate">{s.name}</div><div className="text-[6px] text-sky-600">{s.rarity}</div></div>
          </div>
        ))}
      </div>
      <div className="relative mt-2 text-[8px] text-slate-400 text-center tracking-widest">GLASS FROST • PREMIUM • mlchecker.netlify.app</div>
    </div>
  )
}
