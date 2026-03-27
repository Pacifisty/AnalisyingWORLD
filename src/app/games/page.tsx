'use client';
import { useState } from 'react';
import { mockMatches } from '@/lib/mock-data';
import GameCard from '@/components/games/GameCard';
import clsx from 'clsx';

export default function GamesPage() {
  const [filter, setFilter] = useState<'all'|'live'|'scheduled'|'finished'>('all');
  const filtered = filter === 'all' ? mockMatches : mockMatches.filter(m=>m.status===filter);
  const tabs = [{v:'all',l:'Todos'},{v:'live',l:'Ao Vivo'},{v:'scheduled',l:'Programados'},{v:'finished',l:'Encerrados'}] as const;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Jogos</h1>
      <p className="text-slate-400 mb-6">Partidas com análises da IA</p>
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(t=>(
          <button key={t.v} onClick={()=>setFilter(t.v)} className={clsx('px-4 py-2 rounded-lg text-sm font-medium transition-colors',filter===t.v?'bg-emerald-500 text-slate-900':'bg-slate-800 text-slate-400 hover:text-white')}>
            {t.l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m=><GameCard key={m.id} match={m}/>)}
      </div>
    </div>
  );
}
