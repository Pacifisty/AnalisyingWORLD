import { InjuryNews } from '@/types';
import Badge from '@/components/ui/Badge';
import { AlertTriangle, Ban, HelpCircle } from 'lucide-react';

interface CurrentContextProps {
  injuries: InjuryNews[];
}

const typeConfig = {
  injury: { label: 'Lesão', variant: 'danger' as const, Icon: AlertTriangle },
  suspension: { label: 'Suspensão', variant: 'warning' as const, Icon: Ban },
  doubt: { label: 'Dúvida', variant: 'info' as const, Icon: HelpCircle },
};

export default function CurrentContext({ injuries }: CurrentContextProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Contexto Atual</h3>
      {injuries.length === 0 ? (
        <p className="text-slate-500 text-sm">Nenhuma baixa confirmada.</p>
      ) : (
        <div className="space-y-3">
          {injuries.map((item) => {
            const cfg = typeConfig[item.type];
            return (
              <div key={item.id} className="flex items-start gap-3">
                <cfg.Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white leading-snug">{item.description}</p>
                </div>
                <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
