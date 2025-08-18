import ContactCard from '@/app/components/contact/ContactCard';
import ContactForm from '@/app/components/contact/ContactForm';
import ContactFaq from '@/app/components/contact/ContactFaq';

// Définir les types pour TypeScript
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

// Données avec types explicites
const quickFaq: FAQ[] = [
  {
    id: '1',
    question: 'Quel est le délai moyen pour un projet web ?',
    answer: 'Le délai varie selon la complexité, généralement entre 4 à 12 semaines pour un site vitrine ou e-commerce standard.'
  },
  {
    id: '2',
    question: 'Proposez-vous de la maintenance après livraison ?',
    answer: 'Oui, nous proposons des contrats de maintenance incluant mises à jour, sauvegardes et support technique.'
  },
  {
    id: '3',
    question: 'Travaillez-vous avec des budgets serrés ?',
    answer: 'Nous adaptons nos solutions selon votre budget en priorisant les fonctionnalités essentielles.'
  }
];

const quickServices: Service[] = [
  {
    id: '1',
    title: 'Audit gratuit',
    description: 'Analyse de votre site actuel avec recommandations personnalisées',
    icon: 'search'
  },
  {
    id: '2',
    title: 'Devis sous 48h',
    description: 'Réponse rapide avec estimation détaillée de votre projet',
    icon: 'clock'
  },
  {
    id: '3',
    title: 'Consultation stratégique',
    description: 'Conseils pour optimiser votre présence digitale',
    icon: 'lightbulb'
  }
];

import PageContainer from '@/components/ui/PageContainer';

export default function ContactPage() {
  return (
    <PageContainer className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-charcoal mb-6">Contact</h1>
        {/* Hero Section, Breadcrumb, etc. */}
        
        <section className="mt-20">
          <ContactCard />
        </section>

        <section className="mt-24 pt-20 border-t border-rose-powder/20">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                Parlez-nous de votre projet
              </h2>
              <p className="mt-6 text-lg leading-8 text-charcoal/80">
                Plus vous nous en direz, mieux nous pourrons vous conseiller
              </p>
            </header>
            <div className="bg-white rounded-2xl p-8 border border-rose-powder/30 shadow-rose">
              <ContactForm />
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
