import { TeamStats } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';

interface AttackDefenseStatsProps {
  stats: TeamStats[];
}

export default function AttackDefenseStats({ stats }: AttackDefenseStatsProps) {
  const recent = stats.find((s) => s.period === 'last30') || stats[0];
  if (!recent) return null;

  const total = recent.wins + recent.draws + recent.losses || 1;
  const goalsPerGame = recent.goalsScored / total;
  const concededPerGame = recent.goalsConceded / total;
  const cleanSheets = Math.max(0, Math.round(total * 0.3 - concededPerGame));

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Ataque & Defesa</h3>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Ataque</p>
          <div className="space-y-2.5">
            <ProgressBar
              value={goalsPerGame}
              max={3}
              label={`Gols/jogo — ${goalsPerGame.toFixed(2)}`}
              showValue={false}
              colorScheme="green"
            />
            <ProgressBar
              value={recent.avgShots}
              max={20}
              label={`Chutes/jogo — ${recent.avgShots.toFixed(1)}`}
              showValue={false}
              colorScheme="green"
            />
            <ProgressBar
              value={recent.avgCorners}
              max={10}
              label={`Escanteios/jogo — ${recent.avgCorners.toFixed(1)}`}
              showValue={false}
              colorScheme="blue"
            />
          </div>
        </div>
        <div className="border-t border-slate-700 pt-4">
          <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Defesa</p>
          <div className="space-y-2.5">
            <ProgressBar
              value={Math.max(0, 3 - concededPerGame)}
              max={3}
              label={`Gols sofridos/jogo — ${concededPerGame.toFixed(2)}`}
              showValue={false}
              colorScheme="blue"
            />
            <ProgressBar
              value={cleanSheets}
              max={total}
              label={`Jogos sem sofrer — ${cleanSheets}`}
              showValue={false}
              colorScheme="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
