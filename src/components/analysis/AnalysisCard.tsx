import { Analysis, Team } from '@/types';
import ScoreCard from './ScoreCard';
import AIAnalysisText from './AIAnalysisText';
import ConfidenceLevel from './ConfidenceLevel';
import RecentForm from './RecentForm';
import HomeAwayStats from './HomeAwayStats';
import AttackDefenseStats from './AttackDefenseStats';
import CurrentContext from './CurrentContext';

interface AnalysisCardProps {
  analysis: Analysis;
  team: Team;
}

export default function AnalysisCard({ analysis, team }: AnalysisCardProps) {
  const recent = team.stats?.find((s) => s.period === 'last30') || team.stats?.[0];

  return (
    <div className="space-y-4">
      {analysis.scoreCard && <ScoreCard scoreCard={analysis.scoreCard} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recent && (
          <RecentForm
            wins={recent.wins}
            draws={recent.draws}
            losses={recent.losses}
          />
        )}
        {team.stats && team.stats.length > 0 && (
          <HomeAwayStats stats={team.stats} />
        )}
      </div>

      {team.stats && team.stats.length > 0 && (
        <AttackDefenseStats stats={team.stats} />
      )}

      <CurrentContext injuries={team.injuries || []} />

      <AIAnalysisText text={analysis.aiText} />

      <ConfidenceLevel confidence={analysis.confidence} />
    </div>
  );
}
