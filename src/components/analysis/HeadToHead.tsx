import { Match } from '@/types';

interface HeadToHeadProps {
  homeTeamName: string;
  awayTeamName: string;
  matches: Match[];
}

export default function HeadToHead({ homeTeamName, awayTeamName, matches }: HeadToHeadProps) {
  const finished = matches.filter((m) => m.status === 'finished');
  const homeWins = finished.filter(
    (m) => m.homeTeam.name === homeTeamName && (m.homeScore ?? 0) > (m.awayScore ?? 0)
      || m.awayTeam.name === homeTeamName && (m.awayScore ?? 0) > (m.homeScore ?? 0)
  ).length;
  const awayWins = finished.filter(
    (m) => m.homeTeam.name === awayTeamName && (m.homeScore ?? 0) > (m.awayScore ?? 0)
      || m.awayTeam.name === awayTeamName && (m.awayScore ?? 0) > (m.homeScore ?? 0)
  ).length;
  const draws = finished.length - homeWins - awayWins;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Histórico de Confrontos</h3>
      {finished.length === 0 ? (
        <p className="text-slate-500 text-sm">Sem histórico recente disponível.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{homeWins}</p>
              <p className="text-xs text-slate-500">{homeTeamName}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-400">{draws}</p>
              <p className="text-xs text-slate-500">Empates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{awayWins}</p>
              <p className="text-xs text-slate-500">{awayTeamName}</p>
            </div>
          </div>
          <div className="space-y-2">
            {finished.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center justify-between text-sm py-2 border-t border-slate-700">
                <span className="text-slate-400 text-xs">{new Date(m.date).toLocaleDateString('pt-BR')}</span>
                <span className="font-medium text-white">
                  {m.homeTeam.name} {m.homeScore} × {m.awayScore} {m.awayTeam.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
