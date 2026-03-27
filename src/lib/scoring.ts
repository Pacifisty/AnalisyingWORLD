import { TeamStats, InjuryNews } from '@/types';

export function calculateOffensiveStrength(stats: TeamStats[]): number {
  if (!stats.length) return 5;
  const totalWeight = stats.reduce((acc, s) => acc + getWeight(s.period), 0);
  const weighted = stats.reduce((acc, s) => {
    const matches = s.wins + s.draws + s.losses || 1;
    return acc + (s.goalsScored / matches) * getWeight(s.period);
  }, 0);
  const avg = weighted / totalWeight;
  return Math.min(10, Math.max(0, Math.round(avg * 3.33 * 10) / 10));
}

export function calculateDefensiveStability(stats: TeamStats[]): number {
  if (!stats.length) return 5;
  const totalWeight = stats.reduce((acc, s) => acc + getWeight(s.period), 0);
  const weighted = stats.reduce((acc, s) => {
    const matches = s.wins + s.draws + s.losses || 1;
    return acc + (s.goalsConceded / matches) * getWeight(s.period);
  }, 0);
  const avg = weighted / totalWeight;
  return Math.min(10, Math.max(0, Math.round((10 - avg * 3.33) * 10) / 10));
}

export function calculateRecentConsistency(stats: TeamStats[]): number {
  if (!stats.length) return 5;
  const recent = stats.find((s) => s.period === 'last30') || stats[0];
  const matches = recent.wins + recent.draws + recent.losses || 1;
  const points = (recent.wins * 3 + recent.draws) / (matches * 3);
  return Math.min(10, Math.max(0, Math.round(points * 10 * 10) / 10));
}

export function calculateUnpredictabilityRisk(stats: TeamStats[], injuries: InjuryNews[]): number {
  let risk = 5;
  const recent = stats.find((s) => s.period === 'last30');
  const older = stats.find((s) => s.period === 'last90');
  if (recent && older) {
    const rm = recent.wins + recent.draws + recent.losses || 1;
    const om = older.wins + older.draws + older.losses || 1;
    const rPPG = (recent.wins * 3 + recent.draws) / rm;
    const oPPG = (older.wins * 3 + older.draws) / om;
    risk = Math.min(10, 3 + Math.abs(rPPG - oPPG) * 5);
  }
  const injuryPenalty = injuries.filter((i) => i.type === 'injury').length * 0.5;
  const suspPenalty = injuries.filter((i) => i.type === 'suspension').length * 0.7;
  return Math.min(10, Math.max(0, Math.round((risk + injuryPenalty + suspPenalty) * 10) / 10));
}

function getWeight(period: string): number {
  if (period === 'last30') return 3;
  if (period === 'last90') return 2;
  return 1;
}
