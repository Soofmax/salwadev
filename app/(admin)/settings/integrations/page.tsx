'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plug, 
  Plus, 
  Search, 
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Key,
  Globe,
  Mail,
  CreditCard,
  BarChart3,
  MessageSquare,
  Cloud,
  Database,
  Zap,
  RefreshCw
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: any;
  color: string;
  lastSync?: string;
  apiKey?: string;
  webhookUrl?: string;
  settings: Record<string, any>;
}

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const integrations: Integration[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Traitement des paiements en ligne sécurisé',
      category: 'Paiement',
      status: 'connected',
      icon: CreditCard,
      color: 'text-blue-600',
      lastSync: '2024-01-15T10:30:00Z',
      apiKey: 'sk_test_***************',
      settings: {
        currency: 'EUR',
        webhookEnabled: true,
        testMode: true
      }
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Gestion des campagnes email et newsletters',
      category: 'Marketing',
      status: 'connected',
      icon: Mail,
      color: 'text-yellow-600',
      lastSync: '2024-01-15T09:15:00Z',
      apiKey: 'mc_***************',
      settings: {
        listId: 'abc123',
        doubleOptIn: true,
        autoSync: true
      }
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Suivi et analyse du trafic web',
      category: 'Analytics',
      status: 'connected',
      icon: BarChart3,
      color: 'text-green-600',
      lastSync: '2024-01-15T11:00:00Z',
      settings: {
        trackingId: 'GA-***********',
        enhancedEcommerce: true,
        anonymizeIp: true
      }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Notifications et communication d\'équipe',
      category: 'Communication',
      status: 'error',
      icon: MessageSquare,
      color: 'text-purple-600',
      lastSync: '2024-01-14T16:45:00Z',
      webhookUrl: 'https://hooks.slack.com/***',
      settings: {
        channel: '#notifications',
        mentions: true,
        errorAlerts: true
      }
    },
    {
      id: 'aws-s3',
      name: 'Amazon S3',
      description: 'Stockage cloud pour les fichiers et médias',
      category: 'Stockage',
      status: 'disconnected',
      icon: Cloud,
      color: 'text-orange-600',
      settings: {
        bucket: 'sds-media-bucket',
        region: 'eu-west-1',
        publicRead: false
      }
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automatisation des workflows entre applications',
      category: 'Automatisation',
      status: 'disconnected',
      icon: Zap,
      color: 'text-indigo-600',
      settings: {
        webhookUrl: '',
        triggers: []
      }
    }
  ];

  const categories = ['all', 'Paiement', 'Marketing', 'Analytics', 'Communication', 'Stockage', 'Automatisation'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connecté</Badge>;
      case 'disconnected':
        return <Badge className="bg-gray-100 text-gray-800">Déconnecté</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erreur</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatLastSync = (dateString?: string) => {
    if (!dateString) return 'Jamais';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'1h';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)} jour(s)`;
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Intégrations & APIs
            </h1>
            <p className="text-charcoal/60 mt-2">
              Connectez vos services tiers et gérez vos intégrations
            </p>
          </div>
          <Button className="bg-gradient-rose text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Intégration
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Total</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{integrations.length}</p>
                </div>
                <Plug className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Connectées</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {integrations.filter(i => i.status === 'connected').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Erreurs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {integrations.filter(i => i.status === 'error').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Inactives</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {integrations.filter(i => i.status === 'disconnected').length}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une intégration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-magenta"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-magenta text-white" : "border-magenta text-magenta hover:bg-magenta hover:text-white"}
                  >
                    {category === 'all' ? 'Toutes' : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${integration.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-charcoal">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-charcoal/60">{integration.description}</p>
                  
                  <div className="flex items-center justify-between">
                    {getStatusBadge(integration.status)}
                    <span className="text-xs text-charcoal/50">
                      Sync: {formatLastSync(integration.lastSync)}
                    </span>
                  </div>

                  {integration.status === 'connected' && (
                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal/60">Clé API:</span>
                        <span className="font-mono text-charcoal">
                          {integration.apiKey || 'Non configurée'}
                        </span>
                      </div>
                      {integration.webhookUrl && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-charcoal/60">Webhook:</span>
                          <span className="font-mono text-charcoal truncate max-w-32">
                            {integration.webhookUrl}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center space-x-2 pt-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 border-magenta text-magenta hover:bg-magenta hover:text-white">
                          <Settings className="w-4 h-4 mr-1" />
                          Configurer
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1 bg-gradient-rose text-white hover:opacity-90">
                        <Plug className="w-4 h-4 mr-1" />
                        Connecter
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-12 text-center">
              <Plug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal mb-2">
                Aucune intégration trouvée
              </h3>
              <p className="text-charcoal/60 mb-6">
                Essayez de modifier vos critères de recherche ou ajoutez une nouvelle intégration.
              </p>
              <Button className="bg-gradient-rose text-white hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une Intégration
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

