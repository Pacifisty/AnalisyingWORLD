import Link from 'next/link';
import { mockTeams } from '@/lib/mock-data';
import { generateScoreCard } from '@/lib/analysis-engine';
import ProgressBar from '@/components/ui/ProgressBar';
import { TrendingUp } from 'lucide-react';

export default function PopularAnalyses() {
  const teams = mockTeams.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Análises Populares</h2>
          <p className="text-slate-400 text-sm mt-1">Times mais analisados pelos usuários</p>
        </div>
        <Link href="/search" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => {
          const scoreCard = generateScoreCard(team);
          const overall = ((scoreCard.offensiveStrength + scoreCard.defensiveStability + scoreCard.recentConsistency) / 3);

          return (
            <Link key={team.id} href={`/team/${team.id}`}>
              <div className="bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-5 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center text-sm font-bold text-white">
                      {team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{team.name}</h3>
                      <p className="text-xs text-slate-500">{team.league}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-500/10 rounded-lg px-2 py-1">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400">{overall.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <ProgressBar
                    value={scoreCard.offensiveStrength}
                    max={10}
                    label="Ataque"
                    colorScheme="green"
                  />
                  <ProgressBar
                    value={scoreCard.defensiveStability}
                    max={10}
                    label="Defesa"
                    colorScheme="blue"
                  />
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-blue-400 group-hover:text-blue-300 font-medium">
                  Análise completa →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
