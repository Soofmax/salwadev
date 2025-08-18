'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Server,
  Database,
  Globe,
  Shield,
  User,
  Settings,
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  category: string;
  message: string;
  source: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

export default function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const logs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-15T10:30:15Z',
      level: 'error',
      category: 'Authentication',
      message: 'Tentative de connexion échouée - Mot de passe incorrect',
      source: 'auth.service',
      userId: 'user_123',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: { attempts: 3, email: 'test@example.com' }
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:25:42Z',
      level: 'info',
      category: 'Orders',
      message: 'Nouvelle commande créée avec succès',
      source: 'order.service',
      userId: 'user_456',
      ip: '192.168.1.101',
      details: { orderId: 'CMD-2024-001', amount: 1200 }
    },
    {
      id: '3',
      timestamp: '2024-01-15T10:20:33Z',
      level: 'warning',
      category: 'System',
      message: 'Utilisation mémoire élevée détectée',
      source: 'monitoring.service',
      details: { memoryUsage: '85%', threshold: '80%' }
    },
    {
      id: '4',
      timestamp: '2024-01-15T10:15:28Z',
      level: 'info',
      category: 'Users',
      message: 'Nouvel utilisateur inscrit',
      source: 'user.service',
      userId: 'user_789',
      ip: '192.168.1.102',
      details: { email: 'nouveau@example.com', role: 'client' }
    },
    {
      id: '5',
      timestamp: '2024-01-15T10:10:17Z',
      level: 'error',
      category: 'Database',
      message: 'Échec de connexion à la base de données',
      source: 'db.connection',
      details: { database: 'main', timeout: '30s', retries: 3 }
    },
    {
      id: '6',
      timestamp: '2024-01-15T10:05:55Z',
      level: 'debug',
      category: 'API',
      message: 'Requête API traitée avec succès',
      source: 'api.gateway',
      userId: 'user_456',
      ip: '192.168.1.101',
      details: { endpoint: '/api/products', method: 'GET', responseTime: '120ms' }
    },
    {
      id: '7',
      timestamp: '2024-01-15T10:00:12Z',
      level: 'warning',
      category: 'Security',
      message: 'Tentative d\'accès non autorisé détectée',
      source: 'security.monitor',
      ip: '203.0.113.1',
      userAgent: 'curl/7.68.0',
      details: { endpoint: '/admin', blocked: true }
    },
    {
      id: '8',
      timestamp: '2024-01-15T09:55:44Z',
      level: 'info',
      category: 'System',
      message: 'Sauvegarde automatique terminée avec succès',
      source: 'backup.service',
      details: { size: '2.3GB', duration: '45min', location: 's3://backups/' }
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    
    // Filtre de date simple (aujourd'hui seulement pour l'exemple)
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && new Date(log.timestamp).toDateString() === new Date().toDateString());
    
    return matchesSearch && matchesLevel && matchesCategory && matchesDate;
  });

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erreur</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Avertissement</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      case 'debug':
        return <Badge className="bg-gray-100 text-gray-800">Debug</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      case 'debug':
        return <Settings className="w-4 h-4 text-gray-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'authentication':
        return <Shield className="w-4 h-4 text-magenta" />;
      case 'users':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'orders':
        return <FileText className="w-4 h-4 text-green-600" />;
      case 'system':
        return <Server className="w-4 h-4 text-orange-600" />;
      case 'database':
        return <Database className="w-4 h-4 text-purple-600" />;
      case 'api':
        return <Globe className="w-4 h-4 text-indigo-600" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const categories = ['all', 'Authentication', 'Users', 'Orders', 'System', 'Database', 'API', 'Security'];
  const levels = ['all', 'error', 'warning', 'info', 'debug'];

  const logStats = {
    total: logs.length,
    errors: logs.filter(l => l.level === 'error').length,
    warnings: logs.filter(l => l.level === 'warning').length,
    info: logs.filter(l => l.level === 'info').length
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Logs Système
            </h1>
            <p className="text-charcoal/60 mt-2">
              Surveillez l'activité et les événements de votre système
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            <Button className="bg-gradient-rose text-white hover:opacity-90">
              <Trash2 className="w-4 h-4 mr-2" />
              Nettoyer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Total Logs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{logStats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Erreurs</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{logStats.errors}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Avertissements</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{logStats.warnings}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal/60">Informations</p>
                  <p className="text-2xl font-bold text-charcoal mt-2">{logStats.info}</p>
                </div>
                <Info className="w-8 h-8 text-blue-600" />
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
                  placeholder="Rechercher dans les logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-magenta"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="error">Erreurs</option>
                  <option value="warning">Avertissements</option>
                  <option value="info">Informations</option>
                  <option value="debug">Debug</option>
                </select>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="today">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="all">Toutes les dates</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-charcoal">
              <FileText className="w-5 h-5 mr-2 text-magenta" />
              Entrées de Log ({filteredLogs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center space-x-2 mt-1">
                        {getLevelIcon(log.level)}
                        {getCategoryIcon(log.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-mono text-charcoal/60">
                            {formatTimestamp(log.timestamp)}
                          </span>
                          {getLevelBadge(log.level)}
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-mono">
                            {log.source}
                          </Badge>
                        </div>
                        
                        <p className="text-charcoal font-medium mb-2">{log.message}</p>
                        
                        <div className="flex flex-wrap gap-4 text-xs text-charcoal/60">
                          {log.userId && (
                            <span>Utilisateur: {log.userId}</span>
                          )}
                          {log.ip && (
                            <span>IP: {log.ip}</span>
                          )}
                          {log.details && (
                            <span>Détails: {Object.keys(log.details).length} champ(s)</span>
                          )}
                        </div>
                        
                        {log.details && (
                          <div className="mt-3 p-3 bg-gray-100 rounded-md">
                            <pre className="text-xs text-charcoal/80 whitespace-pre-wrap">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Aucun log trouvé
                </h3>
                <p className="text-charcoal/60 mb-6">
                  Essayez de modifier vos critères de recherche ou vérifiez la configuration des logs.
                </p>
                <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

