'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  Eye,
  MoreVertical,
  ArrowUpDown,
  FileText,
  Paperclip,
  Star,
  Archive,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  messagesCount: number;
  attachmentsCount: number;
  tags: string[];
}

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  // Données factices pour les tickets
  const tickets: SupportTicket[] = [
    {
      id: 'TKT-2024-001',
      title: 'Problème de connexion à l\'application mobile',
      description: 'Je n\'arrive pas à me connecter à l\'application mobile depuis la mise à jour.',
      status: 'open',
      priority: 'high',
      category: 'Technique',
      createdAt: '2024-01-15T14:30:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      customer: {
        id: 'user-1',
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com'
      },
      messagesCount: 1,
      attachmentsCount: 2,
      tags: ['mobile', 'connexion']
    },
    {
      id: 'TKT-2024-002',
      title: 'Question sur la facturation',
      description: 'Je souhaite comprendre les détails de ma dernière facture.',
      status: 'in-progress',
      priority: 'medium',
      category: 'Facturation',
      createdAt: '2024-01-14T10:15:00Z',
      updatedAt: '2024-01-15T09:20:00Z',
      assignedTo: {
        id: 'agent-1',
        name: 'Thomas Martin',
        avatar: ''
      },
      customer: {
        id: 'user-2',
        name: 'Pierre Leroy',
        email: 'pierre.leroy@email.com'
      },
      messagesCount: 5,
      attachmentsCount: 1,
      tags: ['facturation', 'paiement']
    },
    {
      id: 'TKT-2024-003',
      title: 'Demande de fonctionnalité',
      description: 'Serait-il possible d\'ajouter une fonction d\'export en PDF ?',
      status: 'waiting',
      priority: 'low',
      category: 'Fonctionnalité',
      createdAt: '2024-01-13T16:45:00Z',
      updatedAt: '2024-01-14T11:30:00Z',
      assignedTo: {
        id: 'agent-2',
        name: 'Sophie Moreau',
        avatar: ''
      },
      customer: {
        id: 'user-3',
        name: 'Julie Bernard',
        email: 'julie.bernard@email.com'
      },
      messagesCount: 3,
      attachmentsCount: 0,
      tags: ['fonctionnalité', 'export']
    },
    {
      id: 'TKT-2024-004',
      title: 'Erreur lors du paiement',
      description: 'Transaction échouée lors du renouvellement de l\'abonnement.',
      status: 'resolved',
      priority: 'urgent',
      category: 'Paiement',
      createdAt: '2024-01-12T08:20:00Z',
      updatedAt: '2024-01-12T15:45:00Z',
      assignedTo: {
        id: 'agent-1',
        name: 'Thomas Martin',
        avatar: ''
      },
      customer: {
        id: 'user-4',
        name: 'Antoine Rousseau',
        email: 'antoine.rousseau@email.com'
      },
      messagesCount: 8,
      attachmentsCount: 3,
      tags: ['paiement', 'abonnement', 'urgent']
    },
    {
      id: 'TKT-2024-005',
      title: 'Problème d\'affichage sur Safari',
      description: 'L\'interface ne s\'affiche pas correctement sur Safari macOS.',
      status: 'closed',
      priority: 'medium',
      category: 'Technique',
      createdAt: '2024-01-10T14:00:00Z',
      updatedAt: '2024-01-11T16:30:00Z',
      assignedTo: {
        id: 'agent-3',
        name: 'Laura Petit',
        avatar: ''
      },
      customer: {
        id: 'user-5',
        name: 'Camille Durand',
        email: 'camille.durand@email.com'
      },
      messagesCount: 6,
      attachmentsCount: 1,
      tags: ['safari', 'affichage', 'macos']
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'waiting':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'waiting':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'border-l-green-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'high':
        return 'border-l-orange-500';
      case 'urgent':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'in-progress':
        return 'En cours';
      case 'waiting':
        return 'En attente';
      case 'resolved':
        return 'Résolu';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyenne';
      case 'high':
        return 'Élevée';
      case 'urgent':
        return 'Urgente';
      default:
        return priority;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId)
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleBulkAction = (action: 'close' | 'archive' | 'delete') => {
    console.log('Action groupée:', action, selectedTickets);
    setSelectedTickets([]);
  };

  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in-progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length
    };
    return stats;
  };

  const stats = getTicketStats();

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Tickets de Support
            </h1>
            <p className="text-charcoal/60 mt-2">
              Gérez et suivez tous vos tickets de support
            </p>
          </div>
          <Button className="bg-gradient-rose text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau ticket
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">{stats.total}</h3>
              <p className="text-charcoal/60 text-sm">Total</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">{stats.open}</h3>
              <p className="text-charcoal/60 text-sm">Ouverts</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">{stats.inProgress}</h3>
              <p className="text-charcoal/60 text-sm">En cours</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl text-charcoal">{stats.resolved}</h3>
              <p className="text-charcoal/60 text-sm">Résolus</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un ticket..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-magenta"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="open">Ouvert</option>
                    <option value="in-progress">En cours</option>
                    <option value="waiting">En attente</option>
                    <option value="resolved">Résolu</option>
                    <option value="closed">Fermé</option>
                  </select>
                  
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                  >
                    <option value="all">Toutes les priorités</option>
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Élevée</option>
                    <option value="urgent">Urgente</option>
                  </select>
                  
                  <Button variant="outline" size="sm" className="border-gray-300">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Trier
                  </Button>
                </div>
              </div>
              
              {selectedTickets.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-charcoal/60">
                    {selectedTickets.length} sélectionné(s)
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleBulkAction('close')}
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    Fermer
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleBulkAction('archive')}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Archive className="w-3 h-3 mr-1" />
                    Archiver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleBulkAction('delete')}
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Supprimer
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Liste des tickets */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card 
              key={ticket.id} 
              className={`border-0 shadow-lg bg-white border-l-4 ${getPriorityColor(ticket.priority)} hover:shadow-xl transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={() => toggleTicketSelection(ticket.id)}
                    className="mt-1 rounded border-gray-300 text-magenta focus:ring-magenta"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link href={`/tickets/${ticket.id}`}>
                            <h3 className="font-medium text-charcoal hover:text-magenta cursor-pointer">
                              {ticket.title}
                            </h3>
                          </Link>
                          <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(ticket.status)}
                              <span>{getStatusLabel(ticket.status)}</span>
                            </div>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getPriorityLabel(ticket.priority)}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-charcoal/70 mb-3 line-clamp-2">
                          {ticket.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/50">
                          <div className="flex items-center space-x-1">
                            <Ticket className="w-3 h-3" />
                            <span>{ticket.id}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{ticket.customer.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Créé {formatDate(ticket.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{ticket.messagesCount} messages</span>
                          </div>
                          {ticket.attachmentsCount > 0 && (
                            <div className="flex items-center space-x-1">
                              <Paperclip className="w-3 h-3" />
                              <span>{ticket.attachmentsCount} fichiers</span>
                            </div>
                          )}
                        </div>
                        
                        {ticket.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {ticket.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {ticket.assignedTo && (
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={ticket.assignedTo.avatar} />
                              <AvatarFallback className="bg-gray-200 text-charcoal text-xs">
                                {getInitials(ticket.assignedTo.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-charcoal/60">
                              {ticket.assignedTo.name}
                            </span>
                          </div>
                        )}
                        
                        <Link href={`/tickets/${ticket.id}`}>
                          <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredTickets.length === 0 && (
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-12 text-center">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Aucun ticket trouvé
                </h3>
                <p className="text-charcoal/60 mb-6">
                  {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                    ? 'Aucun ticket ne correspond à vos critères de recherche.'
                    : 'Vous n\'avez aucun ticket pour le moment.'
                  }
                </p>
                <Button className="bg-gradient-rose text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un nouveau ticket
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

