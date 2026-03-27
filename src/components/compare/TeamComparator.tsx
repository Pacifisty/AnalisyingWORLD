'use client';

import { useState } from 'react';
import { Team } from '@/types';
import { mockTeams } from '@/lib/mock-data';
import { generateScoreCard } from '@/lib/analysis-engine';
import ProgressBar from '@/components/ui/ProgressBar';
import { ChevronDown } from 'lucide-react';

interface TeamSelectorProps {
  label: string;
  selected: Team | null;
  onSelect: (t: Team) => void;
}

function TeamSelector({ label, selected, onSelect }: TeamSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">{label}</p>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-xl px-4 py-3 text-left transition-colors"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {selected.name.slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{selected.name}</p>
              <p className="text-xs text-slate-400">{selected.league}</p>
            </div>
          </div>
        ) : (
          <span className="text-slate-400 text-sm">Selecionar time...</span>
        )}
        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-auto max-h-60">
          {mockTeams.map((t) => (
            <button
              key={t.id}
              onClick={() => { onSelect(t); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 text-left transition-colors"
            >
              <div className="w-7 h-7 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {t.name.slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.league}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface MetricRowProps {
  label: string;
  a: number;
  b: number;
  max?: number;
}

function MetricRow({ label, a, b, max = 10 }: MetricRowProps) {
  const aWins = a > b;
  const bWins = b > a;

  return (
    <div className="py-3 border-b border-slate-700 last:border-0">
      <p className="text-xs text-slate-400 text-center mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-3 items-center">
        <div className="text-right">
          <span className={`text-lg font-bold ${aWins ? 'text-emerald-400' : 'text-white'}`}>
            {a.toFixed(1)}
          </span>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${aWins ? 'bg-emerald-500' : 'bg-slate-500'}`}
              style={{ width: `${(a / max) * 100}%`, marginLeft: 'auto' }}
            />
          </div>
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${bWins ? 'bg-blue-500' : 'bg-slate-500'}`}
              style={{ width: `${(b / max) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-left">
          <span className={`text-lg font-bold ${bWins ? 'text-blue-400' : 'text-white'}`}>
            {b.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TeamComparator() {
  const [teamA, setTeamA] = useState<Team | null>(null);
  const [teamB, setTeamB] = useState<Team | null>(null);

  const scoreA = teamA ? generateScoreCard(teamA) : null;
  const scoreB = teamB ? generateScoreCard(teamB) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TeamSelector label="Time A" selected={teamA} onSelect={setTeamA} />
        <TeamSelector label="Time B" selected={teamB} onSelect={setTeamB} />
      </div>

      {scoreA && scoreB && teamA && teamB ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-sm font-bold text-emerald-400 mx-auto mb-2">
                {teamA.name.slice(0, 2)}
              </div>
              <p className="text-sm font-semibold text-white">{teamA.name}</p>
              <p className="text-xs text-slate-500">{teamA.league}</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-slate-600 font-bold text-2xl">VS</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-sm font-bold text-blue-400 mx-auto mb-2">
                {teamB.name.slice(0, 2)}
              </div>
              <p className="text-sm font-semibold text-white">{teamB.name}</p>
              <p className="text-xs text-slate-500">{teamB.league}</p>
            </div>
          </div>

          <MetricRow label="Força Ofensiva" a={scoreA.offensiveStrength} b={scoreB.offensiveStrength} />
          <MetricRow label="Estabilidade Defensiva" a={scoreA.defensiveStability} b={scoreB.defensiveStability} />
          <MetricRow label="Consistência Recente" a={scoreA.recentConsistency} b={scoreB.recentConsistency} />
          <MetricRow label="Risco de Imprevisibilidade" a={scoreA.unpredictabilityRisk} b={scoreB.unpredictabilityRisk} />

          <div className="mt-6 grid grid-cols-2 gap-4">
            {([
              { label: 'Gols Marcados (últ. 30d)', a: teamA.stats?.find(s=>s.period==='last30')?.goalsScored ?? 0, b: teamB.stats?.find(s=>s.period==='last30')?.goalsScored ?? 0, max: 20 },
              { label: 'Gols Sofridos (últ. 30d)', a: teamA.stats?.find(s=>s.period==='last30')?.goalsConceded ?? 0, b: teamB.stats?.find(s=>s.period==='last30')?.goalsConceded ?? 0, max: 20 },
            ] as { label: string; a: number; b: number; max: number }[]).map(m => (
              <div key={m.label} className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-2">{m.label}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">{m.a}</span>
                  <ProgressBar value={(m.a / (m.a + m.b)) * 100} max={100} showValue={false} colorScheme="green" size="sm" />
                  <span className="font-bold text-blue-400">{m.b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 border-dashed rounded-xl p-12 text-center">
          <p className="text-slate-500">Selecione dois times para comparar</p>
        </div>
      )}
    </div>
  );
}
