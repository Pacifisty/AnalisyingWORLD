export interface Team {
  id: string;
  name: string;
  country: string;
  league: string;
  logo?: string;
  stats?: TeamStats[];
  injuries?: InjuryNews[];
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  competition: string;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'finished';
}

export interface TeamStats {
  id: string;
  teamId: string;
  period: 'last30' | 'last90' | 'last180';
  goalsScored: number;
  goalsConceded: number;
  avgShots: number;
  avgCorners: number;
  wins: number;
  draws: number;
  losses: number;
}

export interface InjuryNews {
  id: string;
  teamId: string;
  type: 'injury' | 'suspension' | 'doubt';
  description: string;
  date: string;
}

export interface Analysis {
  id: string;
  matchId?: string;
  teamId?: string;
  overallScore: number;
  aiText: string;
  confidence: number;
  createdAt: string;
  scoreCard?: ScoreCard;
}

export interface ScoreCard {
  offensiveStrength: number;
  defensiveStability: number;
  recentConsistency: number;
  unpredictabilityRisk: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
}

export interface HeadToHeadRecord {
  homeWins: number;
  awayWins: number;
  draws: number;
  recentMatches: Match[];
}

export interface SearchResult {
  teams: Team[];
  matches: Match[];
}
