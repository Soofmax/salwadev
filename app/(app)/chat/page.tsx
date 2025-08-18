'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Clock,
  CheckCircle2,
  Circle,
  User,
  Bot,
  Headphones,
  Star,
  ThumbsUp,
  ThumbsDown,
  Download,
  Image as ImageIcon,
  File,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'agent' | 'bot';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  attachments?: {
    name: string;
    url: string;
    type: string;
    size?: string;
  }[];
  read: boolean;
  rating?: 'positive' | 'negative';
}

interface SupportAgent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  speciality: string;
  rating: number;
}

export default function ChatPage() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState<'waiting' | 'connected' | 'ended'>('waiting');
  const [currentAgent, setCurrentAgent] = useState<SupportAgent | null>(null);
  const [showRating, setShowRating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Agent de support factice
  const agent: SupportAgent = {
    id: 'agent-1',
    name: 'Sarah Dubois',
    avatar: '',
    status: 'online',
    speciality: 'Support technique',
    rating: 4.8
  };

  // Messages factices
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'bot',
      senderName: 'Assistant IA',
      senderType: 'bot',
      content: 'Bonjour ! Je suis l\'assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: '2024-01-15T14:00:00Z',
      type: 'text',
      read: true
    },
    {
      id: '2',
      senderId: 'user',
      senderName: 'Vous',
      senderType: 'user',
      content: 'J\'ai un problème avec ma commande. Elle n\'apparaît pas dans mon historique.',
      timestamp: '2024-01-15T14:01:00Z',
      type: 'text',
      read: true
    },
    {
      id: '3',
      senderId: 'bot',
      senderName: 'Assistant IA',
      senderType: 'bot',
      content: 'Je comprends votre préoccupation. Je vais vous mettre en relation avec un agent spécialisé qui pourra vous aider avec votre commande.',
      timestamp: '2024-01-15T14:02:00Z',
      type: 'text',
      read: true
    },
    {
      id: '4',
      senderId: 'agent-1',
      senderName: 'Sarah Dubois',
      senderType: 'agent',
      content: 'Bonjour ! Je suis Sarah, votre conseillère support. Je vais vous aider avec votre commande. Pouvez-vous me donner votre numéro de commande ?',
      timestamp: '2024-01-15T14:05:00Z',
      type: 'text',
      read: true
    },
    {
      id: '5',
      senderId: 'user',
      senderName: 'Vous',
      senderType: 'user',
      content: 'Voici le numéro : CMD-2024-001',
      timestamp: '2024-01-15T14:06:00Z',
      type: 'text',
      read: true
    },
    {
      id: '6',
      senderId: 'agent-1',
      senderName: 'Sarah Dubois',
      senderType: 'agent',
      content: 'Parfait ! Je vois votre commande. Il y a eu un petit délai dans la synchronisation, mais tout est en ordre. Votre commande sera expédiée demain.',
      timestamp: '2024-01-15T14:08:00Z',
      type: 'text',
      read: false
    }
  ]);

  useEffect(() => {
    // Simulation de la connexion à un agent
    const timer = setTimeout(() => {
      setChatStatus('connected');
      setCurrentAgent(agent);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-scroll vers le bas
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'Vous',
      senderType: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      read: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulation de la réponse de l'agent
    setIsTyping(true);
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: currentAgent?.id || 'agent-1',
        senderName: currentAgent?.name || 'Agent Support',
        senderType: 'agent',
        content: 'Merci pour votre message. Je traite votre demande...',
        timestamp: new Date().toISOString(),
        type: 'text',
        read: false
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleEndChat = () => {
    setChatStatus('ended');
    setShowRating(true);
  };

  const handleRating = (rating: 'positive' | 'negative') => {
    console.log('Évaluation du chat:', rating);
    setShowRating(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case 'bot':
        return <Bot className="w-4 h-4" />;
      case 'agent':
        return <Headphones className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getSenderColor = (senderType: string) => {
    switch (senderType) {
      case 'bot':
        return 'bg-blue-100 text-blue-600';
      case 'agent':
        return 'bg-green-100 text-green-600';
      case 'user':
        return 'bg-gradient-rose text-white';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-magenta text-white hover:bg-magenta/80 rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Support Client
            </h1>
            <p className="text-charcoal/60 mt-2">
              Obtenez de l'aide instantanée de notre équipe support
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsMinimized(true)}
              className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Réduire
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-white h-[calc(100vh-200px)] flex flex-col">
          {/* Header du chat */}
          <CardHeader className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {chatStatus === 'waiting' && (
                  <>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal">
                        Connexion en cours...
                      </h3>
                      <p className="text-sm text-charcoal/60">
                        Un agent va vous répondre sous peu
                      </p>
                    </div>
                  </>
                )}
                
                {chatStatus === 'connected' && currentAgent && (
                  <>
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={currentAgent.avatar} />
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {getInitials(currentAgent.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal">
                        {currentAgent.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-charcoal/60">
                        <span>{currentAgent.speciality}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{currentAgent.rating}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {chatStatus === 'ended' && (
                  <>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal">
                        Conversation terminée
                      </h3>
                      <p className="text-sm text-charcoal/60">
                        Merci d'avoir utilisé notre support
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {chatStatus === 'connected' && (
                  <>
                    <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleEndChat}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[70%] ${
                    message.senderType === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {message.senderType !== 'user' && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSenderColor(message.senderType)}`}>
                        {getSenderIcon(message.senderType)}
                      </div>
                    )}
                    
                    <div className={`rounded-lg p-3 ${
                      message.senderType === 'user'
                        ? 'bg-magenta text-white'
                        : message.senderType === 'bot'
                        ? 'bg-blue-50 text-charcoal border border-blue-200'
                        : 'bg-gray-100 text-charcoal'
                    }`}>
                      {message.senderType !== 'user' && (
                        <p className="text-xs font-medium mb-1 opacity-70">
                          {message.senderName}
                        </p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      
                      {message.attachments && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-white/10 rounded">
                              {attachment.type.startsWith('image/') ? (
                                <ImageIcon className="w-4 h-4" />
                              ) : (
                                <File className="w-4 h-4" />
                              )}
                              <span className="text-xs">{attachment.name}</span>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs ${
                          message.senderType === 'user' ? 'text-white/70' : 'text-charcoal/60'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {message.senderType === 'user' && (
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
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Zone de saisie */}
          {chatStatus !== 'ended' && (
            <div className="border-t border-gray-200 p-4">
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
          )}
        </Card>

        {/* Modal d'évaluation */}
        {showRating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-center text-charcoal">
                  Évaluez votre expérience
                </CardTitle>
                <p className="text-center text-charcoal/60 text-sm">
                  Comment s'est passée votre conversation avec notre support ?
                </p>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => handleRating('positive')}
                    className="bg-green-100 text-green-600 hover:bg-green-200 flex-col h-20 w-20"
                  >
                    <ThumbsUp className="w-6 h-6 mb-1" />
                    <span className="text-xs">Bien</span>
                  </Button>
                  <Button
                    onClick={() => handleRating('negative')}
                    className="bg-red-100 text-red-600 hover:bg-red-200 flex-col h-20 w-20"
                  >
                    <ThumbsDown className="w-6 h-6 mb-1" />
                    <span className="text-xs">Pas bien</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowRating(false)}
                  className="text-charcoal/60"
                >
                  Passer
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

