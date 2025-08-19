// Stub for PayPal webhook
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  // TODO: implement PayPal webhook signature & order update
  return new Response('PayPal webhook stub', { status: 200 });
}