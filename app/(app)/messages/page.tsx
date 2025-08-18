'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus,
  MoreVertical,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Archive,
  Trash2,
  Star,
  StarOff,
  Circle,
  CheckCircle2,
  Clock,
  Users,
  Filter
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
  attachments?: string[];
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
  }[];
  lastMessage: Message;
  unreadCount: number;
  isStarred: boolean;
  isArchived: boolean;
  type: 'direct' | 'group';
  title?: string;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');

  // Données factices pour les conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      participants: [
        { id: '2', name: 'Marie Dubois', status: 'online' },
        { id: 'current', name: 'Vous', status: 'online' }
      ],
      lastMessage: {
        id: 'm1',
        senderId: '2',
        senderName: 'Marie Dubois',
        content: 'Parfait ! Je vais commencer à travailler sur le design dès demain.',
        timestamp: '2024-01-15T14:30:00Z',
        read: false,
        type: 'text'
      },
      unreadCount: 2,
      isStarred: true,
      isArchived: false,
      type: 'direct'
    },
    {
      id: '2',
      participants: [
        { id: '3', name: 'Thomas Martin', status: 'away' },
        { id: 'current', name: 'Vous', status: 'online' }
      ],
      lastMessage: {
        id: 'm2',
        senderId: 'current',
        senderName: 'Vous',
        content: 'Merci pour les retours, je vais intégrer les modifications.',
        timestamp: '2024-01-15T12:15:00Z',
        read: true,
        type: 'text'
      },
      unreadCount: 0,
      isStarred: false,
      isArchived: false,
      type: 'direct'
    },
    {
      id: '3',
      participants: [
        { id: '4', name: 'Sophie Leroy', status: 'offline' },
        { id: '5', name: 'Pierre Moreau', status: 'online' },
        { id: 'current', name: 'Vous', status: 'online' }
      ],
      lastMessage: {
        id: 'm3',
        senderId: '4',
        senderName: 'Sophie Leroy',
        content: 'La réunion est reportée à demain 14h.',
        timestamp: '2024-01-15T10:45:00Z',
        read: true,
        type: 'text'
      },
      unreadCount: 0,
      isStarred: false,
      isArchived: false,
      type: 'group',
      title: 'Équipe Projet Alpha'
    }
  ];

  // Messages pour la conversation sélectionnée
  const messages: Message[] = [
    {
      id: 'm1',
      senderId: '2',
      senderName: 'Marie Dubois',
      content: 'Salut ! J\'ai vu ton message concernant le nouveau projet. Peux-tu me donner plus de détails ?',
      timestamp: '2024-01-15T13:00:00Z',
      read: true,
      type: 'text'
    },
    {
      id: 'm2',
      senderId: 'current',
      senderName: 'Vous',
      content: 'Bien sûr ! Il s\'agit d\'un site e-commerce pour une boutique de mode. Le client souhaite quelque chose de moderne et épuré.',
      timestamp: '2024-01-15T13:15:00Z',
      read: true,
      type: 'text'
    },
    {
      id: 'm3',
      senderId: '2',
      senderName: 'Marie Dubois',
      content: 'Parfait ! Je vais commencer à travailler sur le design dès demain.',
      timestamp: '2024-01-15T14:30:00Z',
      read: false,
      type: 'text'
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participants.some(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || (conv.title && conv.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && conv.unreadCount > 0) ||
      (filter === 'starred' && conv.isStarred) ||
      (filter === 'archived' && conv.isArchived);
    
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Logique d'envoi de message
    console.log('Envoi du message:', newMessage);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Messages
            </h1>
            <p className="text-charcoal/60 mt-2">
              Communiquez avec votre équipe et vos clients
            </p>
          </div>
          <Button className="bg-gradient-rose text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle conversation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Liste des conversations */}
          <Card className="border-0 shadow-lg bg-white lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-charcoal">
                  <MessageSquare className="w-5 h-5 mr-2 text-magenta" />
                  Conversations
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded focus:border-magenta focus:outline-none"
                  >
                    <option value="all">Toutes</option>
                    <option value="unread">Non lues</option>
                    <option value="starred">Favorites</option>
                    <option value="archived">Archivées</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher une conversation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-magenta"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`flex items-center space-x-3 p-4 cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-magenta/10 border-r-2 border-magenta'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative">
                      {conversation.type === 'direct' ? (
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.participants[0].avatar} />
                          <AvatarFallback className="bg-gradient-rose text-white">
                            {getInitials(conversation.participants[0].name)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                      )}
                      {conversation.type === 'direct' && (
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(conversation.participants[0].status)}`} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-charcoal truncate">
                          {conversation.type === 'direct' 
                            ? conversation.participants[0].name 
                            : conversation.title
                          }
                        </h4>
                        <div className="flex items-center space-x-1">
                          {conversation.isStarred && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          <span className="text-xs text-charcoal/60">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-charcoal/60 truncate">
                          {conversation.lastMessage.senderId === 'current' ? 'Vous: ' : ''}
                          {conversation.lastMessage.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-magenta text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone de conversation */}
          <Card className="border-0 shadow-lg bg-white lg:col-span-2">
            {selectedConv ? (
              <>
                {/* Header de conversation */}
                <CardHeader className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {selectedConv.type === 'direct' ? (
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedConv.participants[0].avatar} />
                            <AvatarFallback className="bg-gradient-rose text-white">
                              {getInitials(selectedConv.participants[0].name)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                        {selectedConv.type === 'direct' && (
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedConv.participants[0].status)}`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-charcoal">
                          {selectedConv.type === 'direct' 
                            ? selectedConv.participants[0].name 
                            : selectedConv.title
                          }
                        </h3>
                        <p className="text-sm text-charcoal/60">
                          {selectedConv.type === 'direct' 
                            ? selectedConv.participants[0].status === 'online' ? 'En ligne' : 'Hors ligne'
                            : `${selectedConv.participants.length} participants`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[70%] ${message.senderId === 'current' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {message.senderId !== 'current' && (
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={message.senderAvatar} />
                              <AvatarFallback className="bg-gray-200 text-charcoal text-xs">
                                {getInitials(message.senderName)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`rounded-lg p-3 ${
                            message.senderId === 'current'
                              ? 'bg-magenta text-white'
                              : 'bg-gray-100 text-charcoal'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`text-xs ${
                                message.senderId === 'current' ? 'text-white/70' : 'text-charcoal/60'
                              }`}>
                                {formatTime(message.timestamp)}
                              </span>
                              {message.senderId === 'current' && (
                                <div className="ml-2">
                                  {message.read ? (
                                    <CheckCircle2 className="w-3 h-3 text-white/70" />
                                  ) : (
                                    <Circle className="w-3 h-3 text-white/70" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Zone de saisie */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Tapez votre message..."
                          className="border-gray-300 focus:border-magenta resize-none min-h-[60px]"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                          <Smile className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-rose text-white hover:opacity-90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-charcoal mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-charcoal/60">
                    Choisissez une conversation dans la liste pour commencer à discuter.
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

