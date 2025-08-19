'use client';

import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Zod schema for AddOnsSection props
export const addOnsSectionSchema = z.object({
  addOns: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number()
    })
  ),
  serviceId: z.string()
});
export type AddOnsSectionProps = z.infer<typeof addOnsSectionSchema>;

export function AddOnsSection(props: AddOnsSectionProps) {
  const { addOns, serviceId } = addOnsSectionSchema.parse(props);

  return (
    <section className="mt-16">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal mb-8">
        Extensions et options complémentaires
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className="flex flex-col bg-gradient-to-br from-white via-rose-powder/10 to-magenta/10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
          >
            <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
              {addOn.name}
            </h3>
            <p className="text-charcoal/70 mb-4 flex-1">{addOn.description}</p>
            <div className="flex items-end justify-between mt-4">
              <span className="font-bold text-magenta text-lg">
                +{addOn.price.toLocaleString('fr-FR')}€
              </span>
              <Button
                asChild
                size="sm"
                className="bg-gradient-rose text-white font-semibold px-6"
              >
                <Link href={`/contact?serviceId=${serviceId}&addOnId=${addOn.id}`}>
                  Ajouter à ma demande
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}