import Script from 'next/script';
import { JSONValue } from '@/src/types/json';
import { z } from 'zod';

const JsonSchema: z.ZodType<JSONValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonSchema),
    z.record(JsonSchema),
  ])
);

interface JsonLdProps {
  data: JSONValue;
}

export function JsonLd({ data }: JsonLdProps) {
  const parsed = JsonSchema.safeParse(data);
  const json = parsed.success ? parsed.data : data;
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

// Données structurées pour l'organisation
export const organizationSchema: JSONValue = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SDS - Services de Développement Sur-Mesure',
  alternateName: 'Soofia\'s Digital Services',
  url: 'https://votre-domaine.com',
  logo: 'https://votre-domaine.com/logo.png',
  description: 'Créatrice de solutions web glamour et performantes. Sites vitrines, landing pages, intégrations Web3 et plus encore.',
  founder: {
    '@type': 'Person',
    name: 'Votre Nom',
    jobTitle: 'Développeuse Web & Blockchain',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-X-XX-XX-XX-XX',
    contactType: 'customer service',
    availableLanguage: 'French',
  },
  sameAs: [
    'https://linkedin.com/in/votre-profil',
    'https://github.com/votre-profil',
    'https://twitter.com/votre-profil',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  serviceType: [
    'Développement Web',
    'Création de Sites Internet',
    'E-commerce',
    'Applications Web',
    'Intégration Web3',
  ],
};

// Données structurées pour un service
export function createServiceSchema(service: {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}): JSONValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'SDS - Services de Développement Sur-Mesure',
      url: 'https://votre-domaine.com',
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    additionalProperty: service.features.map((feature) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })),
    url: `https://votre-domaine.com/services/${service.id}`,
  };
}

// Données structurées pour les avis clients
export const reviewsSchema: JSONValue = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SDS - Services de Développement Sur-Mesure',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Marie Dubois',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody: 'SDS a transformé notre vision en réalité digitale. Son approche créative et sa maîtrise technique ont dépassé toutes nos attentes. Un travail d\'exception !',
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Thomas Martin',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody: 'L\'intégration Web3 de notre plateforme était complexe, mais SDS a géré chaque détail avec professionnalisme. Résultat : une solution élégante et performante.',
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sophie Laurent',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody: 'Notre nouveau site vitrine génère 3x plus de leads qu\'avant. Le design est magnifique et l\'expérience utilisateur parfaite. Merci SDS !',
    },
  ],
};

