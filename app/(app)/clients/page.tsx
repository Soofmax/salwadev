'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  DollarSign,
  User,
  Building,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Types pour les clients
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
  avatar?: string;
}

// Données factices des clients
const mockClients: Client[] = [
  {
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
    tags: ['VIP', 'Design', 'Récurrent']
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas@techstart.io',
    phone: '+33 6 98 76 54 32',
    company: 'TechStart',
    address: 'Lyon, France',
    status: 'Actif',
    type: 'Entreprise',
    totalSpent: 5200,
    projectsCount: 2,
    lastContact: '2024-08-12',
    createdAt: '2024-02-20',
    rating: 5,
    tags: ['Tech', 'Startup', 'Web3']
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@marketing-plus.com',
    phone: '+33 6 45 67 89 12',
    company: 'Marketing Plus',
    address: 'Marseille, France',
    status: 'Prospect',
    type: 'Entreprise',
    totalSpent: 0,
    projectsCount: 0,
    lastContact: '2024-08-10',
    createdAt: '2024-08-05',
    rating: 0,
    tags: ['Nouveau', 'Marketing']
  },
  {
    id: '4',
    name: 'Pierre Durand',
    email: 'pierre.durand@gmail.com',
    phone: '+33 6 23 45 67 89',
    company: 'Freelance',
    address: 'Toulouse, France',
    status: 'Actif',
    type: 'Particulier',
    totalSpent: 1200,
    projectsCount: 1,
    lastContact: '2024-08-08',
    createdAt: '2024-03-10',
    rating: 4,
    tags: ['Freelance', 'Portfolio']
  },
  {
    id: '5',
    name: 'Association Solidaire',
    email: 'contact@association-solidaire.org',
    phone: '+33 1 23 45 67 89',
    company: 'Association Solidaire',
    address: 'Bordeaux, France',
    status: 'Inactif',
    type: 'Association',
    totalSpent: 800,
    projectsCount: 1,
    lastContact: '2024-06-15',
    createdAt: '2024-01-05',
    rating: 4,
    tags: ['Association', 'Social']
  }
];

const statusColors = {
  'Actif': 'bg-green-100 text-green-800',
  'Prospect': 'bg-blue-100 text-blue-800',
  'Inactif': 'bg-gray-100 text-gray-800'
};

const typeColors = {
  'Particulier': 'bg-purple-100 text-purple-800',
  'Entreprise': 'bg-orange-100 text-orange-800',
  'Association': 'bg-teal-100 text-teal-800'
};

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Tous');
  const [typeFilter, setTypeFilter] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState('name');

  const filteredClients = useMemo(() => {
    let filtered = mockClients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'Tous' || client.status === statusFilter;
      const matchesType = typeFilter === 'Tous' || client.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Tri
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'totalSpent':
        filtered.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
      case 'lastContact':
        filtered.sort((a, b) => new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime());
        break;
      case 'createdAt':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchTerm, statusFilter, typeFilter, sortBy]);

  const stats = useMemo(() => {
    const total = mockClients.length;
    const actifs = mockClients.filter(c => c.status === 'Actif').length;
    const prospects = mockClients.filter(c => c.status === 'Prospect').length;
    const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0);
    
    return { total, actifs, prospects, totalRevenue };
  }, []);

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Gestion des Clients
            </h1>
            <p className="text-charcoal/60 mt-2">
              Gérez vos relations clients et suivez vos opportunités
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Upload className="w-4 h-4 mr-2" />
              Importer
            </Button>
            <Button variant="outline" size="sm" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Link href="/clients/new">
              <Button className="bg-gradient-rose text-white hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Client
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal/60">Total Clients</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.total}</p>
                </div>
                <User className="w-8 h-8 text-magenta" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal/60">Clients Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{stats.actifs}</p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal/60">Prospects</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.prospects}</p>
                </div>
                <Building className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal/60">Chiffre d'Affaires</p>
                  <p className="text-2xl font-bold text-magenta">{stats.totalRevenue.toLocaleString('fr-FR')}€</p>
                </div>
                <DollarSign className="w-8 h-8 text-magenta" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Rechercher un client, email, entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                  />
                </div>
              </div>

              {/* Filtres */}
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-rose-powder/30 rounded-lg text-sm focus:border-magenta focus:ring-magenta"
                >
                  <option value="Tous">Tous les statuts</option>
                  <option value="Actif">Actif</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Inactif">Inactif</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-rose-powder/30 rounded-lg text-sm focus:border-magenta focus:ring-magenta"
                >
                  <option value="Tous">Tous les types</option>
                  <option value="Particulier">Particulier</option>
                  <option value="Entreprise">Entreprise</option>
                  <option value="Association">Association</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-rose-powder/30 rounded-lg text-sm focus:border-magenta focus:ring-magenta"
                >
                  <option value="name">Nom A-Z</option>
                  <option value="totalSpent">CA décroissant</option>
                  <option value="lastContact">Dernier contact</option>
                  <option value="createdAt">Plus récent</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des clients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Clients ({filteredClients.length})</span>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rose-powder/10">
                  <tr>
                    <th className="text-left p-4 font-medium text-charcoal">Client</th>
                    <th className="text-left p-4 font-medium text-charcoal">Contact</th>
                    <th className="text-left p-4 font-medium text-charcoal">Statut</th>
                    <th className="text-left p-4 font-medium text-charcoal">CA Total</th>
                    <th className="text-left p-4 font-medium text-charcoal">Projets</th>
                    <th className="text-left p-4 font-medium text-charcoal">Dernier Contact</th>
                    <th className="text-left p-4 font-medium text-charcoal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, index) => (
                    <tr 
                      key={client.id} 
                      className={`border-b border-rose-powder/20 hover:bg-rose-powder/5 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-cream/50'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-rose rounded-full flex items-center justify-center text-white font-semibold">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-charcoal">{client.name}</div>
                            <div className="text-sm text-charcoal/60">{client.company}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              <MapPin className="w-3 h-3 text-charcoal/40" />
                              <span className="text-xs text-charcoal/60">{client.address}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-charcoal/40" />
                            <span className="text-sm text-charcoal">{client.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-charcoal/40" />
                            <span className="text-sm text-charcoal">{client.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <Badge className={statusColors[client.status]}>
                            {client.status}
                          </Badge>
                          <Badge variant="outline" className={typeColors[client.type]}>
                            {client.type}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-charcoal">
                          {client.totalSpent.toLocaleString('fr-FR')}€
                        </div>
                        {client.rating > 0 && (
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-charcoal">{client.projectsCount}</div>
                          <div className="text-xs text-charcoal/60">projets</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-charcoal/40" />
                          <span className="text-sm text-charcoal">
                            {new Date(client.lastContact).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/clients/${client.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                Voir le profil
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Envoyer un email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-charcoal/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">Aucun client trouvé</h3>
                <p className="text-charcoal/60 mb-6">
                  Aucun client ne correspond à vos critères de recherche.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('Tous');
                    setTypeFilter('Tous');
                  }}
                  variant="outline"
                  className="border-magenta text-magenta hover:bg-magenta hover:text-white"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

