/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function NeonGridTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-black text-white p-5 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(168,85,247,0.1)_50%,transparent_100%)] animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(168,85,247,0.15)_95%),linear-gradient(transparent_95%,rgba(34,211,238,0.15)_95%)] bg-[size:28px_28px]" />
      <div className="relative flex items-center gap-3">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center font-black text-black">ML</div>
        <div><div className="font-mono font-bold tracking-widest">{data.nickname}</div><div className="text-[9px] font-mono text-purple-300">{data.player_id} • GRID_VER 2.0 • {data.total_skins} ASSETS</div></div>
      </div>
      <div className="relative mt-4 flex-1 grid grid-cols-3 gap-[1px] bg-purple-500/30 border border-purple-500/30 p-[1px] rounded-lg overflow-hidden content-start">
        {skins.map(s=>(
          <div key={s.id} className="bg-black aspect-[3/4] relative group">
            <img src={s.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="" />
            <div className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/50 transition" />
            <div className="absolute bottom-0 w-full bg-black/70 p-1 font-mono text-[6px]">{s.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
