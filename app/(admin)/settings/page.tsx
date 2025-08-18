'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Globe, 
  Mail, 
  Shield, 
  Palette, 
  Database,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Upload,
  Image
} from 'lucide-react';

export default function GeneralSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'SDS - Solutions Digitales Stratégiques',
    siteDescription: 'Votre partenaire pour des solutions web innovantes et performantes',
    siteUrl: 'https://sds-solutions.com',
    adminEmail: 'admin@sds-solutions.com',
    supportEmail: 'support@sds-solutions.com',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    analyticsEnabled: true,
    cacheEnabled: true,
    debugMode: false
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulation d'une sauvegarde
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Configuration Générale
            </h1>
            <p className="text-charcoal/60 mt-2">
              Gérez les paramètres globaux de votre plateforme
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-magenta text-magenta hover:bg-magenta hover:text-white"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            <Button 
              className="bg-gradient-rose text-white hover:opacity-90"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Sauvegarder
            </Button>
          </div>
        </div>

        {/* Site Information */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Globe className="w-5 h-5 mr-2 text-magenta" />
              Informations du Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="text-charcoal font-medium">
                  Nom du Site
                </Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="border-gray-300 focus:border-magenta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl" className="text-charcoal font-medium">
                  URL du Site
                </Label>
                <Input
                  id="siteUrl"
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                  className="border-gray-300 focus:border-magenta"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="text-charcoal font-medium">
                Description du Site
              </Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="border-gray-300 focus:border-magenta min-h-[100px]"
                placeholder="Décrivez votre site en quelques mots..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Mail className="w-5 h-5 mr-2 text-magenta" />
              Configuration Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-charcoal font-medium">
                  Email Administrateur
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  className="border-gray-300 focus:border-magenta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="text-charcoal font-medium">
                  Email Support
                </Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                  className="border-gray-300 focus:border-magenta"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Settings className="w-5 h-5 mr-2 text-magenta" />
              Paramètres Système
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-charcoal font-medium">Mode Maintenance</Label>
                    <p className="text-sm text-charcoal/60">
                      Désactive temporairement l'accès au site
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-charcoal font-medium">Inscription Ouverte</Label>
                    <p className="text-sm text-charcoal/60">
                      Permet aux nouveaux utilisateurs de s'inscrire
                    </p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => handleInputChange('registrationEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-charcoal font-medium">Notifications Email</Label>
                    <p className="text-sm text-charcoal/60">
                      Envoie des notifications par email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-charcoal font-medium">Analytics</Label>
                    <p className="text-sm text-charcoal/60">
                      Active le suivi des statistiques
                    </p>
                  </div>
                  <Switch
                    checked={settings.analyticsEnabled}
                    onCheckedChange={(checked) => handleInputChange('analyticsEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-charcoal font-medium">Cache Système</Label>
                    <p className="text-sm text-charcoal/60">
                      Améliore les performances du site
                    </p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => handleInputChange('cacheEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-charcoal font-medium">Mode Debug</Label>
                    <p className="text-sm text-charcoal/60">
                      Affiche les erreurs détaillées
                    </p>
                  </div>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => handleInputChange('debugMode', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <Shield className="w-5 h-5 mr-2 text-magenta" />
              État du Système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium text-charcoal">Serveur</p>
                  <p className="text-sm text-charcoal/60">Opérationnel</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50">
                <Database className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-charcoal">Base de données</p>
                  <p className="text-sm text-charcoal/60">Connectée</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-yellow-50">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="font-medium text-charcoal">Sauvegarde</p>
                  <p className="text-sm text-charcoal/60">Il y a 2h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

