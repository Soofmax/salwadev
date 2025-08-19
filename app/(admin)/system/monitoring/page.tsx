'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Server, 
  Database,
  Globe,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Eye,
  Settings,
  Download
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  color: string;
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  uptime: string;
  responseTime: number;
  lastCheck: string;
  icon: LucideIcon;
}

export default function SystemMonitoring() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulation de données en temps réel
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU',
      value: 45,
      unit: '%',
      status: 'good',
      trend: 'stable',
      icon: Cpu,
      color: 'text-blue-600'
    },
    {
      name: 'Mémoire',
      value: 68,
      unit: '%',
      status: 'warning',
      trend: 'up',
      icon: MemoryStick,
      color: 'text-orange-600'
    },
    {
      name: 'Disque',
      value: 32,
      unit: '%',
      status: 'good',
      trend: 'stable',
      icon: HardDrive,
      color: 'text-green-600'
    },
    {
      name: 'Réseau',
      value: 156,
      unit: 'Mbps',
      status: 'good',
      trend: 'up',
      icon: Wifi,
      color: 'text-purple-600'
    }
  ]);

  const services: ServiceStatus[] = [
    {
      name: 'Serveur Web',
      status: 'online',
      uptime: '99.9%',
      responseTime: 120,
      lastCheck: '2024-01-15T10:30:00Z',
      icon: Server
    },
    {
      name: 'Base de données',
      status: 'online',
      uptime: '99.8%',
      responseTime: 45,
      lastCheck: '2024-01-15T10:30:00Z',
      icon: Database
    },
    {
      name: 'API Gateway',
      status: 'online',
      uptime: '99.7%',
      responseTime: 89,
      lastCheck: '2024-01-15T10:30:00Z',
      icon: Globe
    },
    {
      name: 'Service Email',
      status: 'maintenance',
      uptime: '98.5%',
      responseTime: 0,
      lastCheck: '2024-01-15T09:45:00Z',
      icon: Activity
    }
  ];

  const alerts = [
    {
      id: '1',
      level: 'warning',
      message: 'Utilisation mémoire élevée détectée (68%)',
      timestamp: '2024-01-15T10:25:00Z',
      resolved: false
    },
    {
      id: '2',
      level: 'info',
      message: 'Service Email en maintenance programmée',
      timestamp: '2024-01-15T09:00:00Z',
      resolved: false
    },
    {
      id: '3',
      level: 'error',
      message: 'Pic de trafic inhabituel détecté',
      timestamp: '2024-01-15T08:30:00Z',
      resolved: true
    }
  ];

  // Simulation de mise à jour automatique
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
      })));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-100 text-green-800">En ligne</Badge>;
      case 'offline':
        return <Badge className="bg-red-100 text-red-800">Hors ligne</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'maintenance':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getMetricStatus = (value: number, name: string) => {
    if (name === 'CPU' || name === 'Mémoire' || name === 'Disque') {
      if (value > 80) return 'critical';
      if (value > 60) return 'warning';
      return 'good';
    }
    return 'good';
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Monitoring Système
            </h1>
            <p className="text-charcoal/60 mt-2">
              Surveillez les performances et la santé de votre infrastructure
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-charcoal/60">
              Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
            </div>
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? "border-green-600 text-green-600" : "border-gray-600 text-gray-600"}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
            </Button>
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Rapport
            </Button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const status = getMetricStatus(metric.value, metric.name);
            return (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getMetricColor(status)}`}>
                        {status === 'good' ? 'OK' : status === 'warning' ? 'Attention' : 'Critique'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-charcoal">{metric.name}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-charcoal">
                        {metric.value.toFixed(1)}
                      </span>
                      <span className="text-sm text-charcoal/60">{metric.unit}</span>
                    </div>
                    
                    {/* Progress bar pour les pourcentages */}
                    {metric.unit === '%' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            status === 'good' ? 'bg-green-500' :
                            status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services Status */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Server className="w-5 h-5 mr-2 text-magenta" />
                État des Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-gray-100">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-charcoal">{service.name}</h4>
                            {getStatusIcon(service.status)}
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-charcoal/60">
                            <span>Uptime: {service.uptime}</span>
                            {service.responseTime > 0 && (
                              <span>Réponse: {service.responseTime}ms</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(service.status)}
                        <p className="text-xs text-charcoal/50 mt-1">
                          {formatTimestamp(service.lastCheck)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <AlertTriangle className="w-5 h-5 mr-2 text-magenta" />
                Alertes Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${
                    alert.resolved ? 'border-gray-200 bg-gray-50' : 'border-yellow-200 bg-yellow-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.level)}
                      <div className="flex-1">
                        <p className={`text-sm ${alert.resolved ? 'text-charcoal/60' : 'text-charcoal'}`}>
                          {alert.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-charcoal/50">
                            {formatTimestamp(alert.timestamp)}
                          </span>
                          {alert.resolved && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Résolu
                            </Badge>
                          )}
                        </div>
                      </div>
                      {!alert.resolved && (
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Utilisateurs Actifs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">1,247</p>
                  <p className="text-xs text-green-600 mt-1">+12% vs hier</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Requêtes/min</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">3,456</p>
                  <p className="text-xs text-green-600 mt-1">+8% vs hier</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Temps de Réponse</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">89ms</p>
                  <p className="text-xs text-red-600 mt-1">+5% vs hier</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

