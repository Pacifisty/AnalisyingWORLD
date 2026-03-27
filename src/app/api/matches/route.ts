import { NextResponse } from 'next/server';
import { mockMatches } from '@/lib/mock-data';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const matches = status ? mockMatches.filter(m => m.status === status) : mockMatches;
  return NextResponse.json(matches);
}
