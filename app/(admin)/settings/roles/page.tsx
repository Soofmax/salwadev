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
  Shield, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Users,
  Settings,
  FileText,
  Database,
  Eye,
  Lock,
  Unlock,
  Crown,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
}

export default function RolesAndPermissions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const permissions: Permission[] = [
    { id: 'users.view', name: 'Voir les utilisateurs', description: 'Consulter la liste des utilisateurs', category: 'Utilisateurs' },
    { id: 'users.create', name: 'Créer des utilisateurs', description: 'Ajouter de nouveaux utilisateurs', category: 'Utilisateurs' },
    { id: 'users.edit', name: 'Modifier les utilisateurs', description: 'Éditer les profils utilisateurs', category: 'Utilisateurs' },
    { id: 'users.delete', name: 'Supprimer les utilisateurs', description: 'Supprimer des comptes utilisateurs', category: 'Utilisateurs' },
    
    { id: 'content.view', name: 'Voir le contenu', description: 'Consulter les articles et pages', category: 'Contenu' },
    { id: 'content.create', name: 'Créer du contenu', description: 'Rédiger de nouveaux articles', category: 'Contenu' },
    { id: 'content.edit', name: 'Modifier le contenu', description: 'Éditer les articles existants', category: 'Contenu' },
    { id: 'content.publish', name: 'Publier le contenu', description: 'Publier et dépublier des articles', category: 'Contenu' },
    { id: 'content.delete', name: 'Supprimer le contenu', description: 'Supprimer définitivement du contenu', category: 'Contenu' },
    
    { id: 'settings.view', name: 'Voir les paramètres', description: 'Consulter la configuration système', category: 'Système' },
    { id: 'settings.edit', name: 'Modifier les paramètres', description: 'Changer la configuration système', category: 'Système' },
    { id: 'system.logs', name: 'Voir les logs', description: 'Consulter les journaux système', category: 'Système' },
    { id: 'system.backup', name: 'Gérer les sauvegardes', description: 'Créer et restaurer des sauvegardes', category: 'Système' },
  ];

  const roles: Role[] = [
    {
      id: '1',
      name: 'Super Administrateur',
      description: 'Accès complet à toutes les fonctionnalités du système',
      color: 'bg-red-100 text-red-800',
      userCount: 1,
      permissions: permissions.map(p => p.id),
      isSystem: true,
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Administrateur',
      description: 'Gestion des utilisateurs et du contenu',
      color: 'bg-blue-100 text-blue-800',
      userCount: 3,
      permissions: ['users.view', 'users.create', 'users.edit', 'content.view', 'content.create', 'content.edit', 'content.publish', 'settings.view'],
      isSystem: false,
      createdAt: '2023-01-15'
    },
    {
      id: '3',
      name: 'Éditeur',
      description: 'Création et modification de contenu',
      color: 'bg-green-100 text-green-800',
      userCount: 5,
      permissions: ['content.view', 'content.create', 'content.edit', 'content.publish'],
      isSystem: false,
      createdAt: '2023-02-01'
    },
    {
      id: '4',
      name: 'Rédacteur',
      description: 'Création de contenu uniquement',
      color: 'bg-yellow-100 text-yellow-800',
      userCount: 8,
      permissions: ['content.view', 'content.create', 'content.edit'],
      isSystem: false,
      createdAt: '2023-02-15'
    },
    {
      id: '5',
      name: 'Lecteur',
      description: 'Consultation uniquement',
      color: 'bg-gray-100 text-gray-800',
      userCount: 12,
      permissions: ['content.view', 'users.view'],
      isSystem: false,
      createdAt: '2023-03-01'
    }
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const getRoleIcon = (roleName: string) => {
    if (roleName.includes('Super')) return <Crown className="w-4 h-4" />;
    if (roleName.includes('Admin')) return <Shield className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Rôles & Permissions
            </h1>
            <p className="text-charcoal/60 mt-2">
              Gérez les rôles utilisateurs et leurs permissions d'accès
            </p>
          </div>
          <Button className="bg-gradient-rose text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Rôle
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Total Rôles</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{roles.length}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Permissions</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{permissions.length}</p>
                </div>
                <Lock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Utilisateurs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {roles.reduce((sum, role) => sum + role.userCount, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-magenta" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Rôles Système</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">
                    {roles.filter(r => r.isSystem).length}
                  </p>
                </div>
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Roles List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-charcoal">
                    <Shield className="w-5 h-5 mr-2 text-magenta" />
                    Liste des Rôles
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 border-gray-300 focus:border-magenta"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRoles.map((role) => (
                    <div 
                      key={role.id} 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedRole === role.id 
                          ? 'border-magenta bg-rose-powder/10' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-gray-100">
                            {getRoleIcon(role.name)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-charcoal">{role.name}</h3>
                              <Badge className={role.color}>{role.userCount} utilisateurs</Badge>
                              {role.isSystem && (
                                <Badge variant="outline" className="text-xs">
                                  Système
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-charcoal/60 mt-1">{role.description}</p>
                            <p className="text-xs text-charcoal/50 mt-1">
                              {role.permissions.length} permissions • Créé le {new Date(role.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {!role.isSystem && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Permissions Panel */}
          <div>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Lock className="w-5 h-5 mr-2 text-magenta" />
                  Permissions
                  {selectedRole && (
                    <Badge className="ml-2 bg-blue-100 text-blue-800">
                      {roles.find(r => r.id === selectedRole)?.name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRole ? (
                  <div className="space-y-6">
                    {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                      <div key={category}>
                        <h4 className="font-medium text-charcoal mb-3 flex items-center">
                          {category === 'Utilisateurs' && <Users className="w-4 h-4 mr-2" />}
                          {category === 'Contenu' && <FileText className="w-4 h-4 mr-2" />}
                          {category === 'Système' && <Database className="w-4 h-4 mr-2" />}
                          {category}
                        </h4>
                        <div className="space-y-3 ml-6">
                          {categoryPermissions.map((permission) => {
                            const hasPermission = roles.find(r => r.id === selectedRole)?.permissions.includes(permission.id);
                            return (
                              <div key={permission.id} className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <Label className="text-sm font-medium text-charcoal">
                                      {permission.name}
                                    </Label>
                                    {hasPermission ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-gray-400" />
                                    )}
                                  </div>
                                  <p className="text-xs text-charcoal/60 mt-1">
                                    {permission.description}
                                  </p>
                                </div>
                                <Switch
                                  checked={hasPermission}
                                  disabled={roles.find(r => r.id === selectedRole)?.isSystem}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <Button className="w-full bg-gradient-rose text-white hover:opacity-90">
                        Sauvegarder les Permissions
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal/60">
                      Sélectionnez un rôle pour voir ses permissions
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

