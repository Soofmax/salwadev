'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Zod schema for SectionCTA props
export const sectionCtaSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  icon: z.any().optional(),
  iconClass: z.string().optional(),
  bgClass: z.string().optional(),
  actions: z.array(z.object({
    label: z.string(),
    href: z.string(),
    icon: z.any().optional(),
    variant: z.string().optional(),
    className: z.string().optional(),
  })),
  valueProps: z.array(z.object({
    icon: z.any(),
    title: z.string(),
    description: z.string(),
    iconBgClass: z.string().optional()
  })).optional(),
  className: z.string().optional(),
  animatedBg: z.any().optional(),
});
export type SectionCTAProps = z.infer<typeof sectionCtaSchema>;

export function SectionCTA(props: SectionCTAProps) {
  const {
    title,
    subtitle,
    icon: Icon,
    iconClass = 'p-3 bg-white/20 rounded-full',
    bgClass = 'bg-gradient-rose',
    actions,
    valueProps,
    className = '',
    animatedBg,
  } = sectionCtaSchema.parse(props);

  return (
    <section className={`py-20 relative overflow-hidden ${bgClass} ${className}`}>
      {animatedBg && <div className="absolute inset-0 opacity-10">{animatedBg}</div>}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {Icon && (
            <div className="flex justify-center mb-6">
              <div className={iconClass}>
                <Icon className="w-8 h-8" />
              </div>
            </div>
          )}
          <h2 className="font-playfair text-3xl md:text-6xl font-bold mb-6 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl leading-8 mb-8 opacity-90 text-white/90">{subtitle}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {actions.map(({ label, href, icon: ActionIcon, variant = 'secondary', className }, i) => (
              <Button
                asChild
                size="lg"
                variant={variant}
                className={className}
                key={i}
              >
                <Link href={href}>
                  {ActionIcon && <ActionIcon className="mr-2 w-5 h-5" />}
                  {label}
                </Link>
              </Button>
            ))}
          </div>
          {valueProps && valueProps.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {valueProps.map(({ icon: ValueIcon, title, description, iconBgClass }, i) => (
                <div className="text-center" key={i}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${iconBgClass ?? 'bg-white/20'}`}>
                    <ValueIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-2">{title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
