'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  HelpCircle, 
  Search, 
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  Users,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Shield,
  CreditCard,
  Settings,
  Smartphone,
  Globe,
  Headphones,
  Download,
  ExternalLink,
  ThumbsUp,
  Eye
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  views: number;
}

interface SupportCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  articleCount: number;
  color: string;
}

interface ContactOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  availability: string;
  responseTime: string;
  action: string;
}

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Catégories de support
  const categories: SupportCategory[] = [
    {
      id: 'getting-started',
      name: 'Premiers pas',
      description: 'Guides pour débuter avec notre plateforme',
      icon: <Lightbulb className="w-6 h-6" />,
      articleCount: 12,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'account',
      name: 'Compte & Profil',
      description: 'Gestion de votre compte utilisateur',
      icon: <Users className="w-6 h-6" />,
      articleCount: 8,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'billing',
      name: 'Facturation',
      description: 'Questions sur les paiements et abonnements',
      icon: <CreditCard className="w-6 h-6" />,
      articleCount: 15,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'security',
      name: 'Sécurité',
      description: 'Protection de votre compte et données',
      icon: <Shield className="w-6 h-6" />,
      articleCount: 6,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'mobile',
      name: 'Application mobile',
      description: 'Aide pour l\'utilisation sur mobile',
      icon: <Smartphone className="w-6 h-6" />,
      articleCount: 10,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'api',
      name: 'API & Intégrations',
      description: 'Documentation technique et intégrations',
      icon: <Settings className="w-6 h-6" />,
      articleCount: 20,
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  // Questions fréquentes
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Comment créer un compte ?',
      answer: 'Pour créer un compte, cliquez sur "S\'inscrire" en haut à droite de la page d\'accueil, puis remplissez le formulaire avec vos informations.',
      category: 'getting-started',
      helpful: 45,
      views: 1250
    },
    {
      id: '2',
      question: 'Comment réinitialiser mon mot de passe ?',
      answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion, saisissez votre email, et suivez les instructions reçues par email.',
      category: 'account',
      helpful: 38,
      views: 890
    },
    {
      id: '3',
      question: 'Quels sont les moyens de paiement acceptés ?',
      answer: 'Nous acceptons les cartes Visa, Mastercard, American Express, ainsi que PayPal et les virements bancaires.',
      category: 'billing',
      helpful: 52,
      views: 1100
    },
    {
      id: '4',
      question: 'Comment activer l\'authentification à deux facteurs ?',
      answer: 'Rendez-vous dans Paramètres > Sécurité, puis activez l\'option "Authentification à deux facteurs" et suivez les étapes.',
      category: 'security',
      helpful: 29,
      views: 650
    },
    {
      id: '5',
      question: 'L\'application mobile est-elle gratuite ?',
      answer: 'Oui, notre application mobile est entièrement gratuite et disponible sur iOS et Android.',
      category: 'mobile',
      helpful: 67,
      views: 1800
    }
  ];

  // Options de contact
  const contactOptions: ContactOption[] = [
    {
      id: 'chat',
      name: 'Chat en direct',
      description: 'Discutez avec notre équipe support en temps réel',
      icon: <MessageCircle className="w-6 h-6" />,
      availability: '24h/24, 7j/7',
      responseTime: 'Immédiat',
      action: 'Démarrer le chat'
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Envoyez-nous un email détaillé',
      icon: <Mail className="w-6 h-6" />,
      availability: '24h/24, 7j/7',
      responseTime: '< 4 heures',
      action: 'Envoyer un email'
    },
    {
      id: 'phone',
      name: 'Téléphone',
      description: 'Appelez notre service client',
      icon: <Phone className="w-6 h-6" />,
      availability: 'Lun-Ven 9h-18h',
      responseTime: 'Immédiat',
      action: 'Voir le numéro'
    },
    {
      id: 'ticket',
      name: 'Ticket de support',
      description: 'Créez un ticket pour un suivi personnalisé',
      icon: <FileText className="w-6 h-6" />,
      availability: '24h/24, 7j/7',
      responseTime: '< 24 heures',
      action: 'Créer un ticket'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de recherche
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-playfair font-bold text-charcoal">
            Centre d'aide
          </h1>
          <p className="text-xl text-charcoal/60 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions ou contactez notre équipe support
          </p>
          
          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-gray-300 focus:border-magenta rounded-full"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-rose text-white hover:opacity-90 rounded-full"
              >
                Rechercher
              </Button>
            </div>
          </form>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">150+</h3>
              <p className="text-charcoal/60 text-sm">Articles d'aide</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">25+</h3>
              <p className="text-charcoal/60 text-sm">Tutoriels vidéo</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">24/7</h3>
              <p className="text-charcoal/60 text-sm">Support disponible</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">&lt; 2h</h3>
              <p className="text-charcoal/60 text-sm">Temps de réponse</p>
            </CardContent>
          </Card>
        </div>

        {/* Catégories */}
        <div>
          <h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
            Parcourir par catégorie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-charcoal mb-2">{category.name}</h3>
                      <p className="text-sm text-charcoal/60 mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {category.articleCount} articles
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-charcoal/40" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Questions fréquentes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-charcoal">
              Questions fréquentes
            </h2>
            {selectedCategory && (
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-magenta hover:text-magenta/80"
              >
                Voir toutes les questions
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-charcoal mb-2">{faq.question}</h3>
                      <p className="text-charcoal/70 mb-4">{faq.answer}</p>
                      <div className="flex items-center space-x-4 text-sm text-charcoal/50">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{faq.helpful} utile</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{faq.views} vues</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-charcoal/40 hover:text-magenta">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && (
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-12 text-center">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-charcoal/60">
                  Essayez avec d'autres mots-clés ou contactez notre support.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Options de contact */}
        <div>
          <h2 className="text-2xl font-playfair font-bold text-charcoal mb-6">
            Besoin d'aide supplémentaire ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactOptions.map((option) => (
              <Card key={option.id} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-magenta/10 rounded-lg flex items-center justify-center text-magenta">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-charcoal mb-2">{option.name}</h3>
                      <p className="text-sm text-charcoal/60 mb-3">{option.description}</p>
                      <div className="space-y-1 text-xs text-charcoal/50 mb-4">
                        <div>Disponibilité: {option.availability}</div>
                        <div>Temps de réponse: {option.responseTime}</div>
                      </div>
                      <Link href={option.id === 'chat' ? '/chat' : option.id === 'ticket' ? '/tickets' : '#'}>
                        <Button className="bg-gradient-rose text-white hover:opacity-90">
                          {option.action}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ressources supplémentaires */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-magenta to-rose-powder text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  Ressources supplémentaires
                </h3>
                <p className="text-white/90 mb-6">
                  Découvrez nos guides détaillés, tutoriels vidéo et documentation API pour tirer le meilleur parti de notre plateforme.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/kb">
                    <Button variant="secondary" className="bg-white text-magenta hover:bg-white/90">
                      <Book className="w-4 h-4 mr-2" />
                      Base de connaissances
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-magenta">
                    <Video className="w-4 h-4 mr-2" />
                    Tutoriels vidéo
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-magenta">
                    <Download className="w-4 h-4 mr-2" />
                    Documentation API
                  </Button>
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

