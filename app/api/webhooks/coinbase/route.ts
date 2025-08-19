// Stub for Coinbase webhook
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  // TODO: implement Coinbase webhook signature & order update
  return new Response('Coinbase webhook stub', { status: 200 });
}