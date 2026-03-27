import { TeamStats } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendsProps {
  stats: TeamStats[];
  teamName: string;
}

export default function Trends({ stats, teamName }: TrendsProps) {
  const last30 = stats.find((s) => s.period === 'last30');
  const last90 = stats.find((s) => s.period === 'last90');

  if (!last30 || !last90) return null;

  const m30 = last30.wins + last30.draws + last30.losses || 1;
  const m90 = last90.wins + last90.draws + last90.losses || 1;

  const ppg30 = (last30.wins * 3 + last30.draws) / m30;
  const ppg90 = (last90.wins * 3 + last90.draws) / m90;
  const diff = ppg30 - ppg90;

  const TrendIcon = diff > 0.2 ? TrendingUp : diff < -0.2 ? TrendingDown : Minus;
  const trendColor = diff > 0.2 ? 'text-emerald-400' : diff < -0.2 ? 'text-red-400' : 'text-yellow-400';
  const trendLabel = diff > 0.2 ? 'Em alta' : diff < -0.2 ? 'Em queda' : 'Estável';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Tendências</h3>
      <div className="flex items-center gap-3 mb-4">
        <TrendIcon className={`w-6 h-6 ${trendColor}`} />
        <div>
          <p className={`font-semibold ${trendColor}`}>{trendLabel}</p>
          <p className="text-xs text-slate-500">Comparando últimos 30 vs 90 dias</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-700/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Últ. 30 dias</p>
          <p className="text-white font-semibold">{ppg30.toFixed(2)} pts/jogo</p>
          <p className="text-slate-500 text-xs">{last30.wins}V {last30.draws}E {last30.losses}D</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Últ. 90 dias</p>
          <p className="text-white font-semibold">{ppg90.toFixed(2)} pts/jogo</p>
          <p className="text-slate-500 text-xs">{last90.wins}V {last90.draws}E {last90.losses}D</p>
        </div>
      </div>
    </div>
  );
}
