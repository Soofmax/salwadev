import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import Stripe from 'stripe';
import paypal from 'paypal-rest-sdk';
import { Client as CoinbaseClient } from '@coinbase/commerce-node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });
// Configure PayPal and Coinbase as needed

export async function POST(req: NextRequest) {
  try {
    const { items, total, provider } = await req.json();
    let redirectUrl: string | null = null;
    let providerId: string | null = null;

    if (provider === 'stripe') {
      // Minimal Stripe session creation for demo
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'eur',
            product_data: { name: item.serviceId }, // adapt for real product
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancelled`,
      });
      redirectUrl = session.url!;
      providerId = session.id;
    } else if (provider === 'paypal') {
      // Stub: create PayPal payment, set redirectUrl, providerId
      redirectUrl = 'https://paypal.com/checkout';
      providerId = 'paypal-mock-id';
    } else if (provider === 'coinbase') {
      // Stub: create Coinbase checkout, set redirectUrl, providerId
      redirectUrl = 'https://commerce.coinbase.com/checkout';
      providerId = 'coinbase-mock-id';
    } else {
      return Response.json({ error: 'Invalid provider' }, { status: 400 });
    }

    // Save order in DB
    const order = await prisma.order.create({
      data: {
        userId: null,
        items,
        total,
        status: 'PENDING',
        provider,
        providerId,
      },
    });

    return Response.json({ redirectUrl }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message || String(error) }, { status: 400 });
  }
}