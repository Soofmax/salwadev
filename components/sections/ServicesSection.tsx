// Fichier: components/sections/ServicesSection.tsx
// Version Corrigée qui utilise la source de données centrale et unique

'use client';

import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/services/ServiceCard';
import Link from 'next/link';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';
import { z } from 'zod';

// Zod schema for ServicesSection props
export const servicesSectionSchema = z.object({
  badge: z.string(),
  heading: z.string(),
  headingHighlight: z.string(),
  description: z.string(),
  services: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    popular: z.boolean().optional(),
    [z.string()]: z.any()
  })),
  totalServices: z.number(),
  cta: z.object({
    href: z.string(),
    label: z.string()
  }),
  customCTA: z.object({
    icon: z.any(),
    title: z.string(),
    description: z.string(),
    href: z.string(),
    buttonLabel: z.string()
  })
});
export type ServicesSectionProps = z.infer<typeof servicesSectionSchema>;

export function ServicesSection(props: ServicesSectionProps) {
  const {
    badge,
    heading,
    headingHighlight,
    description,
    services,
    totalServices,
    cta,
    customCTA
  } = servicesSectionSchema.parse(props);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Motif/Pattern de fond */}
        <div className="absolute inset-0 bg-cream pointer-events-none z-0" style={{
          backgroundImage: `radial-gradient(circle, #ead2d8 2px, transparent 1px), radial-gradient(circle, #ead2d8 2px, transparent 1px)`,
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
          opacity: 0.16
        }} />
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-rose-powder/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-magenta" />
            <span className="text-sm font-medium text-magenta">{badge}</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {heading}
            <span className="text-gradient block">{headingHighlight}</span>
          </h2>
          <p className="text-xl text-charcoal/70 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              className={`delay-${i * 100}`}
            />
          ))}
        </div>

        {/* Bouton pour voir le catalogue complet */}
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-rose text-white shadow-rose text-lg"
          >
            <Link href={cta.href}>
              {cta.label} ({totalServices})
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Custom Service CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-powder/20 to-magenta/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <customCTA.icon className="w-8 h-8 text-magenta" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">
              {customCTA.title}
            </h3>
            <p className="text-charcoal/70 mb-6 max-w-2xl mx-auto">{customCTA.description}</p>
            <Link href={customCTA.href}>
              <Button
                size="lg"
                className="bg-gradient-rose hover:opacity-90 text-white shadow-rose"
              >
                {customCTA.buttonLabel}
                <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
