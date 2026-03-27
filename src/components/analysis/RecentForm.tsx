import clsx from 'clsx';

interface RecentFormProps {
  wins: number;
  draws: number;
  losses: number;
}

export default function RecentForm({ wins, draws, losses }: RecentFormProps) {
  // Build a realistic-ish sequence
  const results: string[] = [];
  for (let i = 0; i < wins; i++) results.push('V');
  for (let i = 0; i < draws; i++) results.push('E');
  for (let i = 0; i < losses; i++) results.push('D');
  // Shuffle deterministically
  const shuffled = results.sort((a, b) => (a > b ? 1 : -1)).slice(0, 6);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Forma Recente</h3>
      <div className="flex gap-2">
        {shuffled.map((r, i) => (
          <div
            key={i}
            className={clsx(
              'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold',
              {
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30': r === 'V',
                'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30': r === 'E',
                'bg-red-500/20 text-red-400 border border-red-500/30': r === 'D',
              }
            )}
          >
            {r}
          </div>
        ))}
        {shuffled.length === 0 && (
          <p className="text-slate-500 text-sm">Sem dados disponíveis</p>
        )}
      </div>
      <div className="flex gap-4 mt-3">
        <span className="text-xs text-emerald-400 font-medium">{wins}V</span>
        <span className="text-xs text-yellow-400 font-medium">{draws}E</span>
        <span className="text-xs text-red-400 font-medium">{losses}D</span>
      </div>
    </div>
  );
}
