/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function MangaTemplate({ data, skins }: TemplateProps) {
  return (
    <div className="relative w-full h-full bg-white text-black p-0 flex flex-col font-black">
      <div className="flex border-b-4 border-black">
        <div className="bg-black text-white px-3 py-1 text-[12px] tracking-widest">ML COMICS</div>
        <div className="ml-auto text-[9px] px-2 py-1">ISSUE #{data.player_id.slice(-3)} • {data.nickname}</div>
      </div>
      <div className="grid grid-cols-3 gap-[3px] bg-black p-[3px] flex-1 content-start">
        {skins.map((s,i)=>(
          <div key={s.id} className={`bg-white relative overflow-hidden ${i%5===0 ? 'col-span-2 row-span-2' : ''}`}>
            <img src={s.img} className="w-full h-full object-cover grayscale contrast-125" alt="" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:4px_4px] opacity-20" />
            <div className="absolute bottom-0 left-0 bg-white border-t-2 border-r-2 border-black px-1 text-[7px] font-black uppercase">{s.name}</div>
            <div className="absolute top-0 right-0 bg-yellow-300 border-b-2 border-l-2 border-black px-1 text-[6px]">{s.rarity.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div className="bg-black text-white text-[8px] flex justify-between px-2 py-1"><span>{data.player_id} ({data.server_id})</span><span>MADE IN JAPAN • ML CHECKER</span></div>
    </div>
  )
}
