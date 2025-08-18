'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Mail, 
  Phone, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Crown,
  Shield,
  User,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  location: string;
  verified: boolean;
}

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const users: User[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '+33 6 12 34 56 78',
      role: 'Client Premium',
      status: 'active',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-15T10:30:00Z',
      totalOrders: 12,
      totalSpent: 4580,
      location: 'Paris, France',
      verified: true
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      phone: '+33 6 98 76 54 32',
      role: 'Client',
      status: 'active',
      joinDate: '2023-03-20',
      lastLogin: '2024-01-14T16:45:00Z',
      totalOrders: 3,
      totalSpent: 890,
      location: 'Lyon, France',
      verified: true
    },
    {
      id: '3',
      name: 'Marie Leroy',
      email: 'marie.leroy@email.com',
      role: 'Client',
      status: 'pending',
      joinDate: '2024-01-10',
      lastLogin: 'Jamais connecté',
      totalOrders: 0,
      totalSpent: 0,
      location: 'Marseille, France',
      verified: false
    },
    {
      id: '4',
      name: 'Pierre Moreau',
      email: 'pierre.moreau@email.com',
      phone: '+33 6 11 22 33 44',
      role: 'Client Premium',
      status: 'suspended',
      joinDate: '2023-02-28',
      lastLogin: '2024-01-10T08:20:00Z',
      totalOrders: 8,
      totalSpent: 2340,
      location: 'Toulouse, France',
      verified: true
    },
    {
      id: '5',
      name: 'Julie Bernard',
      email: 'julie.bernard@email.com',
      role: 'Client',
      status: 'inactive',
      joinDate: '2023-08-15',
      lastLogin: '2023-12-01T14:30:00Z',
      totalOrders: 1,
      totalSpent: 150,
      location: 'Nice, France',
      verified: true
    },
    {
      id: '6',
      name: 'Antoine Rousseau',
      email: 'antoine.rousseau@email.com',
      phone: '+33 6 55 44 33 22',
      role: 'Administrateur',
      status: 'active',
      joinDate: '2023-01-01',
      lastLogin: '2024-01-15T11:15:00Z',
      totalOrders: 0,
      totalSpent: 0,
      location: 'Bordeaux, France',
      verified: true
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      case 'suspended':
        return <Ban className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Administrateur')) return <Crown className="w-4 h-4 text-yellow-600" />;
    if (role.includes('Premium')) return <Shield className="w-4 h-4 text-blue-600" />;
    return <User className="w-4 h-4 text-gray-600" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatLastLogin = (dateString: string) => {
    if (dateString === 'Jamais connecté') return dateString;
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'1h';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)} jour(s)`;
  };

  const roles = ['all', 'Client', 'Client Premium', 'Administrateur'];
  const statuses = ['all', 'active', 'inactive', 'suspended', 'pending'];

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Gestion des Utilisateurs
            </h1>
            <p className="text-charcoal/60 mt-2">
              Administrez les comptes utilisateurs et leurs permissions
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button className="bg-gradient-rose text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Utilisateur
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Total</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Actifs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Suspendus</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {users.filter(u => u.status === 'suspended').length}
                  </p>
                </div>
                <Ban className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">En Attente</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {users.filter(u => u.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Premium</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {users.filter(u => u.role.includes('Premium')).length}
                  </p>
                </div>
                <Crown className="w-8 h-8 text-magenta" />
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
                  placeholder="Rechercher un utilisateur..."
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
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="suspended">Suspendu</option>
                  <option value="pending">En attente</option>
                </select>
                
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="Client">Client</option>
                  <option value="Client Premium">Client Premium</option>
                  <option value="Administrateur">Administrateur</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Users className="w-5 h-5 mr-2 text-magenta" />
              Utilisateurs ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-rose text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-charcoal truncate">{user.name}</h3>
                        {getRoleIcon(user.role)}
                        {getStatusBadge(user.status)}
                        {user.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-charcoal/60">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Inscrit le {new Date(user.joinDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-charcoal/50">
                        <span>Dernière connexion: {formatLastLogin(user.lastLogin)}</span>
                        <span>•</span>
                        <span>{user.totalOrders} commande(s)</span>
                        <span>•</span>
                        <span>{user.totalSpent.toLocaleString('fr-FR')}€ dépensés</span>
                        <span>•</span>
                        <span>{user.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="text-right mr-4 hidden md:block">
                      <p className="text-sm font-medium text-charcoal">{user.role}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {getStatusIcon(user.status)}
                        <span className="text-xs text-charcoal/60">
                          {user.status === 'active' ? 'En ligne' : 
                           user.status === 'inactive' ? 'Hors ligne' :
                           user.status === 'suspended' ? 'Suspendu' : 'En attente'}
                        </span>
                      </div>
                    </div>
                    
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

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Aucun utilisateur trouvé
                </h3>
                <p className="text-charcoal/60 mb-6">
                  Essayez de modifier vos critères de recherche ou ajoutez un nouvel utilisateur.
                </p>
                <Button className="bg-gradient-rose text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Utilisateur
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

