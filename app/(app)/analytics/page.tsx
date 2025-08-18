'use client';

import { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Données factices pour les analytics
const analyticsData = {
  overview: {
    totalRevenue: 45600,
    revenueChange: 12.5,
    totalClients: 127,
    clientsChange: 8.3,
    activeProjects: 23,
    projectsChange: -2.1,
    conversionRate: 24.8,
    conversionChange: 3.2
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 3200, projects: 8 },
    { month: 'Fév', revenue: 4100, projects: 12 },
    { month: 'Mar', revenue: 3800, projects: 10 },
    { month: 'Avr', revenue: 5200, projects: 15 },
    { month: 'Mai', revenue: 4900, projects: 14 },
    { month: 'Jun', revenue: 6100, projects: 18 },
    { month: 'Jul', revenue: 5800, projects: 16 },
    { month: 'Aoû', revenue: 7200, projects: 21 }
  ],
  topServices: [
    { name: 'Site E-commerce', revenue: 12500, count: 5, growth: 15.2 },
    { name: 'Site Vitrine', revenue: 8900, count: 12, growth: 8.7 },
    { name: 'Landing Page', revenue: 6400, count: 8, growth: 22.1 },
    { name: 'Maintenance', revenue: 4200, count: 28, growth: 5.3 },
    { name: 'SEO', revenue: 3100, count: 6, growth: -3.2 }
  ],
  clientSegments: [
    { segment: 'Entreprises', count: 78, revenue: 32400, percentage: 61.4 },
    { segment: 'Particuliers', count: 35, revenue: 8900, percentage: 27.6 },
    { segment: 'Associations', count: 14, revenue: 4300, percentage: 11.0 }
  ],
  recentActivity: [
    { type: 'Nouveau client', description: 'Sophie Laurent - Marketing Plus', time: '2h', icon: Users },
    { type: 'Projet terminé', description: 'Site vitrine - Studio Créatif', time: '4h', icon: ShoppingCart },
    { type: 'Paiement reçu', description: 'Facture FAC-2024-032 - 1 200€', time: '6h', icon: DollarSign },
    { type: 'Nouveau projet', description: 'E-commerce - TechStart', time: '1j', icon: BarChart3 },
    { type: 'Consultation', description: 'Appel avec Pierre Durand', time: '2j', icon: Eye }
  ]
};

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  format = 'number' 
}: { 
  title: string; 
  value: number; 
  change: number; 
  icon: React.ComponentType<{ className?: string }>; 
  format?: 'number' | 'currency' | 'percentage' 
}) => {
  const isPositive = change > 0;
  const formattedValue = format === 'currency' 
    ? `${value.toLocaleString('fr-FR')}€`
    : format === 'percentage'
    ? `${value}%`
    : value.toLocaleString('fr-FR');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-charcoal/60">{title}</p>
            <p className="text-2xl font-bold text-charcoal">{formattedValue}</p>
            <div className="flex items-center space-x-1 mt-2">
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-charcoal/60">vs mois dernier</span>
            </div>
          </div>
          <Icon className="w-8 h-8 text-magenta" />
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulation du rechargement des données
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Analytics & Rapports
            </h1>
            <p className="text-charcoal/60 mt-2">
              Suivez les performances de votre activité
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-rose-powder/30 rounded-lg text-sm focus:border-magenta focus:ring-magenta"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
              <option value="1y">12 derniers mois</option>
            </select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="border-magenta text-magenta hover:bg-magenta hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button className="bg-gradient-rose text-white hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Chiffre d'Affaires"
            value={analyticsData.overview.totalRevenue}
            change={analyticsData.overview.revenueChange}
            icon={DollarSign}
            format="currency"
          />
          <StatCard
            title="Clients Total"
            value={analyticsData.overview.totalClients}
            change={analyticsData.overview.clientsChange}
            icon={Users}
          />
          <StatCard
            title="Projets Actifs"
            value={analyticsData.overview.activeProjects}
            change={analyticsData.overview.projectsChange}
            icon={ShoppingCart}
          />
          <StatCard
            title="Taux de Conversion"
            value={analyticsData.overview.conversionRate}
            change={analyticsData.overview.conversionChange}
            icon={TrendingUp}
            format="percentage"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Évolution du CA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Évolution du Chiffre d'Affaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyRevenue.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-charcoal w-8">{data.month}</span>
                      <div className="flex-1">
                        <div className="w-full bg-rose-powder/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-rose h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(data.revenue / 8000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-charcoal">
                        {data.revenue.toLocaleString('fr-FR')}€
                      </div>
                      <div className="text-xs text-charcoal/60">
                        {data.projects} projets
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Services les Plus Performants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topServices.map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between p-3 border border-rose-powder/20 rounded-lg">
                    <div>
                      <div className="font-medium text-charcoal">{service.name}</div>
                      <div className="text-sm text-charcoal/60">{service.count} ventes</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-charcoal">
                        {service.revenue.toLocaleString('fr-FR')}€
                      </div>
                      <div className="flex items-center space-x-1">
                        {service.growth > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs ${service.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(service.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Segments clients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Répartition des Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.clientSegments.map((segment) => (
                  <div key={segment.segment} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-charcoal">{segment.segment}</span>
                      <span className="text-sm text-charcoal/60">{segment.percentage}%</span>
                    </div>
                    <div className="w-full bg-rose-powder/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-rose h-2 rounded-full transition-all duration-300"
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-charcoal/60">
                      <span>{segment.count} clients</span>
                      <span>{segment.revenue.toLocaleString('fr-FR')}€</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-rose rounded-full flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-charcoal">{activity.type}</span>
                        <span className="text-xs text-charcoal/60">{activity.time}</span>
                      </div>
                      <p className="text-sm text-charcoal/60">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Rapport Détaillé
                </Button>
                <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Analyse Clients
                </Button>
                <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Prévisions CA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

