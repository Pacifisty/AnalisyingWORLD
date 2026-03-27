import { Team, Match, Analysis, ScoreCard } from '@/types';
import {
  calculateOffensiveStrength,
  calculateDefensiveStability,
  calculateRecentConsistency,
  calculateUnpredictabilityRisk,
} from './scoring';
import { generateTeamAnalysis, generateMatchAnalysis } from './openai';

export function generateScoreCard(team: Team): ScoreCard {
  const stats = team.stats || [];
  const injuries = team.injuries || [];
  return {
    offensiveStrength: calculateOffensiveStrength(stats),
    defensiveStability: calculateDefensiveStability(stats),
    recentConsistency: calculateRecentConsistency(stats),
    unpredictabilityRisk: calculateUnpredictabilityRisk(stats, injuries),
  };
}

export async function analyzeTeam(team: Team): Promise<Analysis> {
  const stats = team.stats || [];
  const scoreCard = generateScoreCard(team);

  const recentStats = stats.find((s) => s.period === 'last30');
  const recentForm: string[] = [];
  if (recentStats) {
    for (let i = 0; i < recentStats.wins; i++) recentForm.push('V');
    for (let i = 0; i < recentStats.draws; i++) recentForm.push('E');
    for (let i = 0; i < recentStats.losses; i++) recentForm.push('D');
    recentForm.sort(() => Math.random() - 0.5);
  }

  const aiText = await generateTeamAnalysis(team, scoreCard, recentForm.slice(0, 6));
  const overallScore = (scoreCard.offensiveStrength + scoreCard.defensiveStability + scoreCard.recentConsistency) / 3;
  const confidence = Math.min(95, 50 + stats.length * 10 + (team.injuries?.length === 0 ? 10 : 0));

  return {
    id: `analysis-team-${team.id}`,
    teamId: team.id,
    overallScore: Math.round(overallScore * 10) / 10,
    aiText,
    confidence,
    createdAt: new Date().toISOString(),
    scoreCard,
  };
}

export async function analyzeMatch(match: Match): Promise<Analysis> {
  const homeScoreCard = generateScoreCard(match.homeTeam);
  const awayScoreCard = generateScoreCard(match.awayTeam);

  const aiText = await generateMatchAnalysis(match, homeScoreCard, awayScoreCard);
  const overallScore = (homeScoreCard.offensiveStrength + awayScoreCard.offensiveStrength) / 2;
  const homeStats = match.homeTeam.stats || [];
  const awayStats = match.awayTeam.stats || [];
  const confidence = Math.min(95, 60 + (homeStats.length + awayStats.length) * 5);

  return {
    id: `analysis-match-${match.id}`,
    matchId: match.id,
    overallScore: Math.round(overallScore * 10) / 10,
    aiText,
    confidence,
    createdAt: new Date().toISOString(),
    scoreCard: homeScoreCard,
  };
}
