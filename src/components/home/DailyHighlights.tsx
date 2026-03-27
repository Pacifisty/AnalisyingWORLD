import Link from 'next/link';
import { mockMatches } from '@/lib/mock-data';
import Badge from '@/components/ui/Badge';
import { Clock } from 'lucide-react';

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
}

export default function DailyHighlights() {
  const highlighted = mockMatches.filter((m) => m.status === 'live' || m.status === 'scheduled').slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Destaques do Dia</h2>
          <p className="text-slate-400 text-sm mt-1">Partidas em destaque com análise da IA</p>
        </div>
        <Link href="/games" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlighted.map((match) => (
          <Link key={match.id} href={`/match/${match.id}`}>
            <div className="bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl p-4 transition-all hover:bg-slate-750 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={match.status === 'live' ? 'live' : 'default'} size="sm">
                  {match.status === 'live' ? 'Ao Vivo' : match.status === 'scheduled' ? 'Programado' : 'Encerrado'}
                </Badge>
                <span className="text-xs text-slate-500">{match.competition.split(' ')[0]}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white truncate">{match.homeTeam.name}</span>
                  {match.homeScore !== undefined ? (
                    <span className="text-lg font-bold text-white ml-2">{match.homeScore}</span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white truncate">{match.awayTeam.name}</span>
                  {match.awayScore !== undefined ? (
                    <span className="text-lg font-bold text-white ml-2">{match.awayScore}</span>
                  ) : null}
                </div>
              </div>

              {match.status === 'scheduled' && (
                <div className="flex items-center gap-1.5 mt-3 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{formatTime(match.date)}</span>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-emerald-400 group-hover:text-emerald-300 font-medium">
                Ver análise →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
