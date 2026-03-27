import { NextResponse } from 'next/server';
import { mockTeams, mockMatches } from '@/lib/mock-data';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  if (!q) return NextResponse.json({ teams: [], matches: [] });
  const teams = mockTeams.filter(t =>
    t.name.toLowerCase().includes(q) || t.league.toLowerCase().includes(q) || t.country.toLowerCase().includes(q)
  );
  const matches = mockMatches.filter(m =>
    m.homeTeam.name.toLowerCase().includes(q) || m.awayTeam.name.toLowerCase().includes(q) || m.competition.toLowerCase().includes(q)
  );
  return NextResponse.json({ teams, matches });
}
