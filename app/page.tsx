import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
// Utilisation du composant CTA universel
import { SectionCTA } from '@/components/common/SectionCTA';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { JsonLd, organizationSchema, reviewsSchema } from '@/components/seo/JsonLd';

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={reviewsSchema} />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <SectionCTA
        title="Prête à Donner Vie à Votre Vision ?"
        subtitle="Chaque projet est une nouvelle aventure créative. Parlons de vos ambitions et créons ensemble quelque chose d'extraordinaire qui vous ressemble vraiment."
        actions={[
          {
            label: "Démarrer Mon Projet",
            href: "/contact",
            icon: ArrowRight,
            className:
              "bg-gradient-rose hover:opacity-90 text-white shadow-rose-lg px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300",
          },
          {
            label: "Consultation Gratuite",
            href: "/consultation",
            icon: MessageCircle,
            variant: "outline",
            className:
              "border-2 border-rose-powder text-cream hover:bg-rose-powder hover:text-charcoal px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300",
          },
        ]}
        valueProps={[
          {
            icon: Sparkles,
            title: "Design Sur-Mesure",
            description:
              "Chaque élément est pensé spécialement pour votre marque et vos objectifs",
          },
          {
            icon: ArrowRight,
            title: "Livraison Express",
            description:
              "Projets livrés en 3 à 10 jours selon la complexité, sans compromis sur la qualité",
          },
          {
            icon: MessageCircle,
            title: "Support Illimité",
            description:
              "Accompagnement personnalisé jusqu'à ce que votre projet soit parfait",
          },
        ]}
        bgClass="bg-charcoal"
      />
      <CartSidebar />
    </>
  );
}
