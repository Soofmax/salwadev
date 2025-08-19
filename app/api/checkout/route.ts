import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import paypal from "paypal-rest-sdk";
import Coinbase from "@coinbase/commerce-node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

const checkoutSchema = z.object({
  provider: z.enum(["stripe", "paypal", "coinbase"]),
  items: z.array(z.object({
    serviceId: z.string(),
    addonIds: z.array(z.string())
  })),
  email: z.string().email().optional(),
  // ...autres champs au besoin
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, items, email } = checkoutSchema.parse(body);

    // Stripe
    if (provider === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items.map(item => ({
          price_data: {
            currency: "eur",
            unit_amount: 5000, // TODO: prix réel
            product_data: {
              name: item.serviceId,
            }
          },
          quantity: 1
        })),
        customer_email: email,
        success_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancelled`,
      });
      return Response.json({ url: session.url }, { status: 201 });
    }

    // PayPal (placeholder, à adapter)
    if (provider === "paypal") {
      return Response.json({ url: "https://paypal.com/checkout/todo" }, { status: 201 });
    }

    // Coinbase Commerce (placeholder, à adapter)
    if (provider === "coinbase") {
      return Response.json({ url: "https://commerce.coinbase.com/checkout/todo" }, { status: 201 });
    }

    return Response.json({ error: "Provider non supporté" }, { status: 400 });
  } catch (error: any) {
    return Response.json({ error: error.message || "Erreur checkout" }, { status: 400 });
  }
}