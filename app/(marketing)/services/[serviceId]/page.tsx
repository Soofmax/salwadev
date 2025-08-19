// Fichier: app/(marketing)/services/[serviceId]/page.tsx
// VERSION CORRIGÉE

import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

// Imports des données et types
import { allServices, type Service } from '@/lib/services-data';

// Imports des icônes
import {
  Check,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Target,
  Layers,
  BarChart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Imports des composants UI
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Imports des composants de la page
import { ServiceDetailActions } from '@/components/services/ServiceDetailActions';
import { Sidebar } from '@/components/layout/Sidebar';

// ============================================================================
// 🧮 PARTIE 1: LOGIQUE DE DONNÉES
// ============================================================================

const getServiceAnalytics = cache((serviceId: string) => {
  const service = allServices.find((s) => s.id === serviceId);
  if (!service) return null;

  const categoryServices = allServices.filter(
    (s) => s.subCategory === service.subCategory
  );
  const avgPrice = Math.round(
    categoryServices.reduce((acc, s) => acc + s.price, 0) /
      categoryServices.length
  );
  const relatedServices = categoryServices
    .filter((s) => s.id !== serviceId)
    .slice(0, 3);
  const complementaryServices =
    service.category === 'base'
      ? allServices
          .filter((s) => s.dependencies?.includes(serviceId))
          .slice(0, 4)
      : [];

  const totalReviews = 127;
  const avgRating = 4.9;

  return {
    service,
    avgPrice,
    relatedServices,
    complementaryServices,
    stats: {
      totalReviews,
      avgRating,
    },
  };
});

// ============================================================================
// 🌍 PARTIE 2: GESTION DES URLS
// ============================================================================

const URL_REDIRECTS: Record<string, string> = {
  'site-web': 'site-vitrine',
  ecommerce: 'site-ecommerce',
  seo: 'seo-avance',
};

export async function generateStaticParams() {
  return allServices.map((service) => ({ serviceId: service.id }));
}

// ============================================================================
// 🔍 PARTIE 3: MÉTADONNÉES SEO
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}): Promise<Metadata> {
  const { serviceId } = await params;

  if (URL_REDIRECTS[serviceId]) {
    redirect(`/services/${URL_REDIRECTS[serviceId]}`);
  }

  const analytics = getServiceAnalytics(serviceId);
  if (!analytics) {
    return {
      title: 'Service non trouvé',
      robots: { index: false },
    };
  }

  const { service } = analytics;
  const heroImage = `/images/services/${service.id}-og.jpg`;

  return {
    title: `${service.name} - ${service.price}€ | Expert ${service.subCategory}`,
    description: `${service.description} ✅ ${service.features.length} fonctions incluses.`,
    alternates: {
      canonical: `/services/${service.id}`,
    },
    openGraph: {
      title: `${service.name} | Soofmaax`,
      description: service.description,
      images: [heroImage],
    },
  };
}

// ============================================================================
// 🎨 PARTIE 4: UTILS D'AFFICHAGE
// ============================================================================

const getCategoryIcon = (subCategory: string) => {
  const icons: Record<string, LucideIcon> = {
    visibilite: Globe,
    conversion: Target,
    vente: BarChart,
    optimisation: Shield,
    growth: Star,
    plateforme: Layers,
    innovation: Zap,
  };
  return icons[subCategory] || BarChart;
};

const getCategoryColor = (subCategory: string) => {
  const colors: Record<string, string> = {
    visibilite: 'bg-blue-100 text-blue-800',
    conversion: 'bg-green-100 text-green-800',
    vente: 'bg-purple-100 text-purple-800',
    optimisation: 'bg-orange-100 text-orange-800',
    growth: 'bg-pink-100 text-pink-800',
    plateforme: 'bg-indigo-100 text-indigo-800',
    innovation: 'bg-red-100 text-red-800',
  };
  return colors[subCategory] || 'bg-gray-100 text-gray-800';
};

// ============================================================================
// 🚀 PARTIE 5: COMPOSANT PRINCIPAL
// ============================================================================

// Définition de l'interface pour les props de la page (Next.js 15+)
interface PageProps {
  params: Promise<{ serviceId: string }>;
}

// Utilisation de l'interface pour typer les props du composant
export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceId } = await params;

  if (URL_REDIRECTS[serviceId]) {
    redirect(`/services/${URL_REDIRECTS[serviceId]}`);
  }

  const analytics = getServiceAnalytics(serviceId);
  if (!analytics) {
    notFound();
  }

  const { service, relatedServices, complementaryServices, stats } = analytics;
  const CategoryIcon = getCategoryIcon(service.subCategory);
  const heroImage = `/images/services/${service.id}-hero.jpg`;

  return (
    <article className="bg-cream min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-charcoal/60">
            <li><Link href="/" className="hover:text-magenta">Accueil</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link href="/services" className="hover:text-magenta">Services</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-charcoal font-medium">{service.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 lg:gap-16">
          <main className="xl:col-span-3 space-y-12">
            <header className="text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                <div className="relative w-full lg:w-80 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-powder/20 to-magenta/10 shadow-lg">
                  <Image
                    src={heroImage}
                    alt={`Illustration pour ${service.name}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <Badge className={`${getCategoryColor(service.subCategory)} flex items-center gap-2 w-fit mx-auto lg:mx-0`}>
                    <CategoryIcon className="w-4 h-4" />
                    {service.subCategory}
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-charcoal leading-tight">
                    {service.name}
                  </h1>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-charcoal/70">
                      {stats.avgRating}/5 ({stats.totalReviews} avis)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xl lg:text-2xl text-charcoal/80 leading-relaxed max-w-4xl mx-auto lg:mx-0">
                {service.description}
              </p>
            </header>

            <section>
              <h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">
                Fonctionnalités incluses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-semibold text-charcoal">{feature}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <Sidebar 
            service={service}
            relatedServices={relatedServices}
            complementaryServices={complementaryServices}
          />
        </div>
      </div>
    </article>
  );
}
