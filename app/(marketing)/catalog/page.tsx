'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Types pour les produits/services
interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  image: string;
  featured: boolean;
  popular: boolean;
  complexity: 'Débutant' | 'Intermédiaire' | 'Avancé';
  deliveryTime: string;
}

// Données factices pour le catalogue
const catalogItems: CatalogItem[] = [
  {
    id: 'site-vitrine-premium',
    name: 'Site Vitrine Premium',
    description: 'Site web professionnel avec design sur-mesure, responsive et optimisé SEO. Parfait pour présenter votre entreprise avec élégance.',
    price: 1200,
    originalPrice: 1500,
    category: 'Sites Web',
    tags: ['Responsive', 'SEO', 'Design'],
    rating: 4.9,
    reviewCount: 47,
    image: '/images/catalog/site-vitrine.jpg',
    featured: true,
    popular: true,
    complexity: 'Intermédiaire',
    deliveryTime: '5-7 jours'
  },
  {
    id: 'landing-page-conversion',
    name: 'Landing Page Conversion',
    description: 'Page de destination optimisée pour maximiser vos conversions. Design persuasif et intégrations marketing avancées.',
    price: 800,
    category: 'Landing Pages',
    tags: ['Conversion', 'Marketing', 'Analytics'],
    rating: 4.8,
    reviewCount: 32,
    image: '/images/catalog/landing-page.jpg',
    featured: false,
    popular: true,
    complexity: 'Intermédiaire',
    deliveryTime: '3-5 jours'
  },
  {
    id: 'ecommerce-boutique',
    name: 'Boutique E-commerce',
    description: 'Solution e-commerce complète avec gestion des stocks, paiements sécurisés et tableau de bord administrateur.',
    price: 2500,
    originalPrice: 3000,
    category: 'E-commerce',
    tags: ['Paiement', 'Stocks', 'Admin'],
    rating: 4.9,
    reviewCount: 28,
    image: '/images/catalog/ecommerce.jpg',
    featured: true,
    popular: false,
    complexity: 'Avancé',
    deliveryTime: '10-14 jours'
  },
  {
    id: 'app-mobile-pwa',
    name: 'Application Mobile PWA',
    description: 'Application web progressive qui fonctionne comme une app native. Compatible iOS et Android.',
    price: 1800,
    category: 'Applications',
    tags: ['Mobile', 'PWA', 'Cross-platform'],
    rating: 4.7,
    reviewCount: 19,
    image: '/images/catalog/pwa.jpg',
    featured: false,
    popular: false,
    complexity: 'Avancé',
    deliveryTime: '8-12 jours'
  },
  {
    id: 'integration-web3',
    name: 'Intégration Web3',
    description: 'Connectez votre site aux technologies blockchain. Wallet, NFT, smart contracts et plus encore.',
    price: 3500,
    category: 'Blockchain',
    tags: ['Web3', 'NFT', 'Crypto'],
    rating: 4.8,
    reviewCount: 15,
    image: '/images/catalog/web3.jpg',
    featured: true,
    popular: false,
    complexity: 'Avancé',
    deliveryTime: '15-20 jours'
  },
  {
    id: 'maintenance-premium',
    name: 'Maintenance Premium',
    description: 'Service de maintenance complet avec mises à jour, sauvegardes, monitoring et support prioritaire.',
    price: 150,
    category: 'Services',
    tags: ['Maintenance', 'Support', 'Monitoring'],
    rating: 4.9,
    reviewCount: 89,
    image: '/images/catalog/maintenance.jpg',
    featured: false,
    popular: true,
    complexity: 'Débutant',
    deliveryTime: 'Mensuel'
  }
];

const categories = ['Tous', 'Sites Web', 'Landing Pages', 'E-commerce', 'Applications', 'Blockchain', 'Services'];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filteredItems = useMemo(() => {
    let filtered = catalogItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Tri
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="bg-cream min-h-screen py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-rose-powder/30 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-magenta" />
            <span className="text-sm font-medium text-charcoal">Catalogue Complet</span>
          </div>
          
          <h1 className="text-4xl font-playfair font-bold tracking-tight text-charcoal sm:text-6xl">
            Nos Produits & Services
          </h1>
          <p className="mt-6 text-xl leading-8 text-charcoal/80 max-w-3xl mx-auto">
            Découvrez notre gamme complète de solutions digitales. Des sites vitrines aux intégrations Web3, 
            trouvez le service parfait pour votre projet.
          </p>
          
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
              <li><Link href="/" className="hover:text-magenta transition-colors">Accueil</Link></li>
              <li className="before:content-['/'] before:mx-2">Catalogue</li>
            </ol>
          </nav>
        </header>

        {/* Filtres et recherche */}
        <div className="mb-12 space-y-6">
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un service, une technologie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-rose-powder/30 focus:border-magenta focus:ring-magenta"
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Catégories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-gradient-rose text-white" 
                    : "border-rose-powder/30 text-charcoal hover:border-magenta"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-4">
              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-rose-powder/30 rounded-lg text-sm focus:border-magenta focus:ring-magenta"
              >
                <option value="popular">Plus populaires</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>

              {/* Mode d'affichage */}
              <div className="flex border border-rose-powder/30 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-rose-powder/20' : ''}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-rose-powder/20' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-8">
          <p className="text-charcoal/60 text-center">
            {filteredItems.length} service{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
            {selectedCategory !== 'Tous' && ` dans "${selectedCategory}"`}
          </p>
        </div>

        {/* Grille/Liste des produits */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "space-y-6"
        }>
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-rose hover:shadow-rose-lg transition-all duration-300 group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} bg-gradient-to-br from-rose-powder/20 to-magenta/20`}>
                {item.featured && (
                  <Badge className="absolute top-3 left-3 bg-magenta text-white">
                    Recommandé
                  </Badge>
                )}
                {item.popular && (
                  <Badge className="absolute top-3 right-3 bg-gradient-rose text-white">
                    Populaire
                  </Badge>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-magenta/40" />
                </div>
              </div>

              {/* Contenu */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-charcoal group-hover:text-magenta transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-charcoal/60">{item.category}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-charcoal/40 hover:text-magenta">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-charcoal/80 mb-4 line-clamp-2">{item.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Rating et complexité */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-sm text-charcoal/60">({item.reviewCount})</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.complexity}
                  </Badge>
                </div>

                {/* Prix et CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-magenta">
                        {item.price.toLocaleString('fr-FR')}€
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-charcoal/50 line-through">
                          {item.originalPrice.toLocaleString('fr-FR')}€
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal/60">Livraison: {item.deliveryTime}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Link href={`/catalog/${item.id}`}>
                      <Button size="sm" className="bg-gradient-rose text-white hover:opacity-90">
                        Voir
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-rose-powder/20 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-magenta/40" />
            </div>
            <h3 className="text-xl font-playfair font-bold text-charcoal mb-2">
              Aucun service trouvé
            </h3>
            <p className="text-charcoal/60 mb-6">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tous');
              }}
              className="bg-gradient-rose text-white hover:opacity-90"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <div className="bg-gradient-to-br from-rose-powder/10 to-magenta/10 rounded-3xl p-12">
            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">
              Besoin d'un Service Personnalisé ?
            </h2>
            <p className="text-xl text-charcoal/80 mb-8 max-w-2xl mx-auto">
              Votre projet nécessite une approche unique ? Discutons ensemble de vos besoins 
              spécifiques pour créer la solution parfaite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-rose text-white hover:opacity-90 px-8">
                  Demander un Devis Personnalisé
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

