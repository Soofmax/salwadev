'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Check, 
  X,
  Settings,
  Filter,
  MoreVertical,
  Mail,
  MessageSquare,
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
  User,
  Calendar,
  CreditCard,
  Shield,
  Trash2,
  Archive,
  Eye,
  EyeOff
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'order' | 'system' | 'security' | 'payment' | 'reminder';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
}

export default function NotificationsPage() {
  type TabId = 'all' | 'unread' | 'settings';
  type Filter = 'all' | 'message' | 'order' | 'system' | 'security';
  import type { LucideIcon } from 'lucide-react';
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const [notificationSettings, setNotificationSettings] = useState<Record<string, NotificationSettings>>({
    messages: { email: true, push: true, sms: false, desktop: true },
    orders: { email: true, push: true, sms: true, desktop: false },
    system: { email: false, push: true, sms: false, desktop: true },
    security: { email: true, push: true, sms: true, desktop: true },
    marketing: { email: false, push: false, sms: false, desktop: false }
  });

  // Données factices pour les notifications
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'message',
      title: 'Nouveau message',
      content: 'Marie Dubois vous a envoyé un message concernant le projet Alpha.',
      timestamp: '2024-01-15T14:30:00Z',
      read: false,
      priority: 'medium',
      actionUrl: '/messages',
      sender: { name: 'Marie Dubois' }
    },
    {
      id: '2',
      type: 'order',
      title: 'Commande confirmée',
      content: 'Votre commande #CMD-2024-001 a été confirmée et sera traitée sous 24h.',
      timestamp: '2024-01-15T12:15:00Z',
      read: false,
      priority: 'high',
      actionUrl: '/orders/CMD-2024-001'
    },
    {
      id: '3',
      type: 'security',
      title: 'Nouvelle connexion détectée',
      content: 'Une connexion depuis un nouvel appareil a été détectée sur votre compte.',
      timestamp: '2024-01-15T10:45:00Z',
      read: true,
      priority: 'high',
      actionUrl: '/profile/security'
    },
    {
      id: '4',
      type: 'system',
      title: 'Mise à jour système',
      content: 'Une mise à jour de sécurité sera appliquée ce soir entre 22h et 23h.',
      timestamp: '2024-01-15T09:00:00Z',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'payment',
      title: 'Paiement traité',
      content: 'Votre paiement de 1,200€ a été traité avec succès.',
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
      priority: 'medium',
      actionUrl: '/billing'
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Rappel de réunion',
      content: 'Réunion équipe prévue demain à 14h en salle de conférence.',
      timestamp: '2024-01-14T14:00:00Z',
      read: false,
      priority: 'medium'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || (activeTab === 'unread' && !notification.read);
    const matchesFilter = filter === 'all' || notification.type === filter;
    return matchesTab && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (notificationId: string) => {
    console.log('Marquer comme lu:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marquer tout comme lu');
  };

  const handleDeleteNotification = (notificationId: string) => {
    console.log('Supprimer notification:', notificationId);
  };

  const handleBulkAction = (action: 'read' | 'delete' | 'archive') => {
    console.log('Action groupée:', action, selectedNotifications);
    setSelectedNotifications([]);
  };

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'order':
        return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'system':
        return <Info className="w-5 h-5 text-gray-600" />;
      case 'security':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-purple-600" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
    { id: 'all', label: `Toutes (${notifications.length})`, icon: Bell },
    { id: 'unread', label: `Non lues (${unreadCount})`, icon: Eye },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const isFilter = (v: string): v is Filter =>
    ['all','message','order','system','security'].includes(v);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'À l\'instant';
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-charcoal">
              Notifications
            </h1>
            <p className="text-charcoal/60 mt-2">
              Restez informé de toutes les activités importantes
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-magenta text-white">
              {unreadCount} non lues
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead}
              className="border-magenta text-magenta hover:bg-magenta hover:text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-lg">
          {tabs.map((tab) => {
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

        {/* Content */}
        {activeTab === 'settings' ? (
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Settings className="w-5 h-5 mr-2 text-magenta" />
                Paramètres de notification
              </CardTitle>
              <p className="text-sm text-charcoal/60">
                Configurez comment vous souhaitez recevoir vos notifications
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(notificationSettings).map(([category, settings]) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-charcoal mb-4 capitalize">
                      {category === 'messages' ? 'Messages' :
                       category === 'orders' ? 'Commandes' :
                       category === 'system' ? 'Système' :
                       category === 'security' ? 'Sécurité' :
                       category === 'marketing' ? 'Marketing' : category}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(settings).map(([method, enabled]) => (
                        <div key={method} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {method === 'email' && <Mail className="w-4 h-4 text-gray-600" />}
                            {method === 'push' && <Bell className="w-4 h-4 text-gray-600" />}
                            {method === 'sms' && <MessageSquare className="w-4 h-4 text-gray-600" />}
                            {method === 'desktop' && <Settings className="w-4 h-4 text-gray-600" />}
                            <span className="text-sm text-charcoal capitalize">
                              {method === 'push' ? 'Push' : 
                               method === 'sms' ? 'SMS' :
                               method === 'desktop' ? 'Bureau' : method}
                            </span>
                          </div>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(checked) => {
                              setNotificationSettings(prev => ({
                                ...prev,
                                [category]: {
                                  ...prev[category],
                                  [method]: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <select
                      value={filter}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (isFilter(v)) setFilter(v);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-magenta focus:outline-none"
                    >
                      <option value="all">Tous les types</option>
                      <option value="message">Messages</option>
                      <option value="order">Commandes</option>
                      <option value="system">Système</option>
                      <option value="security">Sécurité</option>
                    </select>
                    
                    {selectedNotifications.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-charcoal/60">
                          {selectedNotifications.length} sélectionnée(s)
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBulkAction('read')}
                          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Lues
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
                  
                  <div className="text-sm text-charcoal/60">
                    {filteredNotifications.length} notification(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-0 shadow-lg bg-white border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleNotificationSelection(notification.id)}
                          className="rounded border-gray-300 text-magenta focus:ring-magenta"
                        />
                        <div className="p-2 rounded-full bg-gray-100">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium ${!notification.read ? 'text-charcoal' : 'text-charcoal/80'}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-magenta rounded-full"></div>
                              )}
                              {notification.priority === 'high' && (
                                <Badge className="bg-red-100 text-red-800 text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <p className={`text-sm ${!notification.read ? 'text-charcoal/70' : 'text-charcoal/60'} mb-2`}>
                              {notification.content}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-charcoal/50">
                              <span>{formatTimestamp(notification.timestamp)}</span>
                              {notification.sender && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <User className="w-3 h-3" />
                                    <span>{notification.sender.name}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            {notification.actionUrl && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredNotifications.length === 0 && (
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-12 text-center">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-charcoal mb-2">
                      Aucune notification
                    </h3>
                    <p className="text-charcoal/60">
                      {activeTab === 'unread' 
                        ? 'Toutes vos notifications ont été lues !' 
                        : 'Vous n\'avez aucune notification pour le moment.'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

