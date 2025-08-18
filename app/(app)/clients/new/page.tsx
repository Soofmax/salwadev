'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Tag,
  FileText,
  Plus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NewClientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    website: '',
    industry: '',
    type: 'Entreprise',
    status: 'Prospect',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'une sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirection vers la liste des clients
    router.push('/clients');
  };

  const predefinedTags = ['VIP', 'Récurrent', 'Design', 'Tech', 'Startup', 'E-commerce', 'SEO', 'Web3', 'Marketing', 'Freelance'];

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/clients">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux clients
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-charcoal">
                Nouveau Client
              </h1>
              <p className="text-charcoal/60">Ajoutez un nouveau client à votre base de données</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations principales */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations Personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Marie Dubois"
                        required
                        className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="marie@exemple.com"
                        required
                        className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Paris, France"
                        className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations entreprise */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Informations Entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Nom de l'entreprise</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Studio Créatif"
                        className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Secteur d'activité</Label>
                      <Input
                        id="industry"
                        type="text"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        placeholder="Design & Créativité"
                        className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://exemple.com"
                      className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="notes">Notes internes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Informations importantes sur ce client..."
                      rows={4}
                      className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="type">Type de client</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-magenta"
                    >
                      <option value="Particulier">Particulier</option>
                      <option value="Entreprise">Entreprise</option>
                      <option value="Association">Association</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-rose-powder/30 rounded-lg focus:border-magenta focus:ring-magenta"
                    >
                      <option value="Prospect">Prospect</option>
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Inactif</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tags actuels */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Ajouter un tag */}
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Nouveau tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="border-rose-powder/30 focus:border-magenta focus:ring-magenta"
                    />
                    <Button type="button" onClick={addTag} size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Tags prédéfinis */}
                  <div>
                    <Label className="text-sm text-charcoal/60">Tags suggérés :</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {predefinedTags.filter(tag => !tags.includes(tag)).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setTags(prev => [...prev, tag])}
                          className="text-xs px-2 py-1 bg-rose-powder/20 text-charcoal rounded hover:bg-rose-powder/40 transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-rose text-white hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>Enregistrement...</>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer le client
                        </>
                      )}
                    </Button>
                    <Link href="/clients" className="block">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white"
                      >
                        Annuler
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

