'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Book, 
  Search, 
  Filter,
  Star,
  Eye,
  ThumbsUp,
  Clock,
  User,
  ChevronRight,
  FileText,
  Video,
  Download,
  ExternalLink,
  Bookmark,
  Share2,
  ArrowUpDown,
  Grid,
  List,
  Lightbulb,
  Shield,
  CreditCard,
  Settings,
  Smartphone,
  Globe,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  type: 'article' | 'tutorial' | 'faq' | 'guide';
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  articleCount: number;
  color: string;
}

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  type SortBy = 'recent' | 'popular' | 'helpful';
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const isSortBy = (v: string): v is SortBy => ['recent','popular','helpful'].includes(v);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Catégories de la base de connaissances
  const categories: Category[] = [
    {
      id: 'getting-started',
      name: 'Premiers pas',
      description: 'Guides pour débuter avec notre plateforme',
      icon: <Lightbulb className="w-6 h-6" />,
      articleCount: 15,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'account-management',
      name: 'Gestion de compte',
      description: 'Tout sur votre compte et profil utilisateur',
      icon: <User className="w-6 h-6" />,
      articleCount: 12,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'billing-payments',
      name: 'Facturation & Paiements',
      description: 'Questions sur les factures et paiements',
      icon: <CreditCard className="w-6 h-6" />,
      articleCount: 18,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'security',
      name: 'Sécurité',
      description: 'Protection de votre compte et données',
      icon: <Shield className="w-6 h-6" />,
      articleCount: 8,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'integrations',
      name: 'Intégrations',
      description: 'Connecter des services tiers',
      icon: <Settings className="w-6 h-6" />,
      articleCount: 25,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'mobile',
      name: 'Application mobile',
      description: 'Utilisation sur mobile et tablette',
      icon: <Smartphone className="w-6 h-6" />,
      articleCount: 10,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 'api',
      name: 'API & Développeurs',
      description: 'Documentation technique et API',
      icon: <Globe className="w-6 h-6" />,
      articleCount: 32,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      id: 'troubleshooting',
      name: 'Dépannage',
      description: 'Solutions aux problèmes courants',
      icon: <HelpCircle className="w-6 h-6" />,
      articleCount: 20,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  // Articles de la base de connaissances
  const articles: Article[] = [
    {
      id: '1',
      title: 'Guide de démarrage rapide',
      excerpt: 'Découvrez comment configurer votre compte et commencer à utiliser notre plateforme en quelques minutes.',
      content: 'Contenu complet du guide...',
      category: 'getting-started',
      tags: ['débutant', 'configuration', 'premier-pas'],
      author: { name: 'Sophie Martin' },
      publishedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      views: 2450,
      likes: 89,
      difficulty: 'beginner',
      estimatedReadTime: 5,
      type: 'guide',
      featured: true
    },
    {
      id: '2',
      title: 'Configuration de l\'authentification à deux facteurs',
      excerpt: 'Renforcez la sécurité de votre compte en activant l\'authentification à deux facteurs.',
      content: 'Contenu détaillé sur la 2FA...',
      category: 'security',
      tags: ['sécurité', '2fa', 'authentification'],
      author: { name: 'Thomas Dubois' },
      publishedAt: '2024-01-14T14:30:00Z',
      updatedAt: '2024-01-14T14:30:00Z',
      views: 1890,
      likes: 67,
      difficulty: 'intermediate',
      estimatedReadTime: 8,
      type: 'tutorial',
      featured: true
    },
    {
      id: '3',
      title: 'Comprendre votre facture',
      excerpt: 'Explication détaillée des éléments de votre facture et des différents frais.',
      content: 'Détails sur la facturation...',
      category: 'billing-payments',
      tags: ['facturation', 'paiement', 'tarifs'],
      author: { name: 'Marie Leroy' },
      publishedAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T09:15:00Z',
      views: 1650,
      likes: 45,
      difficulty: 'beginner',
      estimatedReadTime: 6,
      type: 'article',
      featured: false
    },
    {
      id: '4',
      title: 'Intégration avec Zapier',
      excerpt: 'Automatisez vos workflows en connectant notre plateforme avec Zapier.',
      content: 'Guide d\'intégration Zapier...',
      category: 'integrations',
      tags: ['zapier', 'automatisation', 'workflow'],
      author: { name: 'Pierre Moreau' },
      publishedAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      views: 980,
      likes: 34,
      difficulty: 'advanced',
      estimatedReadTime: 12,
      type: 'tutorial',
      featured: false
    },
    {
      id: '5',
      title: 'Résoudre les problèmes de connexion',
      excerpt: 'Solutions aux problèmes de connexion les plus courants.',
      content: 'Guide de dépannage...',
      category: 'troubleshooting',
      tags: ['connexion', 'dépannage', 'problème'],
      author: { name: 'Julie Bernard' },
      publishedAt: '2024-01-11T11:20:00Z',
      updatedAt: '2024-01-11T11:20:00Z',
      views: 2100,
      likes: 78,
      difficulty: 'beginner',
      estimatedReadTime: 4,
      type: 'faq',
      featured: false
    },
    {
      id: '6',
      title: 'API REST - Documentation complète',
      excerpt: 'Documentation complète de notre API REST avec exemples de code.',
      content: 'Documentation API...',
      category: 'api',
      tags: ['api', 'rest', 'développement'],
      author: { name: 'Antoine Rousseau' },
      publishedAt: '2024-01-10T13:00:00Z',
      updatedAt: '2024-01-10T13:00:00Z',
      views: 3200,
      likes: 156,
      difficulty: 'advanced',
      estimatedReadTime: 20,
      type: 'guide',
      featured: true
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesDifficulty = difficultyFilter === 'all' || article.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'helpful':
        return b.likes - a.likes;
      case 'recent':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  const featuredArticles = articles.filter(article => article.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'advanced':
        return 'Avancé';
      default:
        return difficulty;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial':
        return <Video className="w-4 h-4" />;
      case 'guide':
        return <Book className="w-4 h-4" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4" />;
      case 'article':
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-playfair font-bold text-charcoal">
            Base de Connaissances
          </h1>
          <p className="text-xl text-charcoal/60 max-w-3xl mx-auto">
            Trouvez des guides détaillés, tutoriels et réponses à toutes vos questions
          </p>
          
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher dans la base de connaissances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-gray-300 focus:border-magenta rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">{articles.length}</h3>
              <p className="text-charcoal/60 text-sm">Articles</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">
                {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
              </h3>
              <p className="text-charcoal/60 text-sm">Vues totales</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ThumbsUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">
                {articles.reduce((sum, article) => sum + article.likes, 0)}
              </h3>
              <p className="text-charcoal/60 text-sm">Likes</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">{featuredArticles.length}</h3>
              <p className="text-charcoal/60 text-sm">Articles vedettes</p>
            </CardContent>
          </Card>
        </div>

        {/* Articles vedettes */}
        {featuredArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
              Articles vedettes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${getDifficultyColor(article.difficulty)} text-xs`}>
                        {getDifficultyLabel(article.difficulty)}
                      </Badge>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-charcoal mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-charcoal/50 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.estimatedReadTime} min</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-rose text-white hover:opacity-90">
                      Lire l'article
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Catégories */}
        <div>
          <h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
            Parcourir par catégorie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-charcoal mb-2">{category.name}</h3>
                  <p className="text-sm text-charcoal/60 mb-3">{category.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {category.articleCount} articles
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filtres et tri */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {selectedCategory && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-charcoal/60">Catégorie:</span>
                    <Badge className="bg-magenta text-white">
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className="text-charcoal/60 hover:text-magenta"
                    >
                      ✕
                    </Button>
                  </div>
                )}
                
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (isSortBy(v)) setSortBy(v);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="recent">Plus récents</option>
                  <option value="popular">Plus populaires</option>
                  <option value="helpful">Plus utiles</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-charcoal/60">
                  {sortedArticles.length} article(s)
                </span>
                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-r-none ${viewMode === 'grid' ? 'bg-magenta text-white' : 'text-charcoal'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`rounded-l-none ${viewMode === 'list' ? 'bg-magenta text-white' : 'text-charcoal'}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des articles */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedArticles.map((article) => (
            <Card 
              key={article.id} 
              className={`border-0 shadow-lg bg-white hover:shadow-xl transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <CardContent className={`p-6 ${viewMode === 'list' ? 'flex items-center space-x-6 w-full' : ''}`}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getDifficultyColor(article.difficulty)} text-xs`}>
                        {getDifficultyLabel(article.difficulty)}
                      </Badge>
                      <div className="flex items-center space-x-1 text-gray-500">
                        {getTypeIcon(article.type)}
                      </div>
                      {article.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-charcoal mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-charcoal/50 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{article.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.estimatedReadTime} min</span>
                      </div>
                    </div>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-charcoal/50">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {viewMode === 'list' && (
                  <div className="flex flex-col space-y-2">
                    <Button className="bg-gradient-rose text-white hover:opacity-90">
                      Lire
                    </Button>
                    <Button variant="outline" size="sm" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Ouvrir
                    </Button>
                  </div>
                )}
                
                {viewMode === 'grid' && (
                  <Button className="w-full bg-gradient-rose text-white hover:opacity-90 mt-4">
                    Lire l'article
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedArticles.length === 0 && (
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-12 text-center">
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-charcoal/60 mb-6">
                {searchTerm || selectedCategory || difficultyFilter !== 'all'
                  ? 'Aucun article ne correspond à vos critères de recherche.'
                  : 'La base de connaissances est en cours de construction.'
                }
              </p>
              {(searchTerm || selectedCategory || difficultyFilter !== 'all') && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setDifficultyFilter('all');
                  }}
                  className="bg-gradient-rose text-white hover:opacity-90"
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Aide supplémentaire */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  Vous ne trouvez pas ce que vous cherchez ?
                </h3>
                <p className="text-white/90 mb-6">
                  Notre équipe support est là pour vous aider. Contactez-nous via le chat, email ou créez un ticket de support.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/chat">
                    <Button variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Chat support
                    </Button>
                  </Link>
                  <Link href="/tickets">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <FileText className="w-4 h-4 mr-2" />
                      Créer un ticket
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Centre d'aide
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

