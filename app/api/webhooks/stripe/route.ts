import Stripe from "stripe";
import { prisma } from "@/src/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig || "",
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    return new Response("Signature error: " + err.message, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // Find order in DB and mark as PAID
    await prisma.order.updateMany({
      where: { provider: "stripe", providerId: session.id },
      data: { status: "PAID" },
    });
  }

  return new Response("OK", { status: 200 });
}