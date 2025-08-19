import { NextRequest } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const itemSchema = z.object({
  serviceId: z.string(),
  addonIds: z.array(z.string()),
});
const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  items: z.array(itemSchema).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = quoteSchema.parse(body);
    // Simulate DB save, return id
    return Response.json({ success: true, id: uuidv4() }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 400 }
    );
  }
}