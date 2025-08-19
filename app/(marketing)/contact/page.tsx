'use client';

import { useSearchParams } from 'next/navigation';
import ContactCard from '@/app/components/contact/ContactCard';
import ContactFaq from '@/app/components/contact/ContactFaq';
import { QuoteForm } from '@/components/forms/QuoteForm';

// ...FAQ/services data unchanged...

export default function ContactPage() {
  const searchParams = useSearchParams();
  // Parse possible cartItems or serviceId/addOnId from query
  let initialItems = [];
  const cartItems = searchParams.get('cartItems');
  const serviceId = searchParams.get('serviceId');
  const addOnId = searchParams.get('addOnId');
  try {
    if (cartItems) {
      initialItems = JSON.parse(decodeURIComponent(cartItems));
    } else if (serviceId) {
      initialItems = [{ serviceId, addonIds: addOnId ? [addOnId] : [] }];
    }
  } catch { initialItems = []; }

  return (
    <div className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section, Breadcrumb, etc. */}
        
        <section className="mt-20">
          <ContactCard />
        </section>

        <section className="mt-24 pt-20 border-t border-rose-powder/20">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-5xl">
                Parlez-nous de votre projet
              </h2>
              <p className="mt-6 text-lg leading-8 text-charcoal/80">
                Plus vous nous en direz, mieux nous pourrons vous conseiller
              </p>
            </header>
            <div className="bg-white rounded-2xl p-8 border border-rose-powder/30 shadow-rose">
              <QuoteForm initialItems={initialItems} />
            </div>
          </div>
        </section>

        {/* Services rapides */}
        <section className="mt-24 pt-20 border-t border-rose-powder/20">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-4xl">
              Services Express
            </h2>
            <p className="mt-4 text-lg leading-8 text-charcoal/80">
              Besoin d'aide rapidement ? Nos services express sont là pour vous
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {quickServices.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-xl p-6 border border-rose-powder/30 shadow-rose hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-playfair font-bold text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 pt-20 border-t border-rose-powder/20">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-4xl">
              Questions fréquentes
            </h2>
          </header>
          <ContactFaq faqs={quickFaq} />
        </section>

        {/* CTA final */}
        <section className="mt-24 pt-20 border-t border-rose-powder/20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold tracking-tight text-charcoal sm:text-4xl mb-6">
              Prêt à donner vie à votre projet ?
            </h2>
            <p className="text-lg text-charcoal/80 mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+33123456789"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-primary hover:bg-rose-primary/90 transition-colors duration-200"
              >
                Appelez-nous
              </a>
              <a 
                href="mailto:contact@example.com"
                className="inline-flex items-center justify-center px-8 py-3 border border-rose-primary text-base font-medium rounded-md text-rose-primary bg-white hover:bg-rose-powder/10 transition-colors duration-200"
              >
                Envoyez un email
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
