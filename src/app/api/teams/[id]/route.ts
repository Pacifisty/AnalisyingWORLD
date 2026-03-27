import { NextResponse } from 'next/server';
import { getTeamById } from '@/lib/mock-data';
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const team = getTeamById(params.id);
  if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(team);
}
