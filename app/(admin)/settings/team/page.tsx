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
  User
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  joinDate: string;
  lastActive: string;
  permissions: string[];
}

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.martin@sds-solutions.com',
      role: 'Administrateur',
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: 'Il y a 5 minutes',
      permissions: ['admin', 'users', 'content', 'settings']
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      email: 'thomas.dubois@sds-solutions.com',
      role: 'Développeur Senior',
      status: 'active',
      joinDate: '2023-03-20',
      lastActive: 'Il y a 1 heure',
      permissions: ['content', 'development']
    },
    {
      id: '3',
      name: 'Marie Leroy',
      email: 'marie.leroy@sds-solutions.com',
      role: 'Designer UI/UX',
      status: 'active',
      joinDate: '2023-05-10',
      lastActive: 'Il y a 30 minutes',
      permissions: ['content', 'design']
    },
    {
      id: '4',
      name: 'Pierre Moreau',
      email: 'pierre.moreau@sds-solutions.com',
      role: 'Chef de Projet',
      status: 'inactive',
      joinDate: '2023-02-28',
      lastActive: 'Il y a 3 jours',
      permissions: ['projects', 'users']
    },
    {
      id: '5',
      name: 'Julie Bernard',
      email: 'julie.bernard@sds-solutions.com',
      role: 'Rédactrice',
      status: 'pending',
      joinDate: '2024-01-08',
      lastActive: 'Jamais connecté',
      permissions: ['content']
    }
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Administrateur')) return <Crown className="w-4 h-4 text-yellow-600" />;
    if (role.includes('Senior') || role.includes('Chef')) return <Shield className="w-4 h-4 text-blue-600" />;
    return <User className="w-4 h-4 text-gray-600" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Gestion de l'Équipe
            </h1>
            <p className="text-charcoal/60 mt-2">
              Gérez les membres de votre équipe et leurs permissions
            </p>
          </div>
          <Button className="bg-gradient-rose text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Inviter un Membre
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Total Membres</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{teamMembers.length}</p>
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
                    {teamMembers.filter(m => m.status === 'active').length}
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
                  <p className="text-sm font-medium text-charcoal/60">Inactifs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {teamMembers.filter(m => m.status === 'inactive').length}
                  </p>
                </div>
                <UserX className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">En Attente</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-magenta"
                />
              </div>
              <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Users className="w-5 h-5 mr-2 text-magenta" />
              Membres de l'Équipe ({filteredMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-rose text-white">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-charcoal">{member.name}</h3>
                        {getRoleIcon(member.role)}
                        {getStatusBadge(member.status)}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-charcoal/60">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Rejoint le {new Date(member.joinDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-charcoal/50">
                          Dernière activité: {member.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium text-charcoal">{member.role}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.permissions.slice(0, 2).map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {member.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

