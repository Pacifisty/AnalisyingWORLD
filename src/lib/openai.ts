import { Team, Match, ScoreCard } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let openaiClient: any = null;

async function getOpenAIClient() {
  if (openaiClient) return openaiClient;
  if (process.env.OPENAI_API_KEY) {
    const { default: OpenAI } = await import('openai');
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

export async function generateTeamAnalysis(
  team: Team,
  scoreCard: ScoreCard,
  recentForm: string[]
): Promise<string> {
  const client = await getOpenAIClient();
  if (client) {
    try {
      const prompt = `Você é especialista em análise esportiva. Analise o time ${team.name} (${team.league}, ${team.country}) em português brasileiro profissional.

Dados: Forma recente: ${recentForm.join(', ')} | Ofensivo: ${scoreCard.offensiveStrength}/10 | Defensivo: ${scoreCard.defensiveStability}/10 | Consistência: ${scoreCard.recentConsistency}/10 | Risco: ${scoreCard.unpredictabilityRisk}/10

Gere 3-4 parágrafos sobre desempenho recente, forças/fraquezas, tendências.`;

      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
      });
      return response.choices[0]?.message?.content || generateMockTeamAnalysis(team, scoreCard);
    } catch {
      return generateMockTeamAnalysis(team, scoreCard);
    }
  }
  return generateMockTeamAnalysis(team, scoreCard);
}

export async function generateMatchAnalysis(
  match: Match,
  homeScoreCard: ScoreCard,
  awayScoreCard: ScoreCard
): Promise<string> {
  const client = await getOpenAIClient();
  if (client) {
    try {
      const prompt = `Analise o confronto ${match.homeTeam.name} x ${match.awayTeam.name} na ${match.competition} em português profissional.

Casa: Ofensivo ${homeScoreCard.offensiveStrength}/10, Defensivo ${homeScoreCard.defensiveStability}/10
Fora: Ofensivo ${awayScoreCard.offensiveStrength}/10, Defensivo ${awayScoreCard.defensiveStability}/10

3-4 parágrafos sobre o confronto, prognóstico e fatores decisivos.`;

      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
      });
      return response.choices[0]?.message?.content || generateMockMatchAnalysis(match, homeScoreCard, awayScoreCard);
    } catch {
      return generateMockMatchAnalysis(match, homeScoreCard, awayScoreCard);
    }
  }
  return generateMockMatchAnalysis(match, homeScoreCard, awayScoreCard);
}

function generateMockTeamAnalysis(team: Team, scoreCard: ScoreCard): string {
  const formLevel =
    scoreCard.recentConsistency >= 7 ? 'excelente' : scoreCard.recentConsistency >= 5 ? 'boa' : 'irregular';
  const offLevel =
    scoreCard.offensiveStrength >= 7 ? 'poderoso' : scoreCard.offensiveStrength >= 5 ? 'eficiente' : 'limitado';
  const defLevel =
    scoreCard.defensiveStability >= 7 ? 'sólida' : scoreCard.defensiveStability >= 5 ? 'razoável' : 'vulnerável';

  return `O ${team.name} tem apresentado uma forma ${formLevel} nas últimas semanas, demonstrando consistência que destaca a equipe na ${team.league}. Os números recentes revelam um coletivo que entende seus momentos dentro de campo, alternando entre pressão alta e gestão de resultado conforme a necessidade do jogo.

No setor ofensivo, o time se mostra ${offLevel}, com criação de jogadas acima da média da competição. A construção passa por um meio-campo bem organizado, capaz de criar espaços mesmo contra blocos defensivos bem postados. A variação entre jogadas combinadas e bolas em profundidade são características marcantes do sistema tático atual.

Defensivamente, a equipe apresenta uma estrutura ${defLevel}. A linha defensiva tem conseguido anular os principais atacantes adversários, especialmente nos jogos em casa, onde o apoio da torcida potencializa o desempenho coletivo. As bolas paradas ainda representam um ponto de atenção, tanto ofensiva quanto defensivamente.

As tendências apontam para uma equipe em fase de consolidação, com potencial de manter ou melhorar seu posicionamento. O índice de imprevisibilidade de ${scoreCard.unpredictabilityRisk.toFixed(1)}/10 indica que a equipe pode surpreender nos próximos confrontos, especialmente jogando com o apoio de seus torcedores.`;
}

function generateMockMatchAnalysis(match: Match, homeScoreCard: ScoreCard, awayScoreCard: ScoreCard): string {
  const hAdv = homeScoreCard.offensiveStrength - awayScoreCard.defensiveStability;
  const aAdv = awayScoreCard.offensiveStrength - homeScoreCard.defensiveStability;
  const prediction =
    hAdv > aAdv + 1
      ? `vitória do ${match.homeTeam.name}`
      : aAdv > hAdv + 1
      ? `vitória do ${match.awayTeam.name}`
      : 'equilíbrio entre as equipes';

  return `O confronto entre ${match.homeTeam.name} e ${match.awayTeam.name} promete ser um dos jogos mais aguardados da rodada na ${match.competition}. Ambas as equipes chegam com objetivos claros e repertório técnico para uma partida de alto nível, tornando este duelo especialmente relevante na classificação.

O ${match.homeTeam.name}, atuando em casa, conta com o fator mando para equilibrar ou superar a qualidade do adversário. Com força ofensiva de ${homeScoreCard.offensiveStrength.toFixed(1)}/10 e estabilidade defensiva de ${homeScoreCard.defensiveStability.toFixed(1)}/10, a equipe da casa demonstra um perfil equilibrado e difícil de ser batido em seus domínios.

O ${match.awayTeam.name} chega como visitante, mas com credenciais para complicar a vida do adversário. Com índice ofensivo de ${awayScoreCard.offensiveStrength.toFixed(1)}/10, possui jogadores capazes de decidir em transições rápidas. A estabilidade defensiva de ${awayScoreCard.defensiveStability.toFixed(1)}/10 sugere boa organização fora de casa.

Nossa análise aponta para ${prediction} como cenário mais provável com base nos dados dos últimos 6 meses. Os fatores decisivos serão a eficiência nas bolas paradas, a capacidade de manutenção da posse sob pressão e o desempenho individual dos jogadores-chave de cada equipe. Acompanhe nossa análise em tempo real durante a partida.`;
}
