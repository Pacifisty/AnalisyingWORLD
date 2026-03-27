import { notFound } from 'next/navigation';
import { getTeamById } from '@/lib/mock-data';
import { analyzeTeam } from '@/lib/analysis-engine';
import AnalysisCard from '@/components/analysis/AnalysisCard';
import Trends from '@/components/analysis/Trends';
import { MapPin, Trophy, TrendingUp } from 'lucide-react';

interface TeamPageProps {
  params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const team = getTeamById(params.id);
  if (!team) notFound();

  const analysis = await analyzeTeam(team);
  const recent = team.stats?.find((s) => s.period === 'last30');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {team.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-white">{team.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />{team.country}
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />{team.league}
              </span>
              {recent && (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  {recent.wins}V {recent.draws}E {recent.losses}D (últ. 30d)
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 mb-1">Score Geral</p>
            <p className="text-4xl font-extrabold text-emerald-400">{analysis.overallScore.toFixed(1)}</p>
            <p className="text-xs text-slate-500">de 10</p>
          </div>
        </div>
      </div>

      <AnalysisCard analysis={analysis} team={team} />

      {team.stats && team.stats.length >= 2 && (
        <div className="mt-4">
          <Trends stats={team.stats} teamName={team.name} />
        </div>
      )}
    </div>
  );
}
