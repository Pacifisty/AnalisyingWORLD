import clsx from 'clsx';
import { ShieldCheck } from 'lucide-react';

interface ConfidenceLevelProps {
  confidence: number;
}

export default function ConfidenceLevel({ confidence }: ConfidenceLevelProps) {
  const level =
    confidence >= 80 ? 'Alta' : confidence >= 60 ? 'Média' : 'Baixa';
  const colorClass =
    confidence >= 80 ? 'text-emerald-400' : confidence >= 60 ? 'text-yellow-400' : 'text-red-400';
  const barColor =
    confidence >= 80 ? 'bg-emerald-500' : confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Nível de Confiança</h3>
        </div>
        <span className={clsx('text-sm font-bold', colorClass)}>
          {level} — {confidence.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-700', barColor)}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Baseado na quantidade e qualidade dos dados disponíveis dos últimos 6 meses.
      </p>
    </div>
  );
}
