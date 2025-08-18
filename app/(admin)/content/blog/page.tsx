'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  MoreVertical,
  TrendingUp,
  MessageSquare,
  Heart,
  Share,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  featuredImage?: string;
  views: number;
  comments: number;
  likes: number;
  readTime: number;
}

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Les tendances du web design en 2024',
      slug: 'tendances-web-design-2024',
      excerpt: 'Découvrez les dernières tendances qui façonnent le web design moderne et comment les intégrer dans vos projets.',
      content: '...',
      status: 'published',
      author: {
        name: 'Sophie Martin',
        avatar: undefined
      },
      publishedAt: '2024-01-10T10:00:00Z',
      createdAt: '2024-01-08T14:30:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
      tags: ['Design', 'Tendances', 'UI/UX'],
      category: 'Design',
      views: 1247,
      comments: 23,
      likes: 89,
      readTime: 8
    },
    {
      id: '2',
      title: 'Optimiser le SEO de votre site e-commerce',
      slug: 'optimiser-seo-site-ecommerce',
      excerpt: 'Guide complet pour améliorer le référencement naturel de votre boutique en ligne et augmenter vos ventes.',
      content: '...',
      status: 'published',
      author: {
        name: 'Thomas Dubois',
        avatar: undefined
      },
      publishedAt: '2024-01-05T09:15:00Z',
      createdAt: '2024-01-03T16:20:00Z',
      updatedAt: '2024-01-05T09:15:00Z',
      tags: ['SEO', 'E-commerce', 'Marketing'],
      category: 'Marketing',
      views: 892,
      comments: 15,
      likes: 67,
      readTime: 12
    },
    {
      id: '3',
      title: 'Introduction à React 18 et ses nouveautés',
      slug: 'introduction-react-18-nouveautes',
      excerpt: 'Explorez les nouvelles fonctionnalités de React 18 et apprenez comment les utiliser dans vos projets.',
      content: '...',
      status: 'draft',
      author: {
        name: 'Marie Leroy',
        avatar: undefined
      },
      createdAt: '2024-01-12T11:45:00Z',
      updatedAt: '2024-01-14T15:30:00Z',
      tags: ['React', 'JavaScript', 'Développement'],
      category: 'Développement',
      views: 0,
      comments: 0,
      likes: 0,
      readTime: 15
    },
    {
      id: '4',
      title: 'Sécuriser votre application web : les bonnes pratiques',
      slug: 'securiser-application-web-bonnes-pratiques',
      excerpt: 'Les mesures essentielles pour protéger votre application web contre les menaces de sécurité courantes.',
      content: '...',
      status: 'scheduled',
      author: {
        name: 'Pierre Moreau',
        avatar: undefined
      },
      publishedAt: '2024-01-20T08:00:00Z',
      createdAt: '2024-01-13T13:15:00Z',
      updatedAt: '2024-01-14T10:20:00Z',
      tags: ['Sécurité', 'Développement', 'Best Practices'],
      category: 'Sécurité',
      views: 0,
      comments: 0,
      likes: 0,
      readTime: 10
    },
    {
      id: '5',
      title: 'L\'importance de l\'accessibilité web',
      slug: 'importance-accessibilite-web',
      excerpt: 'Pourquoi l\'accessibilité web est cruciale et comment rendre vos sites plus inclusifs pour tous les utilisateurs.',
      content: '...',
      status: 'archived',
      author: {
        name: 'Julie Bernard',
        avatar: undefined
      },
      publishedAt: '2023-12-15T14:30:00Z',
      createdAt: '2023-12-10T09:00:00Z',
      updatedAt: '2023-12-15T14:30:00Z',
      tags: ['Accessibilité', 'UX', 'Inclusion'],
      category: 'UX/UI',
      views: 654,
      comments: 8,
      likes: 34,
      readTime: 7
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesAuthor = authorFilter === 'all' || post.author.name === authorFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Publié</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Brouillon</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Programmé</Badge>;
      case 'archived':
        return <Badge className="bg-yellow-100 text-yellow-800">Archivé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'draft':
        return <Edit className="w-4 h-4 text-gray-600" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'archived':
        return <XCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const categories = ['all', 'Design', 'Marketing', 'Développement', 'Sécurité', 'UX/UI'];
  const authors = ['all', ...Array.from(new Set(blogPosts.map(post => post.author.name)))];
  const statuses = ['all', 'published', 'draft', 'scheduled', 'archived'];

  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    draft: blogPosts.filter(p => p.status === 'draft').length,
    scheduled: blogPosts.filter(p => p.status === 'scheduled').length,
    totalViews: blogPosts.reduce((sum, post) => sum + post.views, 0),
    totalComments: blogPosts.reduce((sum, post) => sum + post.comments, 0)
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Gestion du Blog
            </h1>
            <p className="text-charcoal/60 mt-2">
              Créez, modifiez et gérez vos articles de blog
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button className="bg-gradient-rose text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Article
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Total</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Publiés</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{stats.published}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Brouillons</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{stats.draft}</p>
                </div>
                <Edit className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Programmés</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{stats.scheduled}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Vues</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{stats.totalViews.toLocaleString('fr-FR')}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-magenta" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Commentaires</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{stats.totalComments}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-magenta"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                  <option value="scheduled">Programmé</option>
                  <option value="archived">Archivé</option>
                </select>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Tous les auteurs</option>
                  {authors.slice(1).map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <FileText className="w-5 h-5 mr-2 text-magenta" />
              Articles ({filteredPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 rounded-full bg-gray-100">
                      {getStatusIcon(post.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-charcoal truncate">{post.title}</h3>
                        {getStatusBadge(post.status)}
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-charcoal/60 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-charcoal/60 mb-2">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {post.status === 'published' && post.publishedAt 
                              ? `Publié le ${formatDate(post.publishedAt)}`
                              : post.status === 'scheduled' && post.publishedAt
                              ? `Programmé pour le ${formatDate(post.publishedAt)}`
                              : `Créé le ${formatDate(post.createdAt)}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min de lecture</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      {post.status === 'published' && (
                        <div className="flex items-center space-x-4 text-xs text-charcoal/50">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views.toLocaleString('fr-FR')} vues</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{post.comments} commentaires</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes} likes</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="bg-gradient-rose text-white text-xs">
                        {getInitials(post.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Aucun article trouvé
                </h3>
                <p className="text-charcoal/60 mb-6">
                  Essayez de modifier vos critères de recherche ou créez votre premier article.
                </p>
                <Button className="bg-gradient-rose text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un Article
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

