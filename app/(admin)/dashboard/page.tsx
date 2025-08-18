'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  ShoppingCart, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Settings,
  BarChart3,
  Calendar,
  Bell
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Utilisateurs Actifs',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Commandes du Mois',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      title: 'Revenus',
      value: '€47,892',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-magenta'
    },
    {
      title: 'Taux de Conversion',
      value: '3.2%',
      change: '-2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'Nouvel utilisateur inscrit: marie.dubois@email.com',
      time: 'Il y a 5 minutes',
      status: 'success'
    },
    {
      id: 2,
      type: 'order',
      message: 'Nouvelle commande #CMD-2024-001 - Site Vitrine Premium',
      time: 'Il y a 12 minutes',
      status: 'success'
    },
    {
      id: 3,
      type: 'system',
      message: 'Sauvegarde automatique effectuée avec succès',
      time: 'Il y a 1 heure',
      status: 'info'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Tentative de connexion suspecte détectée',
      time: 'Il y a 2 heures',
      status: 'warning'
    }
  ];

  const quickActions = [
    { label: 'Ajouter un utilisateur', icon: Users, href: '/admin/users/new' },
    { label: 'Créer un article', icon: FileText, href: '/admin/content/blog/new' },
    { label: 'Voir les commandes', icon: ShoppingCart, href: '/admin/orders' },
    { label: 'Paramètres système', icon: Settings, href: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-charcoal/60 mt-2">
              Vue d'ensemble de votre plateforme Salwa Dev Studio
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Rapport Mensuel
            </Button>
            <Button className="bg-gradient-rose text-white hover:opacity-90">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal/60">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-charcoal mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <Badge 
                          variant={stat.trend === 'up' ? 'default' : 'destructive'}
                          className={stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Activity className="w-5 h-5 mr-2 text-magenta" />
                  Activités Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-100' :
                        activity.status === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                        {activity.status === 'info' && <Clock className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-charcoal">{activity.message}</p>
                        <p className="text-xs text-charcoal/60 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir Toutes les Activités
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <BarChart3 className="w-5 h-5 mr-2 text-magenta" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left hover:bg-rose-powder/20 hover:text-magenta"
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-lg bg-white mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Activity className="w-5 h-5 mr-2 text-magenta" />
                  État du Système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal">Serveur Web</span>
                    <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal">Base de données</span>
                    <Badge className="bg-green-100 text-green-800">Opérationnelle</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal">API</span>
                    <Badge className="bg-green-100 text-green-800">Stable</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal">Sauvegarde</span>
                    <Badge className="bg-blue-100 text-blue-800">Dernière: 2h</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

