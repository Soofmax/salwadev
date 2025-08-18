'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Shield,
  CreditCard,
  ShoppingBag,
  Activity,
  Settings,
  Save,
  ArrowLeft,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Crown,
  AlertTriangle,
  Eye,
  Download
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  notes?: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  ip?: string;
}

export default function UserProfileAdmin({ params }: { params: Promise<{ userId: string }> }) {
  const [userId, setUserId] = useState<string>('');
  
  // Résoudre les paramètres de manière asynchrone
  React.useEffect(() => {
    params.then(resolvedParams => {
      setUserId(resolvedParams.userId);
    });
  }, [params]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Données factices pour l'exemple
  const user: UserProfile = {
    id: userId || 'loading...',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix',
    city: 'Paris',
    country: 'France',
    role: 'Client Premium',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15T10:30:00Z',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    totalOrders: 12,
    totalSpent: 4580,
    averageOrderValue: 381.67,
    notes: 'Cliente fidèle et satisfaite. Commandes régulières de sites web premium.'
  };

  const recentOrders: Order[] = [
    { id: 'CMD-2024-001', date: '2024-01-10', status: 'Livré', total: 1200, items: 1 },
    { id: 'CMD-2023-089', date: '2023-12-15', status: 'Livré', total: 800, items: 2 },
    { id: 'CMD-2023-067', date: '2023-11-20', status: 'Livré', total: 1500, items: 1 },
    { id: 'CMD-2023-045', date: '2023-10-05', status: 'Annulé', total: 600, items: 1 },
    { id: 'CMD-2023-023', date: '2023-09-12', status: 'Livré', total: 480, items: 3 }
  ];

  const recentActivity: Activity[] = [
    { id: '1', type: 'login', description: 'Connexion réussie', date: '2024-01-15T10:30:00Z', ip: '192.168.1.100' },
    { id: '2', type: 'order', description: 'Nouvelle commande #CMD-2024-001', date: '2024-01-10T14:20:00Z' },
    { id: '3', type: 'profile', description: 'Mise à jour du profil', date: '2024-01-08T09:15:00Z' },
    { id: '4', type: 'login', description: 'Connexion réussie', date: '2024-01-05T16:45:00Z', ip: '192.168.1.100' },
    { id: '5', type: 'password', description: 'Changement de mot de passe', date: '2023-12-20T11:30:00Z' }
  ];

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

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'Livré':
        return <Badge className="bg-green-100 text-green-800">Livré</Badge>;
      case 'En cours':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'Annulé':
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'profile':
        return <User className="w-4 h-4 text-magenta" />;
      case 'password':
        return <Shield className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-charcoal hover:text-magenta">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux utilisateurs
            </Button>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-charcoal">
                Profil Utilisateur
              </h1>
              <p className="text-charcoal/60 mt-2">
                Gérez les informations et paramètres de l'utilisateur
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-gradient-rose text-white" : "border-magenta text-magenta hover:bg-magenta hover:text-white"}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Sauvegarder' : 'Modifier'}
            </Button>
          </div>
        </div>

        {/* User Header Card */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-rose text-white text-xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-charcoal">{user.name}</h2>
                  {getStatusBadge(user.status)}
                  {user.role.includes('Premium') && (
                    <Crown className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-charcoal/60">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                    {user.emailVerified && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  {user.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                      {user.phoneVerified && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Inscrit le {new Date(user.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-charcoal">{user.totalOrders}</p>
                    <p className="text-xs text-charcoal/60">Commandes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-charcoal">{user.totalSpent.toLocaleString('fr-FR')}€</p>
                    <p className="text-xs text-charcoal/60">Total dépensé</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-charcoal">{user.averageOrderValue.toFixed(0)}€</p>
                    <p className="text-xs text-charcoal/60">Panier moyen</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Se connecter en tant que
                </Button>
                <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspendre
                </Button>
                <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-lg">
          {[
            { id: 'profile', label: 'Profil', icon: User },
            { id: 'orders', label: 'Commandes', icon: ShoppingBag },
            { id: 'activity', label: 'Activité', icon: Activity },
            { id: 'security', label: 'Sécurité', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-magenta text-white'
                    : 'text-charcoal hover:bg-rose-powder/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <User className="w-5 h-5 mr-2 text-magenta" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={user.name}
                      disabled={!isEditing}
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled={!isEditing}
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={user.phone || ''}
                      disabled={!isEditing}
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <select
                      id="role"
                      value={user.role}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-magenta focus:outline-none"
                    >
                      <option value="Client">Client</option>
                      <option value="Client Premium">Client Premium</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={user.address || ''}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={user.city || ''}
                      disabled={!isEditing}
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      value={user.country || ''}
                      disabled={!isEditing}
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes administratives</Label>
                  <Textarea
                    id="notes"
                    value={user.notes || ''}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta min-h-[100px]"
                    placeholder="Notes internes sur cet utilisateur..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Settings className="w-5 h-5 mr-2 text-magenta" />
                  État du Compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-charcoal font-medium">Statut du compte</Label>
                    <p className="text-sm text-charcoal/60">Contrôle l'accès à la plateforme</p>
                  </div>
                  <select
                    value={user.status}
                    disabled={!isEditing}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:border-magenta focus:outline-none"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="suspended">Suspendu</option>
                    <option value="pending">En attente</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-charcoal font-medium">Email vérifié</Label>
                    <p className="text-sm text-charcoal/60">L'utilisateur a confirmé son email</p>
                  </div>
                  <Switch checked={user.emailVerified} disabled={!isEditing} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-charcoal font-medium">Téléphone vérifié</Label>
                    <p className="text-sm text-charcoal/60">Le numéro de téléphone est confirmé</p>
                  </div>
                  <Switch checked={user.phoneVerified} disabled={!isEditing} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-charcoal font-medium">Authentification 2FA</Label>
                    <p className="text-sm text-charcoal/60">Double authentification activée</p>
                  </div>
                  <Switch checked={user.twoFactorEnabled} disabled={!isEditing} />
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Dernière connexion:</span>
                    <span className="text-charcoal">{formatDate(user.lastLogin)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Date d'inscription:</span>
                    <span className="text-charcoal">{formatDate(user.joinDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">ID utilisateur:</span>
                    <span className="text-charcoal font-mono">{user.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <ShoppingBag className="w-5 h-5 mr-2 text-magenta" />
                Historique des Commandes ({recentOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal">{order.id}</h4>
                        <p className="text-sm text-charcoal/60">
                          {new Date(order.date).toLocaleDateString('fr-FR')} • {order.items} article(s)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-charcoal">{order.total.toLocaleString('fr-FR')}€</p>
                        {getOrderStatusBadge(order.status)}
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Activity className="w-5 h-5 mr-2 text-magenta" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                    <div className="p-2 rounded-full bg-white">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-charcoal">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-charcoal/60">
                        <span>{formatDate(activity.date)}</span>
                        {activity.ip && (
                          <>
                            <span>•</span>
                            <span>IP: {activity.ip}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Shield className="w-5 h-5 mr-2 text-magenta" />
                Sécurité & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-charcoal">Actions de sécurité</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Forcer la déconnexion
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer email de vérification
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      <Shield className="w-4 h-4 mr-2" />
                      Réinitialiser mot de passe
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-charcoal">Informations de sécurité</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Dernière connexion:</span>
                      <span className="text-charcoal">{formatDate(user.lastLogin)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">2FA activé:</span>
                      <span className="text-charcoal">{user.twoFactorEnabled ? 'Oui' : 'Non'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Email vérifié:</span>
                      <span className="text-charcoal">{user.emailVerified ? 'Oui' : 'Non'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Téléphone vérifié:</span>
                      <span className="text-charcoal">{user.phoneVerified ? 'Oui' : 'Non'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

