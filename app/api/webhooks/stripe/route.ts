import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get('stripe-signature');
    const raw = await req.text();
    const event = stripe.webhooks.constructEvent(
      raw,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await prisma.order.updateMany({
        where: { provider: 'stripe', providerId: session.id },
        data: { status: 'PAID' },
      });
    }
    return new Response('OK', { status: 200 });
  } catch (error: any) {
    return new Response('Webhook Error: ' + error.message, { status: 400 });
  }
}