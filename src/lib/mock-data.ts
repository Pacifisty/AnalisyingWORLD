import { Team, Match, TeamStats, InjuryNews } from '@/types';

const today = new Date();
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000).toISOString();

const makeStats = (
  teamId: string,
  period: 'last30' | 'last90' | 'last180',
  wins: number,
  draws: number,
  losses: number,
  goalsScored: number,
  goalsConceded: number,
  avgShots: number,
  avgCorners: number
): TeamStats => ({
  id: `${teamId}-${period}`,
  teamId,
  period,
  wins,
  draws,
  losses,
  goalsScored,
  goalsConceded,
  avgShots,
  avgCorners,
});

const makeInjury = (
  id: string,
  teamId: string,
  type: 'injury' | 'suspension' | 'doubt',
  description: string
): InjuryNews => ({
  id,
  teamId,
  type,
  description,
  date: addDays(today, -Math.floor(Math.random() * 10)),
});

export const mockTeams: Team[] = [
  {
    id: 'flamengo',
    name: 'Flamengo',
    country: 'Brasil',
    league: 'Brasileirão Série A',
    logo: '/logos/flamengo.png',
    stats: [
      makeStats('flamengo', 'last30', 4, 1, 1, 13, 5, 14.2, 6.1),
      makeStats('flamengo', 'last90', 11, 3, 4, 32, 16, 13.8, 5.9),
      makeStats('flamengo', 'last180', 20, 7, 8, 58, 33, 13.5, 5.7),
    ],
    injuries: [
      makeInjury('inj-fla-1', 'flamengo', 'doubt', 'Gabriel Barbosa - dores musculares, participação duvidosa'),
      makeInjury('inj-fla-2', 'flamengo', 'injury', 'Everton Cebolinha - lesão no joelho, fora por 3 semanas'),
    ],
  },
  {
    id: 'palmeiras',
    name: 'Palmeiras',
    country: 'Brasil',
    league: 'Brasileirão Série A',
    logo: '/logos/palmeiras.png',
    stats: [
      makeStats('palmeiras', 'last30', 3, 2, 1, 9, 5, 13.1, 5.5),
      makeStats('palmeiras', 'last90', 11, 4, 3, 28, 14, 12.9, 5.3),
      makeStats('palmeiras', 'last180', 22, 6, 7, 55, 27, 12.7, 5.2),
    ],
    injuries: [
      makeInjury('inj-pal-1', 'palmeiras', 'suspension', 'Zé Rafael - suspenso por acúmulo de cartões'),
      makeInjury('inj-pal-2', 'palmeiras', 'injury', 'Estêvão - lesão muscular, prazo indefinido'),
    ],
  },
  {
    id: 'corinthians',
    name: 'Corinthians',
    country: 'Brasil',
    league: 'Brasileirão Série A',
    logo: '/logos/corinthians.png',
    stats: [
      makeStats('corinthians', 'last30', 2, 2, 2, 7, 8, 11.3, 4.8),
      makeStats('corinthians', 'last90', 7, 5, 6, 18, 21, 11.0, 4.6),
      makeStats('corinthians', 'last180', 13, 9, 13, 34, 40, 10.8, 4.5),
    ],
    injuries: [
      makeInjury('inj-cor-1', 'corinthians', 'injury', 'Yuri Alberto - contusão na coxa, retorno em 2 semanas'),
    ],
  },
  {
    id: 'saopaulo',
    name: 'São Paulo FC',
    country: 'Brasil',
    league: 'Brasileirão Série A',
    logo: '/logos/saopaulo.png',
    stats: [
      makeStats('saopaulo', 'last30', 3, 1, 2, 8, 7, 12.0, 5.0),
      makeStats('saopaulo', 'last90', 9, 4, 5, 22, 18, 11.7, 4.9),
      makeStats('saopaulo', 'last180', 17, 8, 10, 41, 34, 11.5, 4.8),
    ],
    injuries: [
      makeInjury('inj-sp-1', 'saopaulo', 'doubt', 'Calleri - gripe, participação incerta no próximo jogo'),
      makeInjury('inj-sp-2', 'saopaulo', 'suspension', 'Pablo Maia - suspenso por cartão vermelho'),
    ],
  },
  {
    id: 'realmadrid',
    name: 'Real Madrid',
    country: 'Espanha',
    league: 'La Liga',
    logo: '/logos/realmadrid.png',
    stats: [
      makeStats('realmadrid', 'last30', 5, 0, 1, 15, 4, 15.3, 6.8),
      makeStats('realmadrid', 'last90', 13, 2, 3, 38, 13, 15.0, 6.6),
      makeStats('realmadrid', 'last180', 25, 4, 6, 71, 25, 14.8, 6.5),
    ],
    injuries: [
      makeInjury('inj-rm-1', 'realmadrid', 'injury', 'Courtois - recuperação de lesão no joelho'),
      makeInjury('inj-rm-2', 'realmadrid', 'doubt', 'Vini Jr - dores no tornozelo, treino restrito'),
    ],
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Espanha',
    league: 'La Liga',
    logo: '/logos/barcelona.png',
    stats: [
      makeStats('barcelona', 'last30', 4, 1, 1, 12, 6, 14.5, 6.3),
      makeStats('barcelona', 'last90', 12, 3, 3, 33, 17, 14.2, 6.1),
      makeStats('barcelona', 'last180', 23, 5, 7, 62, 31, 14.0, 6.0),
    ],
    injuries: [
      makeInjury('inj-bar-1', 'barcelona', 'injury', 'Ter Stegen - cirurgia no joelho, fora da temporada'),
      makeInjury('inj-bar-2', 'barcelona', 'suspension', 'Gavi - suspenso por 3 jogos'),
    ],
  },
  {
    id: 'mancity',
    name: 'Manchester City',
    country: 'Inglaterra',
    league: 'Premier League',
    logo: '/logos/mancity.png',
    stats: [
      makeStats('mancity', 'last30', 4, 1, 1, 14, 5, 16.1, 7.2),
      makeStats('mancity', 'last90', 12, 3, 3, 38, 16, 15.8, 7.0),
      makeStats('mancity', 'last180', 24, 5, 6, 72, 29, 15.5, 6.9),
    ],
    injuries: [
      makeInjury('inj-mc-1', 'mancity', 'injury', 'Rodri - ligamento do joelho, fora da temporada'),
      makeInjury('inj-mc-2', 'mancity', 'doubt', 'Kevin De Bruyne - problema muscular, treino limitado'),
    ],
  },
  {
    id: 'liverpool',
    name: 'Liverpool',
    country: 'Inglaterra',
    league: 'Premier League',
    logo: '/logos/liverpool.png',
    stats: [
      makeStats('liverpool', 'last30', 5, 1, 0, 16, 4, 15.5, 6.5),
      makeStats('liverpool', 'last90', 13, 2, 3, 40, 14, 15.2, 6.3),
      makeStats('liverpool', 'last180', 26, 4, 5, 75, 26, 15.0, 6.2),
    ],
    injuries: [
      makeInjury('inj-liv-1', 'liverpool', 'doubt', 'Diogo Jota - treino individual, retorno próxima semana'),
    ],
  },
];

export const getTeamById = (id: string): Team | undefined =>
  mockTeams.find((t) => t.id === id);

export const mockMatches: Match[] = [
  {
    id: 'match-1',
    homeTeamId: 'flamengo',
    awayTeamId: 'palmeiras',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    date: addDays(today, 0).replace('T', 'T16:00:00').split('T')[0] + 'T21:00:00.000Z',
    competition: 'Brasileirão Série A',
    status: 'scheduled',
  },
  {
    id: 'match-2',
    homeTeamId: 'realmadrid',
    awayTeamId: 'barcelona',
    homeTeam: mockTeams[4],
    awayTeam: mockTeams[5],
    date: addDays(today, 0).split('T')[0] + 'T20:00:00.000Z',
    competition: 'La Liga',
    status: 'live',
    homeScore: 1,
    awayScore: 1,
  },
  {
    id: 'match-3',
    homeTeamId: 'mancity',
    awayTeamId: 'liverpool',
    homeTeam: mockTeams[6],
    awayTeam: mockTeams[7],
    date: addDays(today, 1).split('T')[0] + 'T17:30:00.000Z',
    competition: 'Premier League',
    status: 'scheduled',
  },
  {
    id: 'match-4',
    homeTeamId: 'corinthians',
    awayTeamId: 'saopaulo',
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[3],
    date: addDays(today, 1).split('T')[0] + 'T19:00:00.000Z',
    competition: 'Brasileirão Série A',
    status: 'scheduled',
  },
  {
    id: 'match-5',
    homeTeamId: 'palmeiras',
    awayTeamId: 'corinthians',
    homeTeam: mockTeams[1],
    awayTeam: mockTeams[2],
    date: addDays(today, -3).split('T')[0] + 'T21:00:00.000Z',
    competition: 'Brasileirão Série A',
    status: 'finished',
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: 'match-6',
    homeTeamId: 'liverpool',
    awayTeamId: 'mancity',
    homeTeam: mockTeams[7],
    awayTeam: mockTeams[6],
    date: addDays(today, -7).split('T')[0] + 'T17:00:00.000Z',
    competition: 'Premier League',
    status: 'finished',
    homeScore: 3,
    awayScore: 1,
  },
  {
    id: 'match-7',
    homeTeamId: 'barcelona',
    awayTeamId: 'realmadrid',
    homeTeam: mockTeams[5],
    awayTeam: mockTeams[4],
    date: addDays(today, 3).split('T')[0] + 'T21:00:00.000Z',
    competition: 'Copa del Rey',
    status: 'scheduled',
  },
  {
    id: 'match-8',
    homeTeamId: 'saopaulo',
    awayTeamId: 'flamengo',
    homeTeam: mockTeams[3],
    awayTeam: mockTeams[0],
    date: addDays(today, 5).split('T')[0] + 'T21:30:00.000Z',
    competition: 'Brasileirão Série A',
    status: 'scheduled',
  },
  {
    id: 'match-9',
    homeTeamId: 'realmadrid',
    awayTeamId: 'mancity',
    homeTeam: mockTeams[4],
    awayTeam: mockTeams[6],
    date: addDays(today, 7).split('T')[0] + 'T21:00:00.000Z',
    competition: 'UEFA Champions League',
    status: 'scheduled',
  },
  {
    id: 'match-10',
    homeTeamId: 'flamengo',
    awayTeamId: 'corinthians',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[2],
    date: addDays(today, -1).split('T')[0] + 'T21:00:00.000Z',
    competition: 'Brasileirão Série A',
    status: 'finished',
    homeScore: 3,
    awayScore: 2,
  },
];

export const getMatchById = (id: string): Match | undefined =>
  mockMatches.find((m) => m.id === id);
