import { TeamStats } from '@/types';

interface HomeAwayStatsProps {
  stats: TeamStats[];
}

interface StatRow {
  label: string;
  home: number | string;
  away: number | string;
}

export default function HomeAwayStats({ stats }: HomeAwayStatsProps) {
  const recent = stats.find((s) => s.period === 'last30') || stats[0];
  if (!recent) return null;

  const total = recent.wins + recent.draws + recent.losses || 1;
  // Simulate home/away split (home better)
  const homeWins = Math.ceil(recent.wins * 0.6);
  const awayWins = recent.wins - homeWins;
  const homeGoals = Math.ceil(recent.goalsScored * 0.6);
  const awayGoals = recent.goalsScored - homeGoals;

  const rows: StatRow[] = [
    { label: 'Vitórias', home: homeWins, away: awayWins },
    { label: 'Empates', home: Math.ceil(recent.draws * 0.5), away: Math.floor(recent.draws * 0.5) },
    { label: 'Gols Marcados', home: homeGoals, away: awayGoals },
    { label: 'Gols Sofridos', home: Math.floor(recent.goalsConceded * 0.4), away: Math.ceil(recent.goalsConceded * 0.6) },
    { label: 'Jogos', home: Math.ceil(total / 2), away: Math.floor(total / 2) },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Casa vs Fora</h3>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center text-xs font-semibold text-blue-400">CASA</div>
        <div className="text-center text-xs text-slate-500">Estatística</div>
        <div className="text-center text-xs font-semibold text-orange-400">FORA</div>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-3 gap-2 items-center">
            <div className="text-center text-lg font-bold text-white">{row.home}</div>
            <div className="text-center text-xs text-slate-400">{row.label}</div>
            <div className="text-center text-lg font-bold text-white">{row.away}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
