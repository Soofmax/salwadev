'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  AlertTriangle, 
  XCircle, 
  ArrowLeft,
  RefreshCw,
  Loader2,
  Home,
  HelpCircle
} from 'lucide-react';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  const getErrorDetails = (errorCode: string | null) => {
    switch (errorCode) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Compte non lié',
          description: 'Ce compte de réseau social est déjà associé à une autre adresse email.',
          suggestion: 'Essayez de vous connecter avec votre email et mot de passe, puis liez votre compte dans les paramètres.'
        };
      case 'OAuthCreateAccount':
        return {
          title: 'Erreur de création de compte',
          description: 'Impossible de créer votre compte avec ce fournisseur.',
          suggestion: 'Essayez de vous inscrire avec votre email ou utilisez un autre fournisseur.'
        };
      case 'EmailCreateAccount':
        return {
          title: 'Erreur d\'inscription',
          description: 'Impossible de créer votre compte avec cette adresse email.',
          suggestion: 'Vérifiez que l\'adresse email est correcte et réessayez.'
        };
      case 'Signin':
        return {
          title: 'Erreur de connexion',
          description: 'Impossible de vous connecter avec ces identifiants.',
          suggestion: 'Vérifiez votre email et mot de passe, ou réinitialisez votre mot de passe.'
        };
      case 'OAuthSignin':
        return {
          title: 'Erreur de connexion sociale',
          description: 'Impossible de vous connecter avec ce fournisseur.',
          suggestion: 'Essayez avec un autre fournisseur ou utilisez votre email et mot de passe.'
        };
      case 'CredentialsSignin':
        return {
          title: 'Identifiants incorrects',
          description: 'L\'email ou le mot de passe que vous avez saisi est incorrect.',
          suggestion: 'Vérifiez vos identifiants ou réinitialisez votre mot de passe.'
        };
      case 'SessionRequired':
        return {
          title: 'Session requise',
          description: 'Vous devez être connecté pour accéder à cette page.',
          suggestion: 'Connectez-vous à votre compte pour continuer.'
        };
      case 'AccessDenied':
        return {
          title: 'Accès refusé',
          description: 'Vous n\'avez pas l\'autorisation d\'accéder à cette ressource.',
          suggestion: 'Contactez l\'administrateur si vous pensez qu\'il s\'agit d\'une erreur.'
        };
      case 'Verification':
        return {
          title: 'Erreur de vérification',
          description: 'Le lien de vérification est invalide ou a expiré.',
          suggestion: 'Demandez un nouveau lien de vérification.'
        };
      default:
        return {
          title: 'Erreur d\'authentification',
          description: message || 'Une erreur inattendue est survenue lors de l\'authentification.',
          suggestion: 'Veuillez réessayer ou contactez le support si le problème persiste.'
        };
    }
  };

  const errorDetails = getErrorDetails(error);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
            {errorDetails.title}
          </CardTitle>
          <p className="text-charcoal/60 mt-2">
            {errorDetails.description}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 space-y-6">
          {errorDetails.suggestion && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Suggestion</h4>
                  <p className="text-sm text-charcoal/60">{errorDetails.suggestion}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-charcoal/50 font-mono">
                Code d'erreur: {error}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={handleRetry}
              className="w-full bg-gradient-rose text-white hover:opacity-90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Accueil
                </Button>
              </Link>
            </div>

            {(error === 'CredentialsSignin' || error === 'Signin') && (
              <Link href="/auth/reset-password">
                <Button variant="ghost" className="w-full text-charcoal/60 hover:text-magenta">
                  Mot de passe oublié ?
                </Button>
              </Link>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-charcoal/50">
              Le problème persiste ? 
              <Link href="/contact" className="text-magenta hover:underline ml-1">
                Contactez notre support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-magenta animate-spin mx-auto mb-4" />
          <p className="text-charcoal/60">Chargement...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthErrorContent />
    </Suspense>
  );
}

