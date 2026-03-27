import { Team } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';
import { generateScoreCard } from '@/lib/analysis-engine';

interface OpponentQualityProps {
  opponent: Team;
}

export default function OpponentQuality({ opponent }: OpponentQualityProps) {
  const scoreCard = generateScoreCard(opponent);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">Qualidade do Adversário</h3>
      <p className="text-white font-semibold mb-4">{opponent.name}</p>
      <div className="space-y-3">
        <ProgressBar value={scoreCard.offensiveStrength} max={10} label="Força Ofensiva" colorScheme="green" />
        <ProgressBar value={scoreCard.defensiveStability} max={10} label="Estabilidade Defensiva" colorScheme="blue" />
        <ProgressBar value={scoreCard.recentConsistency} max={10} label="Consistência Recente" colorScheme="auto" />
      </div>
    </div>
  );
}
