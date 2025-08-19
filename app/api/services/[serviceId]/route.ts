import { NextRequest } from 'next/server';
import { z } from 'zod';
import { allServices as initialServices } from '@/lib/services-data';

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

// In-memory temp store (shared with root route)
let allServices = [...initialServices];

export async function GET(
  req: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  const service = allServices.find((s) => s.id === params.serviceId);
  if (!service) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(service, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const body = await req.json();
    const updated = serviceSchema.parse({ ...body, id: params.serviceId });
    const idx = allServices.findIndex((s) => s.id === params.serviceId);
    if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
    allServices[idx] = updated;
    return Response.json(updated, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Invalid data', details: error instanceof Error ? error.message : error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  const idx = allServices.findIndex((s) => s.id === params.serviceId);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  allServices.splice(idx, 1);
  return new Response(null, { status: 204 });
}