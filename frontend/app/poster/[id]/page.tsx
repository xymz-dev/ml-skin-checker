"use client";
import { useState, useMemo, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { themes, backgrounds } from "@/lib/themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TemplateId, BackgroundId, PosterSize, Rarity } from "@/types";
import { Download, Copy, Share2, Search, Settings, Eye, GripVertical } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PosterRenderer, { usePosterData } from "@/components/poster/PosterRenderer";
import { templateMap } from "@/components/poster/templates";
import { useQuery } from "@tanstack/react-query";
import { getPlayer } from "@/services/api";

const rarityList: Rarity[] = ["Grand","Exquisite","Deluxe","Exceptional","Common"];

function SortableRarity({ id }: { id: Rarity }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center gap-2 glass rounded-xl p-3 text-sm cursor-grab">
      <GripVertical className="w-4 h-4 text-white/40" />{id}<span className="ml-auto text-xs text-white/50">drag</span>
    </div>
  );
}

export default function PosterPage() {
  const params = useParams();
  const search = useSearchParams();
  const id = params.id as string;
  const server = search.get("server") || "1234";
  const posterRef = useRef<HTMLDivElement>(null);

  // Fetch real data
  const { data: apiData } = useQuery({
    queryKey: ["player-poster", id, server],
    queryFn: async () => {
      try { const res = await getPlayer(id, server); return res.data } catch { return null }
    }
  });

  const { posterData, allSkins: apiSkins } = usePosterData(apiData);
  
  const [template, setTemplate] = useState<TemplateId>("dark-gold");
  const [background, setBackground] = useState<BackgroundId>("dark");
  const [size, setSize] = useState<PosterSize>("1:1");
  const [mode, setMode] = useState<"auto"|"manual">("auto");
  const [autoCount, setAutoCount] = useState(24);
  const [rarityPriority, setRarityPriority] = useState<Rarity[]>(rarityList);
  const [searchSkin, setSearchSkin] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(apiSkins.slice(0,12).map(s=>s.id)));

  const allSkins = apiSkins.length ? apiSkins : Array.from({ length: 60 }, (_, i) => ({
    id: `skin_${i}`, hero: `Hero ${i%10}`, name: `Skin ${i} ${["Collector","Legend","Epic"][i%3]}`, rarity: rarityList[i%5] as Rarity, img: `https://picsum.photos/seed/poster${i}/300/400`
  }));

  const filteredSkins = allSkins.filter(s => s.name.toLowerCase().includes(searchSkin.toLowerCase()));

  const autoSkins = useMemo(() => {
    const priorityMap = new Map(rarityPriority.map((r, i) => [r, i]));
    return [...allSkins].sort((a,b) => (priorityMap.get(a.rarity as Rarity)! - priorityMap.get(b.rarity as Rarity)!)).slice(0, autoCount);
  }, [allSkins, autoCount, rarityPriority]);

  const displaySkins = mode === "auto" ? autoSkins : allSkins.filter(s => selected.has(s.id));

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setRarityPriority((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleExport = async (format: "png"|"jpg") => {
    if (!posterRef.current) return;
    try {
      const { domToPng, domToJpeg } = await import("modern-screenshot");
      const opt = { scale: 4, quality: 1, backgroundColor: undefined } as any;
      const dataUrl = format === "png" ? await domToPng(posterRef.current, opt) : await domToJpeg(posterRef.current, { ...opt, quality: 0.92 });
      const link = document.createElement("a");
      link.download = `ml-poster-${template}-${size}-${id}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (e) { alert("Export gagal: " + e); }
  };

  // Keep selected sync when api loads
  useMemo(() => { if (allSkins.length && selected.size===0) setSelected(new Set(allSkins.slice(0,12).map(s=>s.id))) }, [allSkins]);

  return (
    <div className="min-h-screen max-w-[1600px] mx-auto p-4 lg:p-6 grid lg:grid-cols-[420px_1fr] gap-6">
      {/* Settings */}
      <div className="space-y-4 overflow-auto lg:h-[calc(100vh-48px)] scrollbar-hide">
        <div className="flex gap-2">
          <Button variant={mode === "auto" ? "gold" : "outline"} className="flex-1" onClick={() => setMode("auto")}>⚡ Auto ({autoCount})</Button>
          <Button variant={mode === "manual" ? "gold" : "outline"} className="flex-1" onClick={() => setMode("manual")}>✋ Manual ({selected.size})</Button>
        </div>

        <Card><CardHeader><CardTitle className="text-sm flex gap-2"><Settings className="w-4 h-4" /> Template Premium (12) • Real Component</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {themes.map(t => (
              <button key={t.id} onClick={() => setTemplate(t.id as any)} className={`rounded-xl p-2 text-[11px] border-2 transition-all ${template===t.id?"border-yellow-400 bg-yellow-400/10 shadow-[0_0_10px_rgba(255,215,0,0.3)]":"border-white/5 glass hover:bg-white/10"}`}>
                <div className="text-xl">{t.thumbnail}</div><div className="font-bold truncate">{t.name}</div><div className="text-[8px] opacity-50">{t.id}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card><CardHeader><CardTitle className="text-sm">Background</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {backgrounds.map(b => (
              <button key={b.id} onClick={() => setBackground(b.id as any)} className={`px-3 py-1.5 rounded-full text-xs border ${background===b.id?"bg-white text-black border-white":"glass border-white/10"}`}>{b.name}</button>
            ))}
          </CardContent>
        </Card>

        <Card><CardHeader><CardTitle className="text-sm">Ukuran Poster</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-4 gap-2">
            {(["1:1","4:5","9:16","16:9"] as PosterSize[]).map(s => (
              <button key={s} onClick={() => setSize(s)} className={`rounded-lg p-2 text-xs border font-mono ${size===s?"bg-yellow-400 text-black border-yellow-400":"glass"}`}>{s}</button>
            ))}
          </CardContent>
        </Card>

        {mode === "auto" ? (
          <Card><CardHeader><CardTitle className="text-sm">Auto Settings - Drag Priority</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><label className="text-xs text-white/60">Jumlah Skin: {autoCount}</label><input type="range" min="1" max="60" value={autoCount} onChange={e=>setAutoCount(parseInt(e.target.value))} className="w-full accent-yellow-400" /></div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={rarityPriority} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">{rarityPriority.map(r => <SortableRarity key={r} id={r} />)}</div>
                </SortableContext>
              </DndContext>
              <div className="glass rounded-xl p-3 text-xs"><div className="font-bold mb-2">Ringkasan {autoSkins.length} skins</div>{rarityPriority.map(r => <div key={r} className="flex justify-between"><span>{r}</span><span>{autoSkins.filter(s=>s.rarity===r).length}</span></div>)}</div>
            </CardContent>
          </Card>
        ) : (
          <Card><CardHeader><CardTitle className="text-sm">Manual Select ({selected.size})</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="relative"><Search className="w-4 h-4 absolute left-3 top-3 text-white/40" /><Input className="pl-9" placeholder="Search skin..." value={searchSkin} onChange={e=>setSearchSkin(e.target.value)} /></div>
              <div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=>setSelected(new Set(allSkins.map(s=>s.id)))}>All</Button><Button size="sm" variant="outline" onClick={()=>setSelected(new Set())}>None</Button></div>
              <div className="max-h-[320px] overflow-auto space-y-2 scrollbar-hide">
                {filteredSkins.map(s => (
                  <label key={s.id} className="flex gap-2 items-center glass rounded-lg p-2 text-xs cursor-pointer hover:bg-white/10">
                    <input type="checkbox" checked={selected.has(s.id)} onChange={e=>{ const ns=new Set(selected); e.target.checked?ns.add(s.id):ns.delete(s.id); setSelected(ns);}} />
                    <img src={s.img} className="w-8 h-8 rounded object-cover" alt={s.name} /><div className="flex-1"><div className="font-bold truncate">{s.name}</div><div className="text-[10px] text-white/50">{s.hero} • {s.rarity}</div></div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={()=>handleExport("png")} variant="gold"><Download className="w-4 h-4" /> PNG 4x HD</Button>
          <Button onClick={()=>handleExport("jpg")} variant="outline"><Download className="w-4 h-4" /> JPG</Button>
          <Button variant="outline" onClick={()=>navigator.clipboard.writeText(window.location.href)}><Copy className="w-4 h-4" /> Copy Link</Button>
          <Button variant="outline" onClick={()=>{ if(navigator.share) navigator.share({title:"ML Skin Poster", url: window.location.href}) }}><Share2 className="w-4 h-4" /> Share</Button>
        </div>
      </div>

      {/* Preview with Real Template Component */}
      <div className="lg:sticky lg:top-6 h-fit">
        <Card className="overflow-hidden"><CardHeader className="flex flex-row justify-between"><CardTitle className="text-sm flex gap-2"><Eye className="w-4 h-4" /> Preview: {template} • {background} • {size} • {displaySkins.length} skins</CardTitle><Badge variant="outline">{templateMap[template as any] ? "Real Component" : "Fallback"}</Badge></CardHeader>
          <CardContent className="flex justify-center bg-zinc-950 p-6">
            <div 
              ref={posterRef} 
              className={`relative w-full max-w-[480px] rounded-[24px] overflow-hidden border-4 shadow-2xl border-white/10 ${size==="1:1"?"aspect-square":size==="4:5"?"aspect-[4/5]":size==="9:16"?"aspect-[9/16]":"aspect-video"}`}
              style={{ imageRendering: "auto" as any }}
            >
              <PosterRenderer template={template as any} data={posterData} skins={displaySkins} backgroundId={background} size={size} />
            </div>
          </CardContent>
        </Card>
        <div className="mt-3 text-[11px] text-white/30 text-center">✅ Template real component aktif — export 4x tetap tajam di WA/IG/Discord • Watermark otomatis</div>
      </div>
    </div>
  );
}
