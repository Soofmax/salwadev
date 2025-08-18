'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  FileText, 
  Save, 
  Eye, 
  ArrowLeft,
  Upload,
  Image,
  Tag,
  Calendar,
  Globe,
  Settings,
  Bold,
  Italic,
  Link,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo
} from 'lucide-react';

export default function NewBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft',
    publishedAt: '',
    metaTitle: '',
    metaDescription: '',
    allowComments: true,
    featured: false
  });

  const [activeTab, setActiveTab] = useState('content');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-generate slug from title
    if (field === 'title' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
      
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleSave = (status: string) => {
    const dataToSave = {
      ...formData,
      status,
      updatedAt: new Date().toISOString()
    };
    
    if (status === 'published' && !formData.publishedAt) {
      dataToSave.publishedAt = new Date().toISOString();
    }
    
    console.log('Saving article:', dataToSave);
    // Ici, vous ajouteriez la logique pour sauvegarder l'article
  };

  const categories = [
    'Design',
    'Développement',
    'Marketing',
    'SEO',
    'UX/UI',
    'Sécurité',
    'E-commerce',
    'Tendances'
  ];

  const toolbarButtons = [
    { icon: Bold, label: 'Gras', action: 'bold' },
    { icon: Italic, label: 'Italique', action: 'italic' },
    { icon: Link, label: 'Lien', action: 'link' },
    { icon: Heading1, label: 'Titre 1', action: 'h1' },
    { icon: Heading2, label: 'Titre 2', action: 'h2' },
    { icon: List, label: 'Liste', action: 'list' },
    { icon: Quote, label: 'Citation', action: 'quote' },
    { icon: Code, label: 'Code', action: 'code' },
    { icon: Image, label: 'Image', action: 'image' }
  ];

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-charcoal hover:text-magenta">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux articles
            </Button>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-charcoal">
                Nouvel Article
              </h1>
              <p className="text-charcoal/60 mt-2">
                Créez et publiez un nouvel article de blog
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <Eye className="w-4 h-4 mr-2" />
              Aperçu
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSave('draft')}
              className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button 
              onClick={() => handleSave('published')}
              className="bg-gradient-rose text-white hover:opacity-90"
            >
              <Globe className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Basic Info */}
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-charcoal font-medium">
                    Titre de l'article *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Entrez le titre de votre article..."
                    className="text-lg font-medium border-gray-300 focus:border-magenta"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-charcoal font-medium">
                    URL (slug)
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-charcoal/60">votre-site.com/blog/</span>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-de-votre-article"
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-charcoal font-medium">
                    Extrait
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Résumé court de votre article (160 caractères max)..."
                    className="border-gray-300 focus:border-magenta min-h-[80px]"
                    maxLength={160}
                  />
                  <div className="text-xs text-charcoal/60 text-right">
                    {formData.excerpt.length}/160 caractères
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <FileText className="w-5 h-5 mr-2 text-magenta" />
                  Contenu de l'article
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-t-md bg-gray-50">
                  {toolbarButtons.map((button, index) => {
                    const Icon = button.icon;
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="text-charcoal hover:text-magenta hover:bg-rose-powder/20"
                        title={button.label}
                      >
                        <Icon className="w-4 h-4" />
                      </Button>
                    );
                  })}
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-charcoal hover:text-magenta">
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Content Area */}
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Rédigez votre article ici... Vous pouvez utiliser Markdown pour le formatage."
                  className="border-gray-300 border-t-0 rounded-t-none focus:border-magenta min-h-[400px] font-mono text-sm"
                />
                
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Astuce :</strong> Vous pouvez utiliser la syntaxe Markdown pour formater votre contenu. 
                    Par exemple : **gras**, *italique*, `code`, etc.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Settings className="w-5 h-5 mr-2 text-magenta" />
                  Publication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-charcoal font-medium">
                    Statut
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-magenta focus:outline-none"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                    <option value="scheduled">Programmé</option>
                  </select>
                </div>
                
                {formData.status === 'scheduled' && (
                  <div className="space-y-2">
                    <Label htmlFor="publishedAt" className="text-charcoal font-medium">
                      Date de publication
                    </Label>
                    <Input
                      id="publishedAt"
                      type="datetime-local"
                      value={formData.publishedAt}
                      onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                      className="border-gray-300 focus:border-magenta"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-charcoal font-medium">Article en vedette</Label>
                    <p className="text-sm text-charcoal/60">Mettre en avant cet article</p>
                  </div>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-charcoal font-medium">Autoriser les commentaires</Label>
                    <p className="text-sm text-charcoal/60">Les lecteurs peuvent commenter</p>
                  </div>
                  <Switch
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => handleInputChange('allowComments', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories and Tags */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Tag className="w-5 h-5 mr-2 text-magenta" />
                  Catégories & Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-charcoal font-medium">
                    Catégorie
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-magenta focus:outline-none"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-charcoal font-medium">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="react, javascript, web (séparés par des virgules)"
                    className="border-gray-300 focus:border-magenta"
                  />
                  <p className="text-xs text-charcoal/60">
                    Séparez les tags par des virgules
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Image className="w-5 h-5 mr-2 text-magenta" />
                  Image de couverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-charcoal/60 mb-2">
                    Glissez une image ici ou cliquez pour sélectionner
                  </p>
                  <Button variant="outline" size="sm" className="border-magenta text-magenta hover:bg-magenta hover:text-white">
                    Choisir une image
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featuredImage" className="text-charcoal font-medium">
                    URL de l'image
                  </Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="https://exemple.com/image.jpg"
                    className="border-gray-300 focus:border-magenta"
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <Globe className="w-5 h-5 mr-2 text-magenta" />
                  SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle" className="text-charcoal font-medium">
                    Titre SEO
                  </Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    placeholder="Titre optimisé pour les moteurs de recherche"
                    className="border-gray-300 focus:border-magenta"
                    maxLength={60}
                  />
                  <div className="text-xs text-charcoal/60 text-right">
                    {formData.metaTitle.length}/60 caractères
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription" className="text-charcoal font-medium">
                    Description SEO
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    placeholder="Description pour les moteurs de recherche"
                    className="border-gray-300 focus:border-magenta min-h-[80px]"
                    maxLength={160}
                  />
                  <div className="text-xs text-charcoal/60 text-right">
                    {formData.metaDescription.length}/160 caractères
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

