"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPlayer, PlayerData } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Crown, Sparkles } from "lucide-react";

// Mock data if backend not ready
const mockPlayer: PlayerData = {
  avatar: "https://i.pravatar.cc/150?img=33",
  nickname: "Wann • Pro",
  player_id: "12345678",
  server_id: "1234",
  region: "Indonesia",
  total_heroes: 124,
  total_skins: 387,
  rarity_count: { Grand: 12, Exquisite: 45, Deluxe: 88, Exceptional: 132, Common: 110 },
  last_update: new Date().toISOString(),
  heroes: Array.from({ length: 20 }, (_, i) => ({
    hero_id: `hero_${i}`,
    hero_name: ["Layla","Miya","Alucard","Gusion","Ling","Hayabusa","Fanny","Aamon","Aulus","Beatrix","Melissa","Xavier","Julian","Fredrinn","Arlott","Novaria","Ixia"][i % 17],
    role: ["Marksman","Fighter","Assassin","Mage","Tank","Support"][i % 6],
    image_url: `https://picsum.photos/seed/hero${i}/200/200`,
    skin_count: Math.floor(Math.random()*8)+1,
    skins: Array.from({ length: Math.floor(Math.random()*5)+1 }, (_, j) => ({
      skin_id: `skin_${i}_${j}`,
      name: ["Collector","Legend","Epic","Starlight","Elite","Special","Luckybox"][j % 7] + ` ${i}`,
      rarity: ["Grand","Exquisite","Deluxe","Exceptional","Common"][j % 5],
      image_url: `https://picsum.photos/seed/skin${i}${j}/300/400`
    }))
  }))
};

export default function PlayerPage() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const server = search.get("server") || "1234";

  const [searchHero, setSearchHero] = useState("");
  const [filterRarity, setFilterRarity] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["player", id, server],
    queryFn: async () => {
      try {
        const res = await getPlayer(id, server);
        return res.data;
      } catch {
        return { ...mockPlayer, player_id: id, server_id: server };
      }
    },
  });

  const player = data || mockPlayer;

  const filtered = useMemo(() => {
    return player.heroes.filter(h => {
      const matchSearch = h.hero_name.toLowerCase().includes(searchHero.toLowerCase());
      const matchRarity = filterRarity === "All" || h.skins.some(s => s.rarity === filterRarity);
      return matchSearch && matchRarity;
    });
  }, [player, searchHero, filterRarity]);

  if (isLoading) return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <Skeleton className="h-40 w-full" /><Skeleton className="h-96 w-full" />
    </div>
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 space-y-6">
      <Button variant="ghost" onClick={() => router.push("/")}><ArrowLeft className="w-4 h-4" /> Kembali</Button>

      <Card className="glass-gold overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <img src={player.avatar} alt={player.nickname} className="w-24 h-24 rounded-2xl object-cover border-2 border-yellow-500/30" />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black">{player.nickname}</h1><Badge variant="outline">{player.region}</Badge>
              <span className="text-sm font-mono text-white/60">ID: {player.player_id} ({player.server_id})</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="glass rounded-xl p-3"><div className="text-xs text-white/50">Total Hero</div><div className="text-xl font-bold">{player.total_heroes}</div></div>
              <div className="glass rounded-xl p-3"><div className="text-xs text-white/50">Total Skin</div><div className="text-xl font-bold">{player.total_skins}</div></div>
              {Object.entries(player.rarity_count).slice(0,3).map(([k,v]) => (
                <div key={k} className="glass rounded-xl p-3"><div className="text-xs text-white/50">{k}</div><div className="text-xl font-bold">{v}</div></div>
              ))}
            </div>
          </div>
          <Button variant="gold" size="lg" onClick={() => router.push(`/poster/${player.player_id}?server=${player.server_id}`)}><Sparkles className="w-4 h-4" /> Buat Poster Flexing</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2"><Crown className="w-5 h-5 text-yellow-400" /> Koleksi Hero ({filtered.length})</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <div className="relative"><Search className="w-4 h-4 absolute left-3 top-3 text-white/40" /><Input placeholder="Search hero..." className="pl-9 w-48" value={searchHero} onChange={e => setSearchHero(e.target.value)} /></div>
            <select value={filterRarity} onChange={e => setFilterRarity(e.target.value)} className="h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm">
              <option value="All">All Rarity</option><option>Grand</option><option>Exquisite</option><option>Deluxe</option><option>Exceptional</option><option>Common</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((hero, i) => (
              <motion.div key={hero.hero_id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="glass rounded-2xl p-4 space-y-3 hover:bg-white/[0.07] transition-all">
                <div className="flex gap-3">
                  <img src={hero.image_url} className="w-14 h-14 rounded-xl object-cover" alt={hero.hero_name} />
                  <div className="flex-1"><div className="font-bold">{hero.hero_name}</div><div className="text-xs text-white/50">{hero.role} • {hero.skin_count} Skin</div><div className="mt-1 flex gap-1 flex-wrap">{hero.skins.slice(0,2).map(s => <Badge key={s.skin_id} variant={s.rarity.toLowerCase() as any} className="text-[10px]">{s.rarity}</Badge>)}</div></div>
                </div>
                <div className="grid grid-cols-3 gap-2">{hero.skins.map(s => (<div key={s.skin_id} className="aspect-[3/4] rounded-lg overflow-hidden bg-white/5 relative group"><img src={s.image_url} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-1 flex flex-col justify-end"><div className="text-[9px] font-bold truncate">{s.name}</div></div></div>))}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
