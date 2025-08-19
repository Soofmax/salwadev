'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { z } from 'zod';

// Zod schema for TestimonialsSection props
export const testimonialsSectionSchema = z.object({
  heading: z.string(),
  headingHighlight: z.string(),
  description: z.string(),
  testimonials: z.array(z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    avatar: z.string().url(),
    content: z.string(),
    rating: z.number().min(1).max(5)
  })),
  trustScore: z.object({
    average: z.string(),
    count: z.string()
  })
});
export type TestimonialsSectionProps = z.infer<typeof testimonialsSectionSchema>;

export function TestimonialsSection(props: TestimonialsSectionProps) {
  const { heading, headingHighlight, description, testimonials, trustScore } = testimonialsSectionSchema.parse(props);

  return (
    <section className="py-20 bg-gradient-to-br from-rose-powder/10 to-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {heading}
            <span className="text-gradient block">{headingHighlight}</span>
          </h2>
          <p className="text-xl text-charcoal/70 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative border-rose-powder/30 hover:shadow-rose transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-magenta opacity-20" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-charcoal/80 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-rose-powder text-magenta">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-charcoal">{testimonial.name}</h4>
                    <p className="text-sm text-charcoal/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-rose">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-magenta font-playfair">
                {trustScore.average}
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <div className="hidden sm:block w-px h-6 bg-rose-powder"></div>
            <div className="text-sm text-charcoal/70 font-medium">
              {trustScore.count}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
