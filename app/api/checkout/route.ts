import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import { prisma } from "@/src/lib/prisma";
import { allServices } from "@/lib/services-data";
import { Client as CoinbaseClient } from "coinbase-commerce-node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

const checkoutSchema = z.object({
  provider: z.enum(["stripe", "paypal", "coinbase"]),
  items: z.array(z.object({
    serviceId: z.string(),
    addonIds: z.array(z.string()).optional()
  })),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, items, email } = checkoutSchema.parse(body);

    // ---- Server-side pricing and enrichment ----
    const services = allServices;
    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let itemDetails: any[] = [];
    let total = 0;

    items.forEach(item => {
      const service = services.find(s => s.id === item.serviceId);
      if (!service) throw new Error(`Service ${item.serviceId} introuvable`);
      line_items.push({
        price_data: {
          currency: "eur",
          unit_amount: Math.round(service.price * 100),
          product_data: { name: service.name },
        },
        quantity: 1,
      });
      let addOns: any[] = [];
      if (item.addonIds) {
        for (const addOnId of item.addonIds) {
          const addOn = services.find(s => s.id === addOnId);
          if (addOn) {
            line_items.push({
              price_data: {
                currency: "eur",
                unit_amount: Math.round(addOn.price * 100),
                product_data: { name: addOn.name },
              },
              quantity: 1,
            });
            addOns.push({ id: addOn.id, name: addOn.name, price: addOn.price });
          }
        }
      }
      itemDetails.push({
        serviceId: item.serviceId,
        serviceName: service.name,
        unitPrice: service.price,
        quantity: 1,
        addons: addOns,
      });
      total += service.price + addOns.reduce((a, b) => a + b.price, 0);
    });

    if (provider === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        customer_email: email,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL}/checkout/cancelled`,
      });
      await prisma.order.create({
        data: {
          userId: null,
          items: itemDetails,
          total,
          status: "PENDING",
          provider: "stripe",
          providerId: session.id,
        },
      });
      return Response.json({ url: session.url }, { status: 201 });
    }

    // TODO: PayPal/coinbase integration
    if (provider === "paypal") {
      return Response.json({ url: "https://paypal.com/checkout/todo" }, { status: 400 });
    }
    if (provider === "coinbase") {
      return Response.json({ url: "https://commerce.coinbase.com/checkout/todo" }, { status: 400 });
    }

    return Response.json({ error: "Provider non supporté" }, { status: 400 });
  } catch (error: any) {
    return Response.json({ error: error.message || "Erreur checkout" }, { status: 400 });
  }
}