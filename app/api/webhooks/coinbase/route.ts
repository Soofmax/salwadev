import { Webhook } from "coinbase-commerce-node";

export async function POST(req: Request) {
  // TODO: utiliser Webhook.verifyEventBody pour vérifier la signature
  return new Response("TODO Coinbase Webhook", { status: 200 });
}