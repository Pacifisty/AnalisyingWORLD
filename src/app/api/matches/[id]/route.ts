import { NextResponse } from 'next/server';
import { getMatchById } from '@/lib/mock-data';
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const match = getMatchById(params.id);
  if (!match) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(match);
}
