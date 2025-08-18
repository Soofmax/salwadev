'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function RequestPasswordResetPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation simple
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer une adresse email valide.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Toujours afficher le succès pour des raisons de sécurité
      setIsSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg bg-white">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
              Email envoyé !
            </h2>
            <p className="text-charcoal/60 mb-6">
              Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation dans quelques minutes.
            </p>
            <p className="text-sm text-charcoal/60 mb-6">
              Vérifiez également votre dossier spam.
            </p>
            <Link href="/auth/signin">
              <Button className="w-full bg-gradient-rose text-white hover:opacity-90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
            Mot de passe oublié ?
          </CardTitle>
          <p className="text-charcoal/60 mt-2">
            Pas de souci ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-charcoal font-medium">
                Adresse email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                disabled={isLoading}
                className="border-gray-300 focus:border-magenta"
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-rose text-white hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer le lien de réinitialisation
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/auth/signin" 
              className="text-sm text-charcoal/60 hover:text-magenta transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

