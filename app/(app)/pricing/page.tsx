// Fichier : app/(app)/pricing/page.tsx

// Import des composants "briques" que cette page orchestre
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/service/CTASection';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { JsonLd } from '@/components/seo/JsonLd';

// Schema pour le SEO de la page pricing
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Tarifs - Votre Service",
  "description": "Découvrez nos tarifs et choisissez l'offre qui vous convient le mieux",
  "url": "https://votre-domaine.com/pricing" // Pense à mettre ton vrai domaine ici
};

// Metadonnées pour le SEO
export const metadata = {
  title: "Tarifs | Votre Service",
  description: "Découvrez nos tarifs compétitifs et choisissez l'offre qui correspond à vos besoins.",
  keywords: "tarifs, prix, offres, abonnement",
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      
      {/* Section Hero pour la page pricing */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
            Des offres flexibles pour chaque ambition
          </h1>
          <p className="font-montserrat text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Que vous soyez seul ou en équipe, nous avons un plan conçu pour vous aider à réussir, sans compromis.
          </p>
        </div>
      </section>

      {/* Section des tarifs, gérée par son propre composant */}
      <PricingSection />
      
      {/* Section CTA, gérée par son propre composant */}
      <CTASection />
      
      {/* Panier latéral, géré par son propre composant */}
      <CartSidebar />
    </>
  );
}
