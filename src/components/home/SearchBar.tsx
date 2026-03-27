'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Team, Match } from '@/types';

interface SearchResult {
  teams: Team[];
  matches: Match[];
}

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults(null); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch { /* ignore */ }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={handleSearch}>
        <div className={`flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-colors ${large ? 'h-14' : 'h-11'}`}>
          <Search className={`ml-4 text-slate-400 flex-shrink-0 ${large ? 'w-6 h-6' : 'w-5 h-5'}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results && setShowDropdown(true)}
            placeholder="Buscar time, partida ou campeonato..."
            className={`flex-1 bg-transparent text-white placeholder-slate-500 outline-none px-3 ${large ? 'text-lg' : 'text-sm'}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setResults(null); }}
              className="p-2 text-slate-500 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className={`bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold transition-colors flex-shrink-0 ${large ? 'px-6 h-14 text-base' : 'px-4 h-11 text-sm'}`}
          >
            {loading ? '...' : 'Buscar'}
          </button>
        </div>
      </form>

      {showDropdown && results && (results.teams.length > 0 || results.matches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          {results.teams.length > 0 && (
            <div className="p-2">
              <p className="text-xs text-slate-500 font-medium px-2 py-1 uppercase tracking-wide">Times</p>
              {results.teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => { router.push(`/team/${team.id}`); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg text-left transition-colors"
                >
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {team.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{team.name}</p>
                    <p className="text-xs text-slate-400">{team.league} · {team.country}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {results.matches.length > 0 && (
            <div className="p-2 border-t border-slate-700">
              <p className="text-xs text-slate-500 font-medium px-2 py-1 uppercase tracking-wide">Partidas</p>
              {results.matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => { router.push(`/match/${match.id}`); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg text-left transition-colors"
                >
                  <div className="text-slate-400 text-xs">⚽</div>
                  <div>
                    <p className="text-sm font-medium text-white">{match.homeTeam.name} vs {match.awayTeam.name}</p>
                    <p className="text-xs text-slate-400">{match.competition}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
