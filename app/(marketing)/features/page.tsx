import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Check, 
  X, 
  Star, 
  Sparkles, 
  Zap, 
  Shield, 
  Globe,
  Smartphone,
  Search,
  ShoppingCart,
  BarChart,
  Users,
  Settings,
  Headphones,
  ChevronRight,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Comparatif des Fonctionnalités | Services Web - SDS',
  description: 'Comparez toutes les fonctionnalités de nos services web, plans d\'abonnement et solutions digitales. Trouvez la solution parfaite pour votre projet.',
  openGraph: {
    title: 'Comparatif des Fonctionnalités | SDS',
    description: 'Comparez nos services et trouvez la solution parfaite',
  },
};

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

interface Service {
  id: string;
  name: string;
  type: 'service' | 'plan';
  price: number;
  period?: string;
  popular: boolean;
  features: { [featureId: string]: boolean | string };
}

const featureCategories = [
  { id: 'design', name: 'Design & Interface', icon: Sparkles },
  { id: 'technical', name: 'Technique & Performance', icon: Zap },
  { id: 'seo', name: 'SEO & Marketing', icon: Search },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart },
  { id: 'analytics', name: 'Analytics & Reporting', icon: BarChart },
  { id: 'support', name: 'Support & Maintenance', icon: Headphones }
];

const features: Feature[] = [
  // Design & Interface
  { id: 'responsive', name: 'Design Responsive', description: 'Adaptation automatique à tous les écrans', icon: Smartphone, category: 'design' },
  { id: 'custom-design', name: 'Design Sur-Mesure', description: 'Interface unique créée spécialement pour vous', icon: Sparkles, category: 'design' },
  { id: 'animations', name: 'Animations & Interactions', description: 'Effets visuels et micro-interactions', icon: Zap, category: 'design' },
  { id: 'branding', name: 'Intégration Branding', description: 'Respect de votre identité visuelle', icon: Star, category: 'design' },
  
  // Technique & Performance
  { id: 'ssl', name: 'Certificat SSL', description: 'Sécurisation HTTPS incluse', icon: Shield, category: 'technical' },
  { id: 'hosting', name: 'Hébergement Inclus', description: 'Hébergement haute performance', icon: Globe, category: 'technical' },
  { id: 'speed-optimization', name: 'Optimisation Vitesse', description: 'Temps de chargement optimisés', icon: Zap, category: 'technical' },
  { id: 'backup', name: 'Sauvegardes Automatiques', description: 'Protection de vos données', icon: Shield, category: 'technical' },
  
  // SEO & Marketing
  { id: 'seo-basic', name: 'SEO de Base', description: 'Optimisation SEO fondamentale', icon: Search, category: 'seo' },
  { id: 'seo-advanced', name: 'SEO Avancé', description: 'Stratégie SEO complète et suivi', icon: Search, category: 'seo' },
  { id: 'analytics', name: 'Google Analytics', description: 'Suivi des performances et visiteurs', icon: BarChart, category: 'seo' },
  { id: 'social-integration', name: 'Intégration Réseaux Sociaux', description: 'Connexion avec vos profils sociaux', icon: Users, category: 'seo' },
  
  // E-commerce
  { id: 'online-store', name: 'Boutique en Ligne', description: 'Système de vente en ligne complet', icon: ShoppingCart, category: 'ecommerce' },
  { id: 'payment-gateway', name: 'Passerelle de Paiement', description: 'Paiements sécurisés (CB, PayPal...)', icon: ShoppingCart, category: 'ecommerce' },
  { id: 'inventory', name: 'Gestion des Stocks', description: 'Suivi automatique des inventaires', icon: BarChart, category: 'ecommerce' },
  { id: 'shipping', name: 'Gestion Livraisons', description: 'Calcul automatique des frais de port', icon: ShoppingCart, category: 'ecommerce' },
  
  // Analytics & Reporting
  { id: 'dashboard', name: 'Tableau de Bord', description: 'Interface d\'administration intuitive', icon: BarChart, category: 'analytics' },
  { id: 'reports', name: 'Rapports Détaillés', description: 'Analyses approfondies des performances', icon: BarChart, category: 'analytics' },
  { id: 'real-time', name: 'Données Temps Réel', description: 'Suivi en direct de l\'activité', icon: Zap, category: 'analytics' },
  
  // Support & Maintenance
  { id: 'email-support', name: 'Support Email', description: 'Assistance par email', icon: Headphones, category: 'support' },
  { id: 'priority-support', name: 'Support Prioritaire', description: 'Réponse garantie sous 2h', icon: Headphones, category: 'support' },
  { id: 'phone-support', name: 'Support Téléphonique', description: 'Assistance téléphonique directe', icon: Headphones, category: 'support' },
  { id: 'maintenance', name: 'Maintenance Incluse', description: 'Mises à jour et corrections automatiques', icon: Settings, category: 'support' }
];

const services: Service[] = [
  {
    id: 'site-vitrine',
    name: 'Site Vitrine',
    type: 'service',
    price: 1200,
    popular: false,
    features: {
      'responsive': true,
      'custom-design': true,
      'animations': false,
      'branding': true,
      'ssl': true,
      'hosting': '1 an',
      'speed-optimization': true,
      'backup': false,
      'seo-basic': true,
      'seo-advanced': false,
      'analytics': true,
      'social-integration': true,
      'online-store': false,
      'payment-gateway': false,
      'inventory': false,
      'shipping': false,
      'dashboard': true,
      'reports': false,
      'real-time': false,
      'email-support': true,
      'priority-support': false,
      'phone-support': false,
      'maintenance': '6 mois'
    }
  },
  {
    id: 'ecommerce',
    name: 'Site E-commerce',
    type: 'service',
    price: 2500,
    popular: true,
    features: {
      'responsive': true,
      'custom-design': true,
      'animations': true,
      'branding': true,
      'ssl': true,
      'hosting': '1 an',
      'speed-optimization': true,
      'backup': true,
      'seo-basic': true,
      'seo-advanced': true,
      'analytics': true,
      'social-integration': true,
      'online-store': true,
      'payment-gateway': true,
      'inventory': true,
      'shipping': true,
      'dashboard': true,
      'reports': true,
      'real-time': true,
      'email-support': true,
      'priority-support': true,
      'phone-support': false,
      'maintenance': '12 mois'
    }
  },
  {
    id: 'plan-starter',
    name: 'Plan Starter',
    type: 'plan',
    price: 49,
    period: 'mois',
    popular: false,
    features: {
      'responsive': true,
      'custom-design': false,
      'animations': false,
      'branding': false,
      'ssl': true,
      'hosting': true,
      'speed-optimization': true,
      'backup': false,
      'seo-basic': true,
      'seo-advanced': false,
      'analytics': true,
      'social-integration': false,
      'online-store': false,
      'payment-gateway': false,
      'inventory': false,
      'shipping': false,
      'dashboard': true,
      'reports': false,
      'real-time': false,
      'email-support': true,
      'priority-support': false,
      'phone-support': false,
      'maintenance': true
    }
  },
  {
    id: 'plan-business',
    name: 'Plan Business',
    type: 'plan',
    price: 149,
    period: 'mois',
    popular: true,
    features: {
      'responsive': true,
      'custom-design': true,
      'animations': true,
      'branding': true,
      'ssl': true,
      'hosting': true,
      'speed-optimization': true,
      'backup': true,
      'seo-basic': true,
      'seo-advanced': true,
      'analytics': true,
      'social-integration': true,
      'online-store': true,
      'payment-gateway': true,
      'inventory': true,
      'shipping': true,
      'dashboard': true,
      'reports': true,
      'real-time': false,
      'email-support': true,
      'priority-support': true,
      'phone-support': false,
      'maintenance': true
    }
  },
  {
    id: 'plan-enterprise',
    name: 'Plan Enterprise',
    type: 'plan',
    price: 299,
    period: 'mois',
    popular: false,
    features: {
      'responsive': true,
      'custom-design': true,
      'animations': true,
      'branding': true,
      'ssl': true,
      'hosting': true,
      'speed-optimization': true,
      'backup': true,
      'seo-basic': true,
      'seo-advanced': true,
      'analytics': true,
      'social-integration': true,
      'online-store': true,
      'payment-gateway': true,
      'inventory': true,
      'shipping': true,
      'dashboard': true,
      'reports': true,
      'real-time': true,
      'email-support': true,
      'priority-support': true,
      'phone-support': true,
      'maintenance': true
    }
  }
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-green-500 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-300 mx-auto" />
    );
  }
  
  return (
    <span className="text-sm text-charcoal font-medium">{value}</span>
  );
}

export default function FeaturesPage() {
  return (
    <div className="bg-cream min-h-screen py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-rose-powder/30 rounded-full px-6 py-2 mb-8">
            <BarChart className="w-4 h-4 text-magenta" />
            <span className="text-sm font-medium text-charcoal">Comparatif Détaillé</span>
          </div>
          
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-6xl">
            Comparatif des Fonctionnalités
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal/80 max-w-3xl mx-auto">
            Comparez en détail toutes les fonctionnalités de nos services et plans d'abonnement. 
            Trouvez la solution qui correspond parfaitement à vos besoins.
          </p>
          
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
              <li><Link href="/" className="hover:text-magenta transition-colors">Accueil</Link></li>
              <li className="before:content-['/'] before:mx-2">Fonctionnalités</li>
            </ol>
          </nav>
        </header>

        {/* Tableau de comparaison */}
        <div className="overflow-x-auto mb-16">
          <div className="min-w-full">
            {/* En-têtes des services */}
            <div className="grid grid-cols-6 gap-4 mb-8">
              <div className="col-span-1"></div>
              {services.map((service) => (
                <Card key={service.id} className={`text-center ${service.popular ? 'ring-2 ring-magenta' : ''}`}>
                  <CardContent className="p-4">
                    {service.popular && (
                      <Badge className="bg-gradient-rose text-white mb-2">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    )}
                    <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
                      {service.name}
                    </h3>
                    <div className="text-2xl font-bold text-magenta">
                      {service.price}€
                      {service.period && <span className="text-sm text-charcoal/60">/{service.period}</span>}
                    </div>
                    <Button 
                      size="sm" 
                      className={`mt-3 w-full ${
                        service.popular 
                          ? 'bg-gradient-rose text-white hover:opacity-90' 
                          : 'border-magenta text-magenta hover:bg-magenta hover:text-white'
                      }`}
                      variant={service.popular ? 'default' : 'outline'}
                    >
                      Choisir
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparaison par catégorie */}
            {featureCategories.map((category) => {
              const categoryFeatures = features.filter(f => f.category === category.id);
              
              return (
                <div key={category.id} className="mb-12">
                  <div className="flex items-center mb-6">
                    <category.icon className="w-6 h-6 text-magenta mr-3" />
                    <h2 className="text-2xl font-playfair font-bold text-charcoal">
                      {category.name}
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      {categoryFeatures.map((feature, index) => (
                        <div 
                          key={feature.id} 
                          className={`grid grid-cols-6 gap-4 p-4 items-center ${
                            index !== categoryFeatures.length - 1 ? 'border-b border-rose-powder/20' : ''
                          }`}
                        >
                          <div className="col-span-1">
                            <div className="flex items-start space-x-3">
                              <feature.icon className="w-5 h-5 text-magenta mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-charcoal">{feature.name}</h4>
                                <p className="text-sm text-charcoal/60">{feature.description}</p>
                              </div>
                            </div>
                          </div>
                          {services.map((service) => (
                            <div key={service.id} className="text-center">
                              <FeatureValue value={service.features[feature.id] || false} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aide au choix */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">
              Besoin d'Aide pour Choisir ?
            </h2>
            <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
              Nos experts vous accompagnent dans le choix de la solution parfaite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-rose transition-all duration-300">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-magenta mx-auto mb-4" />
                <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
                  Consultation Gratuite
                </h3>
                <p className="text-charcoal/60 mb-4">
                  Échangez avec nos experts pour définir vos besoins précis
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                    Prendre RDV
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-rose transition-all duration-300">
              <CardContent className="p-6">
                <Info className="w-12 h-12 text-magenta mx-auto mb-4" />
                <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
                  Guide Personnalisé
                </h3>
                <p className="text-charcoal/60 mb-4">
                  Recevez des recommandations adaptées à votre secteur
                </p>
                <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                  Télécharger
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-rose transition-all duration-300">
              <CardContent className="p-6">
                <Sparkles className="w-12 h-12 text-magenta mx-auto mb-4" />
                <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
                  Devis Sur-Mesure
                </h3>
                <p className="text-charcoal/60 mb-4">
                  Obtenez un devis personnalisé pour votre projet unique
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                    Demander
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-rose-powder/10 to-magenta/10 rounded-3xl p-12">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">
              Prêt à Commencer Votre Projet ?
            </h2>
            <p className="text-xl text-charcoal/80 mb-8 max-w-2xl mx-auto">
              Choisissez la solution qui vous convient et lancez votre présence en ligne dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-gradient-rose text-white hover:opacity-90 px-8">
                  Voir Tous les Services
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/plans">
                <Button variant="outline" size="lg" className="border-magenta text-magenta hover:bg-magenta hover:text-white px-8">
                  Découvrir les Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

