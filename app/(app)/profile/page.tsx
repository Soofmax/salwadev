'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Edit,
  Save,
  Camera,
  Shield,
  Bell,
  CreditCard,
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  Lock
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  joinDate: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  plan: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Données utilisateur factices
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-123',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Passionnée de design web et d\'expérience utilisateur. J\'aime créer des interfaces intuitives et élégantes.',
    location: 'Paris, France',
    website: 'https://sophiemartin.dev',
    joinDate: '2023-01-15',
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    plan: 'Premium'
  });

  const [formData, setFormData] = useState(userProfile);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUserProfile(formData);
      setIsEditing(false);
      
      // Notification de succès
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Mon Profil
            </h1>
            <p className="text-charcoal/60 mt-2">
              Gérez vos informations personnelles et paramètres de compte
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-gradient-rose text-white hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-rose text-white hover:opacity-90"
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier le profil
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="bg-gradient-rose text-white text-xl">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 p-2 bg-magenta text-white rounded-full hover:bg-magenta/80 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-charcoal">{userProfile.name}</h2>
                  <Badge className="bg-gradient-rose text-white">
                    {userProfile.plan}
                  </Badge>
                  {userProfile.emailVerified && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-charcoal/60">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{userProfile.email}</span>
                  </div>
                  {userProfile.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}
                  {userProfile.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Membre depuis {formatDate(userProfile.joinDate)}</span>
                  </div>
                </div>
                
                {userProfile.bio && (
                  <p className="text-charcoal/80 mt-3 text-sm">
                    {userProfile.bio}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-lg">
          {[
            { id: 'profile', label: 'Informations', icon: User },
            { id: 'security', label: 'Sécurité', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'billing', label: 'Facturation', icon: CreditCard }
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
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled={true}
                    className="border-gray-300 bg-gray-50"
                  />
                  <p className="text-xs text-charcoal/60">
                    L'email ne peut pas être modifié. Contactez le support si nécessaire.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    value={formData.website || ''}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta"
                    placeholder="https://votre-site.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="border-gray-300 focus:border-magenta min-h-[100px]"
                    placeholder="Parlez-nous de vous..."
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
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-charcoal">Email vérifié</p>
                      <p className="text-sm text-charcoal/60">Votre email est confirmé</p>
                    </div>
                  </div>
                </div>

                {userProfile.phoneVerified ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-charcoal">Téléphone vérifié</p>
                        <p className="text-sm text-charcoal/60">Votre numéro est confirmé</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-charcoal">Téléphone non vérifié</p>
                        <p className="text-sm text-charcoal/60">Vérifiez votre numéro</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                      Vérifier
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium text-charcoal">Actions rapides</h4>
                  <div className="space-y-2">
                    <Link href="/profile/security">
                      <Button variant="outline" className="w-full justify-start border-magenta text-magenta hover:bg-magenta hover:text-white">
                        <Lock className="w-4 h-4 mr-2" />
                        Gérer la sécurité
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Historique d'activité
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Gérer l'abonnement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Shield className="w-5 h-5 mr-2 text-magenta" />
                Paramètres de Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Paramètres de sécurité avancés
                </h3>
                <p className="text-charcoal/60 mb-6">
                  Accédez à la page dédiée pour gérer tous vos paramètres de sécurité.
                </p>
                <Link href="/profile/security">
                  <Button className="bg-gradient-rose text-white hover:opacity-90">
                    <Lock className="w-4 h-4 mr-2" />
                    Gérer la sécurité
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {(activeTab === 'notifications' || activeTab === 'billing') && (
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'notifications' ? (
                  <Bell className="w-8 h-8 text-gray-400" />
                ) : (
                  <CreditCard className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-charcoal mb-2">
                {activeTab === 'notifications' ? 'Notifications' : 'Facturation'}
              </h3>
              <p className="text-charcoal/60">
                Cette section sera bientôt disponible.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

