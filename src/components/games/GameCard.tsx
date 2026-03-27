import Link from 'next/link';
import { Match } from '@/types';
import Badge from '@/components/ui/Badge';
import { Clock, ChevronRight } from 'lucide-react';

interface GameCardProps {
  match: Match;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
}

export default function GameCard({ match }: GameCardProps) {
  const statusVariant =
    match.status === 'live' ? 'live' : match.status === 'finished' ? 'default' : 'info';
  const statusLabel =
    match.status === 'live' ? 'Ao Vivo' : match.status === 'finished' ? 'Encerrado' : 'Programado';

  return (
    <Link href={`/match/${match.id}`}>
      <div className="bg-slate-800 border border-slate-700 hover:border-emerald-500/40 rounded-xl p-5 transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
          <span className="text-xs text-slate-500">{match.competition}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {match.homeTeam.name.slice(0, 2)}
              </div>
              <span className="font-semibold text-white">{match.homeTeam.name}</span>
            </div>
            {match.homeScore !== undefined ? (
              <span className="text-2xl font-bold text-white">{match.homeScore}</span>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {match.awayTeam.name.slice(0, 2)}
              </div>
              <span className="font-semibold text-white">{match.awayTeam.name}</span>
            </div>
            {match.awayScore !== undefined ? (
              <span className="text-2xl font-bold text-white">{match.awayScore}</span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(match.date)} · {formatTime(match.date)}</span>
          </div>
          <span className="text-xs text-emerald-400 group-hover:text-emerald-300 font-medium flex items-center gap-1">
            Análise <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
