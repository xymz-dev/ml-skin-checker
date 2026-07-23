/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function CatalogTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-[#f8f8f6] text-black p-5 flex flex-col font-mono">
      <div className="flex justify-between border-b-2 border-black pb-2"><span className="font-black text-sm tracking-[0.2em]">CATALOG</span><span className="text-[10px]">{data.total_skins} ITEMS</span></div>
      <div className="flex gap-3 mt-3 border border-black p-2">
        <img src={data.avatar} className="w-10 h-10 rounded-full border border-black" alt="" />
        <div><div className="font-bold text-xs">{data.nickname}</div><div className="text-[9px]">ID {data.player_id} / SERVER {data.server_id}</div></div>
        <div className="ml-auto text-[8px] text-right">ISSUE 2026<br/>NO. {data.player_id.slice(-4)}</div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 flex-1 content-start">
        {skins.map(s=>(
          <div key={s.id} className="border border-black bg-white p-1">
            <img src={s.img} className="w-full aspect-[4/3] object-cover border border-black/10" alt="" />
            <div className="mt-1"><div className="font-bold text-[8px] uppercase truncate">{s.hero} — {s.name}</div><div className="flex justify-between text-[7px]"><span>{s.rarity}</span><span>#{s.id.slice(-3)}</span></div></div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[7px] border-t border-black pt-1 flex justify-between"><span>© ML CHECKER CATALOG DEPT.</span><span>PRINTED MATTE 300GSM</span></div>
    </div>
  )
}
