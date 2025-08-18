import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  Check, 
  ArrowRight, 
  Star, 
  Shield, 
  Zap, 
  Clock, 
  ChevronRight, 
  Heart,
  ShoppingCart,
  Sparkles,
  Users,
  Award,
  MessageCircle,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types pour les produits
interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
  complexity: 'Débutant' | 'Intermédiaire' | 'Avancé';
  deliveryTime: string;
  features: string[];
  benefits: string[];
  process: string[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    rating: number;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

// Données factices des produits
const products: Product[] = [
  {
    id: 'site-vitrine-premium',
    name: 'Site Vitrine Premium',
    description: 'Site web professionnel avec design sur-mesure, responsive et optimisé SEO.',
    longDescription: 'Créez une présence en ligne exceptionnelle avec notre site vitrine premium. Conçu spécialement pour les PME et entrepreneurs, ce service combine design élégant, performance technique et optimisation SEO pour vous démarquer de la concurrence.',
    price: 1200,
    originalPrice: 1500,
    category: 'Sites Web',
    tags: ['Responsive', 'SEO', 'Design', 'CMS'],
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    popular: true,
    complexity: 'Intermédiaire',
    deliveryTime: '5-7 jours',
    features: [
      'Design sur-mesure et responsive',
      'Optimisation SEO avancée',
      'Interface d\'administration intuitive',
      'Intégration Google Analytics',
      'Formulaire de contact sécurisé',
      'Optimisation des performances',
      'Hébergement inclus 1 an',
      'Support technique 6 mois'
    ],
    benefits: [
      'Augmentez votre visibilité en ligne',
      'Générez plus de leads qualifiés',
      'Renforcez votre crédibilité',
      'Économisez du temps de gestion'
    ],
    process: [
      'Analyse de vos besoins et objectifs',
      'Création des maquettes et validation',
      'Développement et intégration',
      'Tests et optimisations',
      'Formation et mise en ligne'
    ],
    testimonials: [
      {
        name: 'Marie Dubois',
        role: 'CEO, Studio Créatif',
        content: 'Notre nouveau site vitrine a dépassé toutes nos attentes. Le design est magnifique et nous recevons 3x plus de demandes qu\'avant.',
        rating: 5
      },
      {
        name: 'Thomas Martin',
        role: 'Fondateur, TechStart',
        content: 'Professionnalisme exemplaire et résultat à la hauteur. Je recommande vivement pour tous vos projets web.',
        rating: 5
      }
    ],
    faq: [
      {
        question: 'Combien de pages sont incluses ?',
        answer: 'Le pack inclut jusqu\'à 5 pages principales (accueil, à propos, services, portfolio, contact). Des pages supplémentaires peuvent être ajoutées.'
      },
      {
        question: 'Le site sera-t-il responsive ?',
        answer: 'Absolument ! Tous nos sites sont conçus pour s\'adapter parfaitement à tous les écrans (mobile, tablette, desktop).'
      },
      {
        question: 'Puis-je modifier le contenu moi-même ?',
        answer: 'Oui, nous intégrons un système de gestion de contenu simple qui vous permet de modifier textes et images facilement.'
      }
    ]
  }
  // Autres produits...
];

// ✅ CORRECTED: Next.js 15 compatible interface
interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

// Fonction pour récupérer un produit
function getProduct(productId: string): Product | null {
  return products.find(p => p.id === productId) || null;
}

// ✅ CORRECTED: Async generateMetadata function for Next.js 15
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params; // ✅ Await params
  const product = getProduct(productId);
  
  if (!product) {
    return {
      title: 'Produit non trouvé',
    };
  }

  return {
    title: `${product.name} | Catalogue SDS`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'article',
    },
  };
}

// ✅ CORRECTED: Async function component for Next.js 15
export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params; // ✅ Await params
  const product = getProduct(productId);

  if (!product) {
    notFound();
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercentage = product.originalPrice 
    ? Math.round((savings / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-cream min-h-screen py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-charcoal/60">
            <li><Link href="/" className="hover:text-magenta transition-colors">Accueil</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><Link href="/catalog" className="hover:text-magenta transition-colors">Catalogue</Link></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-charcoal">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header du produit */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-gradient-rose text-white">{product.category}</Badge>
                {product.popular && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                )}
                {product.featured && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    Recommandé
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-playfair font-bold text-charcoal mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">{product.rating}</span>
                  <span className="text-sm text-charcoal/60">({product.reviewCount} avis)</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.complexity}
                </Badge>
              </div>

              <p className="text-xl text-charcoal/80 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Image du produit */}
            <div className="aspect-video bg-gradient-to-br from-rose-powder/20 to-magenta/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-magenta/40 mx-auto mb-4" />
                <p className="text-charcoal/60">Aperçu du produit</p>
              </div>
            </div>

            {/* Fonctionnalités */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Fonctionnalités Incluses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Avantages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 text-magenta mr-2" />
                  Bénéfices pour Votre Entreprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-magenta mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Processus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 text-magenta mr-2" />
                  Notre Processus de Travail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-rose text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-charcoal/80 pt-1">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Témoignages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-magenta mr-2" />
                  Témoignages Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {product.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-magenta pl-4">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-charcoal/80 italic mb-2">"{testimonial.content}"</p>
                      <div className="text-sm">
                        <span className="font-medium text-charcoal">{testimonial.name}</span>
                        <span className="text-charcoal/60"> - {testimonial.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Questions Fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.faq.map((item, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-charcoal mb-2">{item.question}</h4>
                      <p className="text-charcoal/80 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prix et commande */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-magenta">
                      {product.price.toLocaleString('fr-FR')}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-charcoal/50 line-through">
                        {product.originalPrice.toLocaleString('fr-FR')}€
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full inline-block">
                      Économisez {savings}€ ({discountPercentage}%)
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Livraison:</span>
                    <span className="font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {product.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Complexité:</span>
                    <Badge variant="outline" className="text-xs">
                      {product.complexity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Support:</span>
                    <span className="font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      6 mois inclus
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-rose text-white hover:opacity-90 py-3">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Ajouter au Panier
                  </Button>
                  <Button variant="outline" className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white">
                    <Heart className="w-5 h-5 mr-2" />
                    Ajouter aux Favoris
                  </Button>
                  <Link href="/contact" className="block">
                    <Button variant="ghost" className="w-full text-charcoal hover:text-magenta">
                      Demander un Devis Personnalisé
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Garanties */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-playfair text-lg font-bold text-charcoal mb-4">
                  Nos Garanties
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-charcoal/80">Satisfaction garantie</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-charcoal/80">Livraison dans les délais</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-charcoal/80">Support personnalisé</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-playfair text-lg font-bold text-charcoal mb-2">
                  Une Question ?
                </h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  Notre équipe est là pour vous accompagner
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white">
                    Nous Contacter
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
