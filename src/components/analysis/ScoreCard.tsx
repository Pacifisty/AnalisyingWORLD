import { ScoreCard as ScoreCardType } from '@/types';
import clsx from 'clsx';

interface ScoreCardProps {
  scoreCard: ScoreCardType;
}

interface MetricProps {
  label: string;
  value: number;
  description: string;
  inverse?: boolean;
}

function Metric({ label, value, description, inverse = false }: MetricProps) {
  const normalizedValue = inverse ? 10 - value : value;
  const color =
    normalizedValue >= 7 ? 'emerald' : normalizedValue >= 4 ? 'blue' : 'red';

  const colorMap = {
    emerald: {
      ring: 'stroke-emerald-500',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    blue: {
      ring: 'stroke-blue-500',
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    red: {
      ring: 'stroke-red-500',
      text: 'text-red-400',
      bg: 'bg-red-500/10',
    },
  };
  const c = colorMap[color];
  const pct = (value / 10) * 100;
  const circumference = 2 * Math.PI * 28;
  const dashOffset = circumference - (circumference * pct) / 100;

  return (
    <div className={clsx('rounded-xl p-4 flex flex-col items-center text-center', c.bg)}>
      <div className="relative w-16 h-16 mb-2">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={c.ring}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={clsx('text-sm font-bold', c.text)}>{value.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-white leading-tight">{label}</p>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>
  );
}

export default function ScoreCard({ scoreCard }: ScoreCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Score de Desempenho</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metric
          label="Força Ofensiva"
          value={scoreCard.offensiveStrength}
          description="Capacidade de gol"
        />
        <Metric
          label="Estabilidade Def."
          value={scoreCard.defensiveStability}
          description="Solidez atrás"
        />
        <Metric
          label="Consistência"
          value={scoreCard.recentConsistency}
          description="Últimos 30 dias"
        />
        <Metric
          label="Risco"
          value={scoreCard.unpredictabilityRisk}
          description="Imprevisibilidade"
          inverse
        />
      </div>
    </div>
  );
}
