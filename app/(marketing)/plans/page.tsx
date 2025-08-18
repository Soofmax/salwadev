import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Check, 
  X, 
  Star, 
  Sparkles, 
  Crown, 
  Zap, 
  Shield, 
  Users,
  ChevronRight,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Plans & Abonnements | Solutions Web Récurrentes - SDS',
  description: 'Découvrez nos plans d\'abonnement pour la maintenance, le support et les services web récurrents. Solutions adaptées aux PME et entrepreneurs.',
  openGraph: {
    title: 'Plans & Abonnements | SDS',
    description: 'Solutions web récurrentes adaptées à vos besoins',
  },
};

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  popular: boolean;
  recommended: boolean;
  features: PlanFeature[];
  benefits: string[];
  cta: string;
  color: 'basic' | 'popular' | 'premium';
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Parfait pour débuter votre présence en ligne',
    price: 49,
    period: 'mois',
    popular: false,
    recommended: false,
    color: 'basic',
    cta: 'Commencer',
    features: [
      { name: 'Site vitrine 3 pages', included: true },
      { name: 'Design responsive', included: true },
      { name: 'Hébergement inclus', included: true },
      { name: 'SSL gratuit', included: true },
      { name: 'Support email', included: true },
      { name: 'Maintenance de base', included: true },
      { name: 'Analytics de base', included: true },
      { name: 'SEO avancé', included: false },
      { name: 'E-commerce', included: false },
      { name: 'Support prioritaire', included: false },
      { name: 'Sauvegardes quotidiennes', included: false },
      { name: 'Intégrations avancées', included: false }
    ],
    benefits: [
      'Présence en ligne professionnelle',
      'Maintenance automatique',
      'Support technique inclus'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    description: 'La solution complète pour les entreprises en croissance',
    price: 149,
    originalPrice: 199,
    period: 'mois',
    popular: true,
    recommended: true,
    color: 'popular',
    cta: 'Choisir Business',
    features: [
      { name: 'Site vitrine 10 pages', included: true },
      { name: 'Design responsive', included: true },
      { name: 'Hébergement inclus', included: true },
      { name: 'SSL gratuit', included: true },
      { name: 'Support email', included: true },
      { name: 'Maintenance de base', included: true },
      { name: 'Analytics de base', included: true },
      { name: 'SEO avancé', included: true },
      { name: 'E-commerce (50 produits)', included: true },
      { name: 'Support prioritaire', included: true },
      { name: 'Sauvegardes quotidiennes', included: true },
      { name: 'Intégrations avancées', included: false }
    ],
    benefits: [
      'Boutique en ligne intégrée',
      'Optimisation SEO complète',
      'Support prioritaire 24/7',
      'Sauvegardes automatiques'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Solution premium pour les grandes ambitions',
    price: 299,
    originalPrice: 399,
    period: 'mois',
    popular: false,
    recommended: false,
    color: 'premium',
    cta: 'Contacter',
    features: [
      { name: 'Site illimité', included: true },
      { name: 'Design responsive', included: true },
      { name: 'Hébergement inclus', included: true },
      { name: 'SSL gratuit', included: true },
      { name: 'Support email', included: true },
      { name: 'Maintenance de base', included: true },
      { name: 'Analytics de base', included: true },
      { name: 'SEO avancé', included: true },
      { name: 'E-commerce illimité', included: true },
      { name: 'Support prioritaire', included: true },
      { name: 'Sauvegardes quotidiennes', included: true },
      { name: 'Intégrations avancées', included: true }
    ],
    benefits: [
      'Solution entièrement personnalisée',
      'Intégrations API illimitées',
      'Support dédié 24/7',
      'Consultation stratégique incluse'
    ]
  }
];

const additionalServices = [
  {
    name: 'Maintenance Premium',
    description: 'Surveillance 24/7, mises à jour automatiques, optimisations mensuelles',
    price: 79,
    period: 'mois'
  },
  {
    name: 'SEO Boost',
    description: 'Optimisation SEO avancée, audit mensuel, stratégie de contenu',
    price: 199,
    period: 'mois'
  },
  {
    name: 'Support Prioritaire',
    description: 'Réponse garantie sous 2h, support téléphonique, assistance dédiée',
    price: 99,
    period: 'mois'
  }
];

export default function PlansPage() {
  return (
    <div className="bg-cream min-h-screen py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-rose-powder/30 rounded-full px-6 py-2 mb-8">
            <Crown className="w-4 h-4 text-magenta" />
            <span className="text-sm font-medium text-charcoal">Plans & Abonnements</span>
          </div>
          
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-6xl">
            Choisissez Votre Plan
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal/80 max-w-3xl mx-auto">
            Des solutions web récurrentes adaptées à vos besoins. Maintenance, support et évolutions 
            inclus pour faire grandir votre présence en ligne.
          </p>
          
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
              <li><Link href="/" className="hover:text-magenta transition-colors">Accueil</Link></li>
              <li className="before:content-['/'] before:mx-2">Plans</li>
            </ol>
          </nav>
        </header>

        {/* Toggle de facturation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-rose-powder/30 rounded-full p-1">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="rounded-full bg-gradient-rose text-white">
                Mensuel
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full text-charcoal/60">
                Annuel
                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">-20%</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Grille des plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-rose-lg ${
                plan.popular 
                  ? 'ring-2 ring-magenta shadow-rose-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-rose text-white text-center py-2 text-sm font-semibold">
                  <Star className="w-4 h-4 inline mr-1" />
                  LE PLUS POPULAIRE
                </div>
              )}
              
              {plan.recommended && (
                <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                  Recommandé
                </Badge>
              )}

              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
                  {plan.name}
                </CardTitle>
                <p className="text-charcoal/60 mt-2">{plan.description}</p>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-magenta">
                      {plan.price}€
                    </span>
                    <span className="text-charcoal/60">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-lg text-charcoal/50 line-through">
                        {plan.originalPrice}€
                      </span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Gift className="w-3 h-3 mr-1" />
                        -{Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Fonctionnalités */}
                <div>
                  <h4 className="font-semibold text-charcoal mb-3">Fonctionnalités incluses :</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-charcoal' : 'text-charcoal/40'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bénéfices */}
                <div>
                  <h4 className="font-semibold text-charcoal mb-3">Bénéfices clés :</h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Sparkles className="w-4 h-4 text-magenta mt-1 flex-shrink-0" />
                        <span className="text-sm text-charcoal/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button 
                    className={`w-full py-3 ${
                      plan.popular 
                        ? 'bg-gradient-rose text-white hover:opacity-90' 
                        : 'border-magenta text-magenta hover:bg-magenta hover:text-white'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services additionnels */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">
              Services Additionnels
            </h2>
            <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
              Boostez votre plan avec nos services spécialisés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-rose transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
                    {service.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="text-2xl font-bold text-magenta mb-4">
                    +{service.price}€<span className="text-sm text-charcoal/60">/{service.period}</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                    Ajouter
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">
              Questions Fréquentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Puis-je changer de plan à tout moment ?",
                answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement."
              },
              {
                question: "Que se passe-t-il si j'annule mon abonnement ?",
                answer: "Vous gardez l'accès à votre site jusqu'à la fin de votre période de facturation. Nous pouvons également vous fournir une sauvegarde complète."
              },
              {
                question: "Le support technique est-il vraiment inclus ?",
                answer: "Absolument ! Tous nos plans incluent un support technique. Le niveau de priorité varie selon votre plan."
              },
              {
                question: "Puis-je avoir un plan personnalisé ?",
                answer: "Bien sûr ! Contactez-nous pour discuter de vos besoins spécifiques et obtenir un devis sur-mesure."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                  <p className="text-charcoal/80">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-rose-powder/10 to-magenta/10 rounded-3xl p-12">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">
              Besoin d'Aide pour Choisir ?
            </h2>
            <p className="text-xl text-charcoal/80 mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous conseiller et vous aider à trouver 
              la solution parfaite pour votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-rose text-white hover:opacity-90 px-8">
                  Consultation Gratuite
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-magenta text-magenta hover:bg-magenta hover:text-white px-8">
                  Voir Tous les Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

