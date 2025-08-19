// Fichier: app/(marketing)/services/[serviceId]/page.tsx
// VERSION CORRIGÉE

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useService } from '@/hooks/useService';
import {
  Check,
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

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/ui/PageContainer';
import { AddOnsSection } from '@/components/sections/AddOnsSection';
import { JsonLd, createServiceSchema } from '@/components/seo/JsonLd';
import LoadingServicePage from './loading';
import Error from './error';
import { useCart } from '@/hooks/useCart';
import { useServices } from '@/hooks/useServices';
import { useState } from 'react';

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
  params: { serviceId: string };
}): Promise<Metadata> {
  const { serviceId } = params;

  if (URL_REDIRECTS[serviceId]) {
    redirect(`/services/${URL_REDIRECTS[serviceId]}`);
  }

  const service = allServices.find((s) => s.id === serviceId);
  if (!service) {
    return {
      title: 'Service non trouvé',
      robots: { index: false },
    };
  }

  const heroImage = `/images/services/${service.id}-og.jpg`;

  return {
    title: `${service.name} | SDS`,
    description: service.description,
    openGraph: {
      title: `${service.name} | SDS`,
      description: service.description,
      images: [heroImage],
    },
    twitter: {
      title: `${service.name} | SDS`,
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
export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const { service, isLoading, isError } = useService(params.serviceId);

  const { services } = useServices();
  const { addItem } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (isLoading) return <LoadingServicePage />;
  if (isError) return <Error />;
  if (!service) return <Error />;

  // Find compatible add-ons (services whose id is in service.dependencies)
  const addOns = (services && service.dependencies)
    ? services.filter((s: any) => service.dependencies.includes(s.id))
    : [];

  const heroImage = `/images/services/${service.id}-hero.jpg`;
  const CategoryIcon = getCategoryIcon(service.subCategory);

  // Handle add-on toggle
  const handleToggleAddon = (addOnId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleAddToCart = () => {
    addItem(service.id, selectedAddons, addOns.map((a: any) => a.id));
    // Optionally redirect or show toast
    window.location.href = '/cart';
  };

  return (
    <PageContainer className="bg-cream min-h-screen pt-8 pb-16">
      <JsonLd data={createServiceSchema(service)} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-charcoal/60">
          <li><Link href="/" className="hover:text-magenta">Accueil</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li><Link href="/services" className="hover:text-magenta">Services</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li className="text-charcoal font-medium">{service.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        <main className="flex-1 space-y-10">
          <header>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <div className="relative w-full md:w-80 aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-powder/20 to-magenta/10 shadow-lg">
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
                <Badge className={`${getCategoryColor(service.subCategory)} flex items-center gap-2 w-fit mx-auto md:mx-0`}>
                  <CategoryIcon className="w-4 h-4" />
                  {service.subCategory}
                </Badge>
                <h1 className="text-4xl font-extrabold font-playfair text-charcoal leading-tight">
                  {service.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-magenta text-2xl">
                    {service.price}€
                  </span>
                  <span className="text-sm text-charcoal/70">
                    {service.features.length} fonctionnalités incluses
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xl text-charcoal/80 leading-relaxed max-w-3xl">
              {service.description}
            </p>
          </header>
          <section>
            <h2 className="text-2xl font-bold text-charcoal mb-5">
              Fonctionnalités & Avantages
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {service.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                  <span className="pt-1 text-charcoal font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            {service.price && (
              <div className="mb-8">
                <span className="inline-block bg-magenta text-white font-bold px-6 py-3 rounded-full text-lg shadow">
                  À partir de {service.price}€
                </span>
              </div>
            )}
          </section>

          {/* Add-ons selection */}
          {addOns.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-charcoal mb-4">Extensions & options complémentaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {addOns.map((addOn: any) => (
                  <label
                    key={addOn.id}
                    className={`flex items-center bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-rose-powder/10 transition-all ${
                      selectedAddons.includes(addOn.id) ? 'ring-2 ring-magenta' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addOn.id)}
                      onChange={() => handleToggleAddon(addOn.id)}
                      className="accent-magenta w-5 h-5 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-charcoal">{addOn.name}</div>
                      <div className="text-charcoal/70 text-sm">{addOn.description}</div>
                      <div className="font-semibold text-magenta mt-1">+{addOn.price}€</div>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section>
            <Button
              className="bg-gradient-rose hover:opacity-90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>
          </section>
        </main>
        <aside className="flex-shrink-0 hidden lg:block w-96"></aside>
      </div>
    </PageContainer>
  );
}
        <aside className="flex-shrink-0 hidden lg:block w-96">
          {/* Bonus: placez ici des sections annexes, témoignages, etc. */}
        </aside>
      </div>
    </PageContainer>
  );
}
