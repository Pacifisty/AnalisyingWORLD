import { notFound } from 'next/navigation';
import { getMatchById } from '@/lib/mock-data';
import { analyzeMatch } from '@/lib/analysis-engine';
import { generateScoreCard } from '@/lib/analysis-engine';
import AIAnalysisText from '@/components/analysis/AIAnalysisText';
import ScoreCard from '@/components/analysis/ScoreCard';
import ConfidenceLevel from '@/components/analysis/ConfidenceLevel';
import HeadToHead from '@/components/analysis/HeadToHead';
import Badge from '@/components/ui/Badge';
import { mockMatches } from '@/lib/mock-data';
import { Calendar } from 'lucide-react';

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = getMatchById(params.id);
  if (!match) notFound();
  const analysis = await analyzeMatch(match);
  const homeScore = generateScoreCard(match.homeTeam);
  const awayScore = generateScoreCard(match.awayTeam);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant={match.status === 'live' ? 'live' : match.status === 'finished' ? 'default' : 'info'}>
            {match.status === 'live' ? 'Ao Vivo' : match.status === 'finished' ? 'Encerrado' : 'Programado'}
          </Badge>
          <span className="text-slate-400 text-sm">{match.competition}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center text-center">
          <div>
            <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-2">{match.homeTeam.name.slice(0,2)}</div>
            <p className="font-bold text-white text-lg">{match.homeTeam.name}</p>
            <p className="text-xs text-slate-500">{match.homeTeam.league}</p>
          </div>
          <div>
            {match.status === 'finished' || match.status === 'live' ? (
              <p className="text-4xl font-extrabold text-white">{match.homeScore ?? 0} × {match.awayScore ?? 0}</p>
            ) : (
              <div>
                <p className="text-2xl font-bold text-slate-500">VS</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1"><Calendar className="w-3 h-3"/>{new Date(match.date).toLocaleDateString('pt-BR')}</p>
              </div>
            )}
          </div>
          <div>
            <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-2">{match.awayTeam.name.slice(0,2)}</div>
            <p className="font-bold text-white text-lg">{match.awayTeam.name}</p>
            <p className="text-xs text-slate-500">{match.awayTeam.league}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div><p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{match.homeTeam.name}</p><ScoreCard scoreCard={homeScore}/></div>
        <div><p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{match.awayTeam.name}</p><ScoreCard scoreCard={awayScore}/></div>
      </div>
      <div className="space-y-4">
        <HeadToHead homeTeamName={match.homeTeam.name} awayTeamName={match.awayTeam.name} matches={mockMatches.filter(m=>m.status==='finished')} />
        <AIAnalysisText text={analysis.aiText}/>
        <ConfidenceLevel confidence={analysis.confidence}/>
      </div>
    </div>
  );
}
