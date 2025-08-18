'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  CheckCircle, 
  ArrowRight,
  Loader2,
  Home,
  User
} from 'lucide-react';

interface SuccessMessage {
  title: string;
  description: string;
  redirect: string;
  linkText: string;
  icon: React.ReactNode;
}

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');
  const message = searchParams.get('message');
  
  const [countdown, setCountdown] = useState(5);

  const getSuccessDetails = (successType: string | null): SuccessMessage => {
    switch (successType) {
      case 'password-reset':
        return {
          title: 'Mot de passe mis à jour !',
          description: 'Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec vos nouveaux identifiants.',
          redirect: '/auth/signin',
          linkText: 'Se connecter maintenant',
          icon: <CheckCircle className="w-8 h-8 text-green-600" />
        };
      case 'email-verified':
        return {
          title: 'Email vérifié !',
          description: 'Votre adresse email a été vérifiée avec succès. Votre compte est maintenant pleinement activé.',
          redirect: '/auth/signin',
          linkText: 'Se connecter',
          icon: <CheckCircle className="w-8 h-8 text-green-600" />
        };
      case 'account-created':
        return {
          title: 'Compte créé !',
          description: 'Votre compte a été créé avec succès. Bienvenue sur la plateforme Salwa Dev Studio !',
          redirect: '/dashboard',
          linkText: 'Accéder au tableau de bord',
          icon: <CheckCircle className="w-8 h-8 text-green-600" />
        };
      case 'profile-updated':
        return {
          title: 'Profil mis à jour !',
          description: 'Vos informations de profil ont été mises à jour avec succès.',
          redirect: '/profile',
          linkText: 'Voir mon profil',
          icon: <User className="w-8 h-8 text-green-600" />
        };
      case 'oauth-linked':
        return {
          title: 'Compte lié !',
          description: 'Votre compte de réseau social a été lié avec succès à votre profil.',
          redirect: '/profile/security',
          linkText: 'Gérer mes comptes',
          icon: <CheckCircle className="w-8 h-8 text-green-600" />
        };
      default:
        return {
          title: 'Opération réussie !',
          description: message || 'Votre action a été effectuée avec succès.',
          redirect: '/dashboard',
          linkText: 'Continuer',
          icon: <CheckCircle className="w-8 h-8 text-green-600" />
        };
    }
  };

  const successDetails = getSuccessDetails(type);

  // Countdown pour redirection automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push(successDetails.redirect);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, successDetails.redirect]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {successDetails.icon}
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
            {successDetails.title}
          </CardTitle>
          <p className="text-charcoal/60 mt-2">
            {successDetails.description}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 text-center space-y-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sm text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span>Opération terminée avec succès</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href={successDetails.redirect}>
              <Button className="w-full bg-gradient-rose text-white hover:opacity-90">
                <ArrowRight className="w-4 h-4 mr-2" />
                {successDetails.linkText}
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-charcoal/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirection automatique dans {countdown} secondes...</span>
            </div>
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

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthSuccessContent />
    </Suspense>
  );
}

