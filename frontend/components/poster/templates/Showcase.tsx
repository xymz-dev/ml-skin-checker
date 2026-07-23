/* eslint-disable */
"use client"
import { TemplateProps } from "./types"

export default function ShowcaseTemplate({ data, skins }: TemplateProps) {
  const highlight = skins[0]
  const rest = skins.slice(1)
  return (
    <div className="relative w-full h-full bg-zinc-950 text-white p-0 flex flex-col overflow-hidden">
      {highlight && (
        <div className="relative h-[55%] w-full overflow-hidden">
          <img src={highlight.img} className="w-full h-full object-cover" alt={highlight.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className="flex gap-2 items-center bg-black/50 backdrop-blur border border-white/10 rounded-full px-3 py-1">
              <img src={data.avatar} className="w-6 h-6 rounded-full" alt="" /><span className="text-[10px] font-bold">{data.nickname}</span>
            </div>
            <div className="bg-yellow-400 text-black text-[9px] font-black px-2 py-1 rounded">SHOWCASE</div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="text-2xl font-black leading-none">{highlight.name}</div>
            <div className="text-[11px] text-yellow-300">{highlight.rarity} • {highlight.hero}</div>
          </div>
        </div>
      )}
      <div className="flex-1 p-3 grid grid-cols-5 gap-2 content-start bg-zinc-950">
        {rest.map(s=>(
          <div key={s.id} className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 opacity-80 hover:opacity-100">
            <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
          </div>
        ))}
      </div>
      <div className="px-3 pb-2 flex justify-between text-[8px] text-white/30"><span>{data.player_id} ({data.server_id}) • {data.total_skins} skins</span><span>mlchecker.netlify.app</span></div>
    </div>
  )
}
