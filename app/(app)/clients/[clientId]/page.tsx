import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  DollarSign,
  User,
  Building,
  Star,
  Edit,
  MessageCircle,
  FileText,
  TrendingUp,
  Clock,
  Tag,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types pour les clients et projets
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: 'Actif' | 'Prospect' | 'Inactif';
  type: 'Particulier' | 'Entreprise' | 'Association';
  totalSpent: number;
  projectsCount: number;
  lastContact: string;
  createdAt: string;
  rating: number;
  tags: string[];
  notes: string;
  website?: string;
  industry?: string;
}

interface Project {
  id: string;
  name: string;
  status: 'En cours' | 'Terminé' | 'En attente' | 'Annulé';
  value: number;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: 'Payée' | 'En attente' | 'En retard';
  date: string;
  dueDate: string;
}

// Données factices
const mockClients: { [key: string]: Client } = {
  '1': {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@studiocreative.fr',
    phone: '+33 6 12 34 56 78',
    company: 'Studio Créatif',
    address: 'Paris, France',
    status: 'Actif',
    type: 'Entreprise',
    totalSpent: 3500,
    projectsCount: 3,
    lastContact: '2024-08-15',
    createdAt: '2024-01-15',
    rating: 5,
    tags: ['VIP', 'Design', 'Récurrent'],
    notes: 'Cliente très satisfaite, toujours ponctuelle dans ses paiements. Recommande souvent nos services.',
    website: 'https://studiocreative.fr',
    industry: 'Design & Créativité'
  }
};

const mockProjects: { [key: string]: Project[] } = {
  '1': [
    {
      id: 'p1',
      name: 'Site Vitrine Studio Créatif',
      status: 'Terminé',
      value: 1200,
      startDate: '2024-01-20',
      endDate: '2024-02-05',
      description: 'Création du site vitrine principal avec design sur-mesure'
    },
    {
      id: 'p2',
      name: 'Refonte Portfolio',
      status: 'Terminé',
      value: 800,
      startDate: '2024-03-10',
      endDate: '2024-03-25',
      description: 'Mise à jour complète du portfolio avec nouvelles fonctionnalités'
    },
    {
      id: 'p3',
      name: 'Optimisation SEO',
      status: 'En cours',
      value: 1500,
      startDate: '2024-08-01',
      description: 'Amélioration du référencement naturel et stratégie de contenu'
    }
  ]
};

const mockInvoices: { [key: string]: Invoice[] } = {
  '1': [
    {
      id: 'inv1',
      number: 'FAC-2024-001',
      amount: 1200,
      status: 'Payée',
      date: '2024-02-05',
      dueDate: '2024-02-20'
    },
    {
      id: 'inv2',
      number: 'FAC-2024-015',
      amount: 800,
      status: 'Payée',
      date: '2024-03-25',
      dueDate: '2024-04-10'
    },
    {
      id: 'inv3',
      number: 'FAC-2024-032',
      amount: 750,
      status: 'En attente',
      date: '2024-08-15',
      dueDate: '2024-08-30'
    }
  ]
};

const statusColors = {
  'Actif': 'bg-green-100 text-green-800',
  'Prospect': 'bg-blue-100 text-blue-800',
  'Inactif': 'bg-gray-100 text-gray-800'
};

const projectStatusColors = {
  'En cours': 'bg-blue-100 text-blue-800',
  'Terminé': 'bg-green-100 text-green-800',
  'En attente': 'bg-yellow-100 text-yellow-800',
  'Annulé': 'bg-red-100 text-red-800'
};

const invoiceStatusColors = {
  'Payée': 'bg-green-100 text-green-800',
  'En attente': 'bg-yellow-100 text-yellow-800',
  'En retard': 'bg-red-100 text-red-800'
};

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function ClientProfilePage({ params, searchParams }: PageProps ) {
  const { clientId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const client = mockClients[clientId];
  const projects = mockProjects[clientId] || [];
  const invoices = mockInvoices[clientId] || [];

  if (!client) {
    notFound();
  }

  const activeProjects = projects.filter(p => p.status === 'En cours').length;
  const completedProjects = projects.filter(p => p.status === 'Terminé').length;
  const pendingInvoices = invoices.filter(i => i.status === 'En attente').length;

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/clients">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux clients
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-charcoal">
                {client.name}
              </h1>
              <p className="text-charcoal/60">{client.company}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contacter
            </Button>
            <Button className="bg-gradient-rose text-white hover:opacity-90">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:col-span-3 gap-8">
          {/* Sidebar - Informations client */}
          <div className="space-y-6">
            {/* Profil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informations Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-rose rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {client.name.charAt(0)}
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-charcoal">{client.name}</h3>
                  <p className="text-charcoal/60">{client.company}</p>
                  <div className="flex justify-center mt-2">
                    <Badge className={statusColors[client.status]}>
                      {client.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-rose-powder/20">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-charcoal/40" />
                    <span className="text-sm text-charcoal">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-charcoal/40" />
                    <span className="text-sm text-charcoal">{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-charcoal/40" />
                    <span className="text-sm text-charcoal">{client.address}</span>
                  </div>
                  {client.website && (
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-charcoal/40" />
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-magenta hover:underline">
                        {client.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-charcoal/40" />
                    <span className="text-sm text-charcoal">
                      Client depuis {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-rose-powder/20">
                  <h4 className="text-sm font-medium text-charcoal mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {client.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                {client.rating > 0 && (
                  <div className="pt-4 border-t border-rose-powder/20">
                    <h4 className="text-sm font-medium text-charcoal mb-2">Satisfaction</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-charcoal ml-2">{client.rating}/5</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/60">CA Total</span>
                  <span className="font-bold text-magenta">{client.totalSpent.toLocaleString('fr-FR')}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/60">Projets actifs</span>
                  <span className="font-bold text-blue-600">{activeProjects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/60">Projets terminés</span>
                  <span className="font-bold text-green-600">{completedProjects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal/60">Factures en attente</span>
                  <span className="font-bold text-yellow-600">{pendingInvoices}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="invoices">Factures</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              {/* Vue d'ensemble */}
              <TabsContent value="overview" className="space-y-6">
                {/* Projets récents */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Projets Récents</CardTitle>
                    <Link href={`/clients/${client.id}/projects`}>
                      <Button variant="ghost" size="sm">
                        Voir tout
                        <Eye className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border border-rose-powder/20 rounded-lg">
                          <div>
                            <h4 className="font-medium text-charcoal">{project.name}</h4>
                            <p className="text-sm text-charcoal/60">{project.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={projectStatusColors[project.status]}>
                                {project.status}
                              </Badge>
                              <span className="text-sm text-charcoal/60">
                                {project.value.toLocaleString('fr-FR')}€
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activité récente */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activité Récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-charcoal">Facture FAC-2024-032 envoyée</p>
                          <p className="text-xs text-charcoal/60">Il y a 2 jours</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-charcoal">Projet "Optimisation SEO" démarré</p>
                          <p className="text-xs text-charcoal/60">Il y a 1 semaine</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-magenta rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-charcoal">Appel téléphonique - Suivi projet</p>
                          <p className="text-xs text-charcoal/60">Il y a 2 semaines</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projets */}
              <TabsContent value="projects" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tous les Projets</CardTitle>
                    <Button className="bg-gradient-rose text-white hover:opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau Projet
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="border border-rose-powder/20 rounded-lg p-4">
                          <div>
                            <h4 className="font-medium text-charcoal">{project.name}</h4>
                            <p className="text-sm text-charcoal/60 mb-3">{project.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4">
                                <span className="text-charcoal/60">
                                  <Calendar className="w-4 h-4 inline mr-1" />
                                  {new Date(project.startDate).toLocaleDateString('fr-FR')}
                                </span>
                                {project.endDate && (
                                  <span className="text-charcoal/60">
                                    → {new Date(project.endDate).toLocaleDateString('fr-FR')}
                                  </span>
                                )}
                              </div>
                              <span className="font-medium text-magenta">
                                {project.value.toLocaleString('fr-FR')}€
                              </span>
                            </div>
                          </div>
                          <Badge className={projectStatusColors[project.status]}>
                            {project.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Factures */}
              <TabsContent value="invoices" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Factures</CardTitle>
                    <Button className="bg-gradient-rose text-white hover:opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Facture
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 border border-rose-powder/20 rounded-lg">
                          <div>
                            <h4 className="font-medium text-charcoal">{invoice.number}</h4>
                            <p className="text-sm text-charcoal/60">
                              Émise le {new Date(invoice.date).toLocaleDateString('fr-FR')}
                            </p>
                            <p className="text-sm text-charcoal/60">
                              Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-charcoal mb-2">
                              {invoice.amount.toLocaleString('fr-FR')}€
                            </div>
                            <Badge className={invoiceStatusColors[invoice.status]}>
                              {invoice.status}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes */}
              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes Client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-rose-powder/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-charcoal">Note générale</span>
                          <span className="text-xs text-charcoal/60">
                            {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-sm text-charcoal/80">{client.notes}</p>
                      </div>
                      
                      <Button variant="outline" className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
