import { ThemeConfig } from '@/types'

export const themes: ThemeConfig[] = [
  { id: 'dark-gold', name: 'Dark Gold', thumbnail: '🟨', description: 'Mewah hitam emas', colors: { primary: '#FFD700', secondary: '#0f0f12', accent: '#FF8C00', bg: '#000000' }, className: 'bg-gradient-to-br from-black via-zinc-900 to-yellow-950 border-yellow-500/30', layout: 'grid' },
  { id: 'neon-cyber', name: 'Neon Cyber', thumbnail: '🌃', description: 'Cyberpunk neon', colors: { primary: '#00FFFF', secondary: '#1a0033', accent: '#FF00FF', bg: '#0a0a1a' }, className: 'bg-gradient-to-br from-slate-950 via-purple-950 to-cyan-950 border-cyan-400/30', layout: 'grid' },
  { id: 'elite-crimson', name: 'Elite Crimson', thumbnail: '🔴', description: 'Merah elite berani', colors: { primary: '#DC2626', secondary: '#1a0000', accent: '#FF0000', bg: '#0f0000' }, className: 'bg-gradient-to-br from-black via-red-950 to-zinc-900 border-red-500/30', layout: 'grid' },
  { id: 'glass-frost', name: 'Glass Frost', thumbnail: '❄️', description: 'Putih frost glass', colors: { primary: '#FFFFFF', secondary: '#e0f2fe', accent: '#38bdf8', bg: '#f0f9ff' }, className: 'bg-gradient-to-br from-white via-sky-50 to-blue-100 border-white/50 text-slate-900', layout: 'grid' },
  { id: 'polaroid', name: 'Polaroid', thumbnail: '📸', description: 'Stack foto polaroid', colors: { primary: '#fef3c7', secondary: '#fffbeb', accent: '#f59e0b', bg: '#fffbeb' }, className: 'bg-amber-50 border-amber-200', layout: 'polaroid' },
  { id: 'emerald', name: 'Emerald', thumbnail: '💚', description: 'Hijau emerald premium', colors: { primary: '#10b981', secondary: '#022c22', accent: '#34d399', bg: '#001a12' }, className: 'bg-gradient-to-br from-black via-emerald-950 to-zinc-900 border-emerald-500/30', layout: 'grid' },
  { id: 'showcase', name: 'Showcase', thumbnail: '✨', description: 'Fokus 1-3 highlight', colors: { primary: '#FFD700', secondary: '#000000', accent: '#FFFFFF', bg: '#0a0a0a' }, className: 'bg-gradient-to-br from-zinc-950 to-black border-yellow-500/20', layout: 'showcase' },
  { id: 'neon-grid', name: 'Neon Grid', thumbnail: '🟪', description: 'Grid tron neon', colors: { primary: '#a855f7', secondary: '#0f0a1a', accent: '#22d3ee', bg: '#0a0a0a' }, className: 'bg-black border-purple-500/30 relative overflow-hidden', layout: 'grid' },
  { id: 'catalog', name: 'Catalog', thumbnail: '📚', description: 'Katalog premium rapi', colors: { primary: '#e5e7eb', secondary: '#111827', accent: '#9ca3af', bg: '#030712' }, className: 'bg-zinc-950 border-zinc-700', layout: 'catalog' },
  { id: 'sakura', name: 'Sakura', thumbnail: '🌸', description: 'Pink Jepang anime', colors: { primary: '#f472b6', secondary: '#1a0011', accent: '#f9a8d4', bg: '#1a0011' }, className: 'bg-gradient-to-br from-pink-950 via-slate-950 to-rose-950 border-pink-400/30', layout: 'grid' },
  { id: 'manga', name: 'Manga', thumbnail: '📖', description: 'Hitam putih manga', colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#a3a3a3', bg: '#000000' }, className: 'bg-white text-black border-black', layout: 'grid' },
  { id: 'gacha', name: 'Gacha', thumbnail: '🎲', description: 'Colorful gacha vibe', colors: { primary: '#facc15', secondary: '#581c87', accent: '#22c55e', bg: '#3b0764' }, className: 'bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 border-white/20', layout: 'grid' },
]

export const backgrounds = [
  { id: 'dark', name: 'Dark', style: 'bg-black' },
  { id: 'gold', name: 'Gold', style: 'bg-gradient-to-br from-yellow-900 to-black' },
  { id: 'blue', name: 'Blue', style: 'bg-gradient-to-br from-blue-900 to-slate-950' },
  { id: 'purple', name: 'Purple', style: 'bg-gradient-to-br from-purple-900 to-black' },
  { id: 'green', name: 'Green', style: 'bg-gradient-to-br from-emerald-900 to-black' },
  { id: 'gradient', name: 'Gradient', style: 'bg-gradient-to-br from-violet-600 to-indigo-600' },
  { id: 'neon', name: 'Neon', style: 'bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500' },
  { id: 'anime', name: 'Anime', style: 'bg-gradient-to-br from-pink-500 to-rose-900' },
  { id: 'abstract', name: 'Abstract', style: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-700 to-black' },
] as const
