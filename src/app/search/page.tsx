'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Users, Calendar } from 'lucide-react';
import { Team, Match } from '@/types';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      fetch('/api/teams').then(r => r.json()).then(d => setTeams(d));
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setTeams(data.teams || []);
      setMatches(data.matches || []);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Buscar</h1>
      <p className="text-slate-400 mb-6">Encontre times, partidas e campeonatos</p>

      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-colors mb-8">
        <Search className="ml-4 w-5 h-5 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Flamengo, Real Madrid, Brasileirão..."
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none px-3 py-3 text-sm"
          autoFocus
        />
        {loading && <LoadingSpinner size="sm" className="mr-4" />}
      </div>

      {teams.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Times</h2>
            <span className="text-sm text-slate-500">({teams.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <Link key={team.id} href={`/team/${team.id}`}>
                <div className="bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl p-4 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center text-sm font-bold text-white">
                      {team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{team.name}</p>
                      <p className="text-xs text-slate-500">{team.league} · {team.country}</p>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-400 mt-3 font-medium">Ver análise completa →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {matches.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Partidas</h2>
            <span className="text-sm text-slate-500">({matches.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matches.map((match) => (
              <Link key={match.id} href={`/match/${match.id}`}>
                <div className="bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-4 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={match.status === 'live' ? 'live' : 'default'} size="sm">
                      {match.status === 'live' ? 'Ao Vivo' : match.status === 'finished' ? 'Encerrado' : 'Programado'}
                    </Badge>
                    <span className="text-xs text-slate-500">{match.competition}</span>
                  </div>
                  <p className="font-semibold text-white">
                    {match.homeTeam.name} × {match.awayTeam.name}
                  </p>
                  <p className="text-xs text-blue-400 mt-2 font-medium">Ver análise →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!loading && query && teams.length === 0 && matches.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg">Nenhum resultado para &quot;{query}&quot;</p>
          <p className="text-slate-500 text-sm mt-2">Tente buscar por outro nome ou campeonato</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20"><LoadingSpinner size="lg" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
