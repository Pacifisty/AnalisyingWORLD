import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'live';
  size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-semibold rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        {
          'bg-emerald-500/20 text-emerald-400': variant === 'success',
          'bg-yellow-500/20 text-yellow-400': variant === 'warning',
          'bg-red-500/20 text-red-400': variant === 'danger',
          'bg-blue-500/20 text-blue-400': variant === 'info',
          'bg-slate-600/50 text-slate-300': variant === 'default',
          'bg-red-500 text-white animate-pulse': variant === 'live',
        }
      )}
    >
      {variant === 'live' && <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5" />}
      {children}
    </span>
  );
}
