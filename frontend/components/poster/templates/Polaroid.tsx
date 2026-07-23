/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function PolaroidTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-[#fef3c7] text-black p-5 flex flex-col overflow-hidden">
      <div className="absolute top-2 right-4 rotate-12 text-[10px] bg-black text-white px-2 py-1 rounded">FLEX 📸</div>
      <div className="flex items-center gap-3">
        <img src={data.avatar} className="w-10 h-10 rounded-full border-2 border-black" alt="" />
        <div><div className="font-black font-mono text-sm">{data.nickname}</div><div className="text-[9px] font-mono">{data.player_id} • {data.total_skins} skins • {new Date().toLocaleDateString()}</div></div>
      </div>
      <div className="flex-1 relative mt-6">
        <div className="grid grid-cols-3 gap-3 rotate-[-1deg]">
          {skins.slice(0,9).map((s,i)=>(
            <div key={s.id} className="bg-white p-2 pb-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-black/5" style={{transform: `rotate(${i%2===0? -2:2}deg)`}}>
              <img src={s.img} className="w-full aspect-square object-cover border border-black/10" alt="" />
              <div className="mt-2 font-mono text-[8px] font-bold truncate">{s.name}</div>
              <div className="text-[7px] text-neutral-500">{s.rarity}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center font-mono text-[9px] mt-2">Polaroid by ML CHECKER</div>
    </div>
  )
}
