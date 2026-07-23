"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Search, History, Trophy, Users, Zap } from "lucide-react";
import { checkPlayer } from "@/services/api";

export default function LandingPage() {
  const [id, setId] = useState("");
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCheck = async () => {
    if (!id || !server) { setError("ID dan Server wajib diisi!"); return; }
    if (!/^\d+$/.test(id) || !/^\d+$/.test(server)) { setError("ID & Server harus angka!"); return; }
    setError(""); setLoading(true);
    try {
      // Call backend, if fails fallback to mock navigation for demo
      try {
        await checkPlayer({ id, server });
      } catch (e) {
        console.log("Backend not ready, using mock redirect", e);
      }
      router.push(`/player/${id}?server=${server}`);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Gagal cek, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-black text-xl"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-600" /> ML<span className="text-yellow-400">CHECKER</span></div>
        <div className="flex gap-2 text-xs text-white/50"><span className="hidden md:inline">Premium • Fast • No Login</span></div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs"><Sparkles className="w-3 h-3 text-yellow-400" /> 12 Template Poster Premium • Auto Flexing</div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">CEK & <br /><span className="bg-gradient-to-r from-yellow-300 to-amber-600 bg-clip-text text-transparent">FLEXING</span><br />SKIN ML</h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-lg">Cek total skin, rarity Grand - Common, dan buat poster aesthetic yang siap share ke WA, IG, TikTok, Discord. Tanpa login, instant, cache 30 menit.</p>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[{ icon: Trophy, label: "Total Skin", value: "Auto Count" }, { icon: Users, label: "Total Hero", value: "124+" }, { icon: Zap, label: "Export", value: "4x HD" }].map((s, i) => (
              <div key={i} className="glass rounded-xl p-3"><s.icon className="w-4 h-4 text-yellow-400 mb-1" /><div className="text-xs text-white/50">{s.label}</div><div className="font-bold text-sm">{s.value}</div></div>
            ))}
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-gold shadow-[0_0_80px_rgba(255,215,0,0.15)] border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5 text-yellow-400" /> Cek Koleksi Skin</CardTitle>
              <CardDescription>Masukkan Game ID & Server ID kamu (contoh: 12345678 - 1234)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><label className="text-xs font-semibold text-white/70">Player ID</label><Input placeholder="12345678" value={id} onChange={e => setId(e.target.value)} className="font-mono text-lg" /></div>
                <div className="space-y-2"><label className="text-xs font-semibold text-white/70">Server ID</label><Input placeholder="1234" value={server} onChange={e => setServer(e.target.value)} className="font-mono text-lg" /></div>
              </div>
              {error && <div className="text-xs bg-red-500/10 text-red-400 p-3 rounded-xl border border-red-500/20">{error}</div>}
              <Button onClick={handleCheck} disabled={loading} className="w-full h-14 text-base rounded-xl" variant="gold">{loading ? "Checking..." : "✨ Check Skin Sekarang"}</Button>
              <div className="text-[11px] text-white/30 text-center">Data di-cache 30 menit • Support 124 Hero • Legal-safe Mock Provider</div>
              
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/50"><History className="w-3 h-3" /> Riwayat Terbaru (Mock)</div>
                <div className="space-y-2">{[{ id: "89231234", srv: "1234", name: "Sorewa • Wann" }, { id: "77123321", srv: "2221", name: "RRQ • Clay" }].map((h, i) => (
                  <div key={i} onClick={() => { setId(h.id); setServer(h.srv); }} className="flex justify-between items-center glass rounded-lg p-2.5 text-xs cursor-pointer hover:bg-white/10"><span className="font-mono">{h.id} ({h.srv})</span><span className="text-white/60">{h.name}</span></div>
                ))}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="p-6 text-center text-[11px] text-white/20">© 2026 ML Skin Checker • Premium Full Stack • Not affiliated with Moonton • Using Mock Data for Demo</footer>
    </main>
  );
}
