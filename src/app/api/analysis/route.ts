import { NextResponse } from 'next/server';
import { getTeamById, getMatchById } from '@/lib/mock-data';
import { analyzeTeam, analyzeMatch } from '@/lib/analysis-engine';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.teamId) {
      const team = getTeamById(body.teamId);
      if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });
      const analysis = await analyzeTeam(team);
      return NextResponse.json(analysis);
    }
    if (body.matchId) {
      const match = getMatchById(body.matchId);
      if (!match) return NextResponse.json({ error: 'Match not found' }, { status: 404 });
      const analysis = await analyzeMatch(match);
      return NextResponse.json(analysis);
    }
    return NextResponse.json({ error: 'teamId or matchId required' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
