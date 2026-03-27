import clsx from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  colorScheme?: 'green' | 'blue' | 'yellow' | 'red' | 'auto';
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  colorScheme = 'auto',
  size = 'md',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const autoColor =
    pct >= 70 ? 'green' : pct >= 40 ? 'blue' : pct >= 20 ? 'yellow' : 'red';
  const color = colorScheme === 'auto' ? autoColor : colorScheme;

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-slate-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-slate-300">
              {value.toFixed(1)}{max === 100 ? '%' : `/${max}`}
            </span>
          )}
        </div>
      )}
      <div
        className={clsx(
          'w-full bg-slate-700 rounded-full overflow-hidden',
          size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2'
        )}
      >
        <div
          className={clsx('h-full rounded-full transition-all duration-500', {
            'bg-emerald-500': color === 'green',
            'bg-blue-500': color === 'blue',
            'bg-yellow-500': color === 'yellow',
            'bg-red-500': color === 'red',
          })}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
