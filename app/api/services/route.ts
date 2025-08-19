import { NextRequest } from 'next/server';
import { z } from 'zod';
import { allServices as initialServices } from '@/lib/services-data';

// Zod schema for a service (simplified, adapt as needed)
const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  subCategory: z.string(),
  features: z.array(z.string()),
  duration: z.string().optional(),
  popular: z.boolean().optional(),
  dependencies: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
});

// In-memory temp store (non-persistant)
let allServices = [...initialServices];

export async function GET() {
  return Response.json(allServices, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = serviceSchema.parse(body);
    allServices.push(result);
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Invalid data', details: error instanceof Error ? error.message : error },
      { status: 400 }
    );
  }
}