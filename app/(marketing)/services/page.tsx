// Fichier: app/(marketing)/services/page.tsx
'use client';

import Link from 'next/link';
import { useServices } from '@/src/hooks/useServices';

// Imports des composants
import CatalogueLoader from '@/components/sections/CatalogueLoader';
import { Check, Gift } from 'lucide-react';

// --- SEO Metadata ---
// (retiré, SEO metadata handled elsewhere or can be added in a layout if needed)

// --- Logique de création des Packs ---
// Ce code doit être déplacé dans le rendu (après chargement), car il dépend des données chargées dynamiquement.


// --- Composant Principal de la Page ---
import PageContainer from '@/src/components/ui/PageContainer';

export default function ServicesPage() {
  const { services, isLoading, isError } = useServices();

  // Génère dynamiquement les packs à partir des services chargés
  function generatePack(
    name: string,
    description: string,
    baseServiceId: string,
    addonIds: string[],
    popular: boolean
  ) {
    if (!services) return null;
    const baseService = services.find((s: any) => s.id === baseServiceId);
    if (!baseService) return null;

    const validAddons = services.filter(
      (addon: any) =>
        addonIds.includes(addon.id) && addon.dependencies?.includes(baseServiceId)
    );

    const originalPrice =
      baseService.price +
      validAddons.reduce((sum: number, addon: any) => sum + addon.price, 0);
    const serviceCount = 1 + validAddons.length;
    const discountRate = serviceCount >= 3 ? 0.15 : 0.1;
    const discount = Math.ceil(originalPrice * discountRate);
    const finalPrice = originalPrice - discount;

    return {
      name,
      description,
      price: finalPrice,
      originalPrice,
      savings: discount,
      features: [baseService.name, ...validAddons.map((a: any) => a.name)],
      complexity: serviceCount >= 3 ? 'Avancé' : 'Standard',
      cta: 'Configurer ce pack',
      popular,
      serviceId: baseServiceId,
    };
  }

  const dynamicPacks = services
    ? [
        generatePack(
          'Pack Présence Digitale',
          'Solution complète pour créer votre site vitrine professionnel avec SEO avancé et maintenance incluse.',
          'site-vitrine',
          ['seo-avance', 'maintenance-annuelle'],
          true
        ),
        generatePack(
          'Pack E-commerce Pro',
          'Boutique en ligne complète avec gestion intelligente des stocks et programme de fidélité.',
          'site-ecommerce',
          ['gestion-inventaire-ia', 'systeme-parrainage'],
          false
        ),
      ].filter((p): p is NonNullable<typeof p> => !!p)
    : [];

  return (
    <PageContainer className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <header className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-charcoal mb-6">
            Services Web & Développement Digital
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal/80 max-w-3xl mx-auto">
            Transformez votre présence en ligne avec nos <strong>packs web complets</strong> et plus de <strong>30 services spécialisés</strong>.
          </p>
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
              <li><Link href="/" className="hover:text-magenta">Accueil</Link></li>
              <li className="before:content-['/'] before:mx-2">Services</li>
            </ol>
          </nav>
        </header>

        {/* --- Section des Packs --- */}
        <section className="mt-20" aria-labelledby="packs-heading">
          <h2 id="packs-heading" className="text-3xl font-playfair font-bold text-center text-charcoal mb-8">
            Nos Packs Solutions Complètes
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {isLoading &&
              Array.from({ length: 2 }).map((_, i) => (
                <CatalogueLoader key={i} />
              ))}
            {isError && (
              <div className="col-span-full text-center text-red-600 font-semibold">
                Une erreur est survenue lors du chargement des services.
              </div>
            )}
            {dynamicPacks.map((pack) => (
              <article
                key={pack.name}
                id={pack.serviceId}
                className={`rounded-2xl p-8 flex flex-col border transition-all duration-300 ${
                  pack.popular
                    ? 'bg-rose-powder/10 text-charcoal border-magenta ring-2 ring-magenta hover:shadow-rose-lg'
                    : 'bg-white text-charcoal border-rose-powder/30 hover:border-magenta hover:shadow-rose'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  {pack.popular && (
                    <span className="bg-magenta text-white text-xs font-semibold px-3 py-1 rounded-full">
                      LE PLUS POPULAIRE
                    </span>
                  )}
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full ml-auto">
                    {pack.complexity}
                  </span>
                </div>
                <h3 className="font-playfair text-2xl font-bold">{pack.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-magenta">
                    {pack.price.toLocaleString('fr-FR')}€
                  </p>
                  <p className="text-lg text-charcoal/50 line-through">
                    {pack.originalPrice.toLocaleString('fr-FR')}€
                  </p>
                </div>
                {pack.savings > 0 && (
                  <div className="mt-2 text-sm font-semibold text-green-600 flex items-center gap-2 p-2 bg-green-100 rounded-lg">
                    <Gift className="w-4 h-4" />
                    <span>Économie de {pack.savings.toLocaleString('fr-FR')}€ !</span>
                  </div>
                )}
                <p className="mt-4 flex-1 text-charcoal/90">{pack.description}</p>
                <div className="mt-8">
                  <h4 className="font-semibold text-charcoal mb-3">Services inclus :</h4>
                  <ul className="space-y-3">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/services/${pack.serviceId}`}
                  className="mt-10 block w-full text-center rounded-lg px-6 py-3 text-lg font-semibold transition-opacity bg-gradient-rose text-white hover:opacity-90 shadow-rose"
                >
                  {pack.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* --- Section du Catalogue Complet --- */}
        <section
          className="mt-24 pt-20 border-t border-rose-powder/20"
          aria-labelledby="catalogue-heading"
        >
          <header className="max-w-3xl mx-auto text-center">
            <h2 id="catalogue-heading" className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
              Catalogue Complet de Services
            </h2>
            <p className="mt-6 text-lg leading-8 text-charcoal/80">
              Explorez tous nos services spécialisés et construisez votre projet sur-mesure.
            </p>
          </header>
          {isLoading && <CatalogueLoader />}
          {isError && (
            <div className="text-center text-red-600 font-semibold my-10">
              Impossible de charger les services pour le catalogue.
            </div>
          )}
          {services && (
            // Passe les services à la section catalogue/services (adapter si besoin)
            <></>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
