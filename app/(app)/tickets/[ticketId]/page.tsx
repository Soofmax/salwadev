'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  Paperclip,
  Send,
  Edit,
  MoreVertical,
  Star,
  StarOff,
  Archive,
  Trash2,
  Download,
  Image as ImageIcon,
  File,
  Phone,
  Mail,
  Tag,
  Activity,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'agent' | 'system';
  content: string;
  timestamp: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
  isInternal?: boolean;
}

interface TicketActivity {
  id: string;
  type: 'status_change' | 'assignment' | 'priority_change' | 'tag_added' | 'note_added';
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
}

export default function TicketDetailPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const [ticketId, setTicketId] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'messages' | 'activity'>('messages');

  // Résoudre les paramètres de manière asynchrone
  useEffect(() => {
    params.then(resolvedParams => {
      setTicketId(resolvedParams.ticketId);
    });
  }, [params]);

  // Données factices pour le ticket
  const ticket = {
    id: ticketId || 'TKT-2024-001',
    title: 'Problème de connexion à l\'application mobile',
    description: 'Je n\'arrive pas à me connecter à l\'application mobile depuis la mise à jour. L\'application se ferme automatiquement après la saisie de mes identifiants.',
    status: 'resolved' as const,
    priority: 'high' as const,
    category: 'Technique',
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    assignedTo: {
      id: 'agent-1',
      name: 'Sarah Dubois',
      email: 'sarah.dubois@support.com',
      avatar: '',
      role: 'Support Technique Senior'
    },
    customer: {
      id: 'user-1',
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      avatar: '',
      phone: '+33 6 12 34 56 78'
    },
    tags: ['mobile', 'connexion', 'urgent', 'ios'],
    satisfaction: null as 'positive' | 'negative' | null
  };

  // Messages du ticket
  const messages: TicketMessage[] = [
    {
      id: '1',
      senderId: 'user-1',
      senderName: 'Marie Dubois',
      senderType: 'customer',
      content: 'Bonjour, je n\'arrive pas à me connecter à l\'application mobile depuis la mise à jour. L\'application se ferme automatiquement après la saisie de mes identifiants. Pouvez-vous m\'aider ?',
      timestamp: '2024-01-15T14:30:00Z',
      attachments: [
        {
          id: 'att-1',
          name: 'screenshot_error.png',
          url: '#',
          type: 'image/png',
          size: '245 KB'
        }
      ]
    },
    {
      id: '2',
      senderId: 'agent-1',
      senderName: 'Sarah Dubois',
      senderType: 'agent',
      content: 'Bonjour Marie, merci pour votre message. Je vais vous aider à résoudre ce problème. Pouvez-vous me préciser la version de votre système d\'exploitation et le modèle de votre téléphone ?',
      timestamp: '2024-01-15T15:15:00Z'
    },
    {
      id: '3',
      senderId: 'user-1',
      senderName: 'Marie Dubois',
      senderType: 'customer',
      content: 'J\'ai un iPhone 14 avec iOS 17.2. Le problème a commencé après la mise à jour de l\'application hier.',
      timestamp: '2024-01-15T15:45:00Z'
    },
    {
      id: '4',
      senderId: 'agent-1',
      senderName: 'Sarah Dubois',
      senderType: 'agent',
      content: 'Parfait, merci pour ces informations. Il s\'agit d\'un problème connu avec iOS 17.2. Pouvez-vous essayer de désinstaller et réinstaller l\'application ? Cela devrait résoudre le problème.',
      timestamp: '2024-01-15T16:00:00Z'
    },
    {
      id: '5',
      senderId: 'system',
      senderName: 'Système',
      senderType: 'system',
      content: 'Le statut du ticket a été changé de "Ouvert" à "En cours"',
      timestamp: '2024-01-15T16:01:00Z'
    }
  ];

  // Activités du ticket
  const activities: TicketActivity[] = [
    {
      id: '1',
      type: 'status_change',
      description: 'Statut changé de "Ouvert" à "En cours"',
      timestamp: '2024-01-15T16:01:00Z',
      userId: 'agent-1',
      userName: 'Sarah Dubois'
    },
    {
      id: '2',
      type: 'assignment',
      description: 'Ticket assigné à Sarah Dubois',
      timestamp: '2024-01-15T15:10:00Z',
      userId: 'system',
      userName: 'Système'
    },
    {
      id: '3',
      type: 'tag_added',
      description: 'Tag "ios" ajouté',
      timestamp: '2024-01-15T15:50:00Z',
      userId: 'agent-1',
      userName: 'Sarah Dubois'
    }
  ];

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

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    console.log('Envoi du message:', newMessage);
    setNewMessage('');
  };

  const handleStatusChange = (newStatus: string) => {
    console.log('Changement de statut:', newStatus);
  };

  const handleAssignment = (agentId: string) => {
    console.log('Assignation à:', agentId);
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/tickets">
              <Button variant="ghost" className="text-charcoal hover:text-magenta">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux tickets
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-charcoal">
                {ticket.title}
              </h1>
              <p className="text-charcoal/60 mt-2">
                Ticket #{ticket.id} • Créé le {formatDateTime(ticket.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button variant="ghost" className="text-charcoal hover:text-magenta">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations du ticket */}
            <Card className={`border-0 shadow-lg bg-white border-l-4 ${getPriorityColor(ticket.priority)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getStatusColor(ticket.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(ticket.status)}
                        <span>{getStatusLabel(ticket.status)}</span>
                      </div>
                    </Badge>
                    <Badge variant="outline">
                      Priorité {getPriorityLabel(ticket.priority)}
                    </Badge>
                    <Badge variant="secondary">
                      {ticket.category}
                    </Badge>
                  </div>
                  <div className="text-sm text-charcoal/60">
                    Mis à jour {formatDateTime(ticket.updatedAt)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-charcoal mb-2">Description</h3>
                    <p className="text-charcoal/70">{ticket.description}</p>
                  </div>
                  
                  {ticket.tags.length > 0 && (
                    <div>
                      <h3 className="font-medium text-charcoal mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {ticket.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tabs Messages/Activité */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-0">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'messages'
                        ? 'bg-white text-charcoal shadow-sm'
                        : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages ({messages.filter(m => m.senderType !== 'system').length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'activity'
                        ? 'bg-white text-charcoal shadow-sm'
                        : 'text-charcoal/60 hover:text-charcoal'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Activité ({activities.length})</span>
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    {/* Messages */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-3 max-w-[80%] ${
                            message.senderType === 'customer' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={message.senderType === 'customer' ? ticket.customer.avatar : ticket.assignedTo?.avatar} />
                              <AvatarFallback className={`text-xs ${
                                message.senderType === 'customer' ? 'bg-blue-100 text-blue-600' :
                                message.senderType === 'agent' ? 'bg-green-100 text-green-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {message.senderType === 'system' ? 'SYS' : getInitials(message.senderName)}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className={`rounded-lg p-4 ${
                              message.senderType === 'customer' ? 'bg-blue-50 border border-blue-200' :
                              message.senderType === 'agent' ? 'bg-green-50 border border-green-200' :
                              'bg-gray-50 border border-gray-200'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm text-charcoal">
                                  {message.senderName}
                                </span>
                                <span className="text-xs text-charcoal/60">
                                  {formatDateTime(message.timestamp)}
                                </span>
                              </div>
                              
                              <p className="text-sm text-charcoal/80 mb-3">
                                {message.content}
                              </p>
                              
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="space-y-2">
                                  {message.attachments.map((attachment) => (
                                    <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-white rounded border">
                                      {attachment.type.startsWith('image/') ? (
                                        <ImageIcon className="w-4 h-4 text-blue-600" />
                                      ) : (
                                        <File className="w-4 h-4 text-gray-600" />
                                      )}
                                      <span className="text-xs text-charcoal flex-1">
                                        {attachment.name} ({attachment.size})
                                      </span>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Download className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Zone de réponse */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="space-y-4">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Tapez votre réponse..."
                          className="border-gray-300 focus:border-magenta min-h-[100px]"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                              <Paperclip className="w-4 h-4 mr-2" />
                              Joindre un fichier
                            </Button>
                          </div>
                          <Button 
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="bg-gradient-rose text-white hover:opacity-90"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-charcoal">{activity.description}</p>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-charcoal/60">
                            <span>{activity.userName}</span>
                            <span>•</span>
                            <span>{formatDateTime(activity.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations client */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <User className="w-5 h-5 mr-2 text-magenta" />
                  Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={ticket.customer.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {getInitials(ticket.customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-charcoal">{ticket.customer.name}</h4>
                    <p className="text-sm text-charcoal/60">{ticket.customer.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer un email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Agent assigné */}
            {ticket.assignedTo && (
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-charcoal">
                    <User className="w-5 h-5 mr-2 text-magenta" />
                    Agent assigné
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={ticket.assignedTo.avatar} />
                      <AvatarFallback className="bg-green-100 text-green-600">
                        {getInitials(ticket.assignedTo.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-charcoal">{ticket.assignedTo.name}</h4>
                      <p className="text-sm text-charcoal/60">{ticket.assignedTo.role}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Réassigner
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Actions rapides */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="open">Ouvert</option>
                  <option value="in-progress">En cours</option>
                  <option value="waiting">En attente</option>
                  <option value="resolved">Résolu</option>
                  <option value="closed">Fermé</option>
                </select>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    <Archive className="w-3 h-3 mr-1" />
                    Archiver
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Évaluation */}
            {ticket.status === 'resolved' && (
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-charcoal">
                    Évaluation client
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ticket.satisfaction ? (
                    <div className="text-center">
                      <div className="mb-2">
                        {ticket.satisfaction === 'positive' ? (
                          <ThumbsUp className="w-8 h-8 text-green-600 mx-auto" />
                        ) : (
                          <ThumbsDown className="w-8 h-8 text-red-600 mx-auto" />
                        )}
                      </div>
                      <p className="text-sm text-charcoal/60">
                        Le client a évalué ce ticket comme {ticket.satisfaction === 'positive' ? 'satisfaisant' : 'insatisfaisant'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-charcoal/60 mb-3">
                        En attente de l'évaluation du client
                      </p>
                      <Button size="sm" variant="outline" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                        Demander une évaluation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

