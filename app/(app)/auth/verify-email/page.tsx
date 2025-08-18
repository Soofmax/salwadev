'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  Loader2,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('Vérification de votre email en cours...');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Le lien de vérification est invalide ou manquant.');
        return;
      }

      try {
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulation de différents cas
        if (token === 'expired-token') {
          setStatus('expired');
          setMessage('Le lien de vérification a expiré. Veuillez demander un nouveau lien.');
        } else if (token === 'invalid-token') {
          setStatus('error');
          setMessage('Le lien de vérification est invalide.');
        } else {
          setStatus('success');
          setMessage('Votre email a été vérifié avec succès ! Votre compte est maintenant activé.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Une erreur est survenue lors de la vérification. Veuillez réessayer.');
      }
    };

    verifyToken();
  }, [token]);

  // Countdown pour redirection automatique en cas de succès
  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            router.push('/auth/signin?message=email-verified');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, router]);

  const handleResendVerification = async () => {
    // Logique pour renvoyer un email de vérification
    setStatus('loading');
    setMessage('Envoi d\'un nouveau lien de vérification...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setMessage('Un nouveau lien de vérification a été envoyé à votre adresse email.');
    } catch (error) {
      setStatus('error');
      setMessage('Impossible d\'envoyer le lien de vérification. Veuillez réessayer.');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
              Vérification en cours...
            </h2>
            <p className="text-charcoal/60 mb-6">{message}</p>
          </>
        );

      case 'success':
        return (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
              Email vérifié !
            </h2>
            <p className="text-charcoal/60 mb-6">{message}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-charcoal/60 mb-6">
              <span>Redirection automatique dans {countdown} secondes...</span>
            </div>
            <Link href="/auth/signin">
              <Button className="w-full bg-gradient-rose text-white hover:opacity-90">
                Continuer vers la connexion
              </Button>
            </Link>
          </>
        );

      case 'expired':
        return (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
              Lien expiré
            </h2>
            <p className="text-charcoal/60 mb-6">{message}</p>
            <div className="space-y-3">
              <Button 
                onClick={handleResendVerification}
                className="w-full bg-gradient-rose text-white hover:opacity-90"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Renvoyer le lien de vérification
              </Button>
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </>
        );

      case 'error':
      default:
        return (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-charcoal mb-4">
              Erreur de vérification
            </h2>
            <p className="text-charcoal/60 mb-6">{message}</p>
            <div className="space-y-3">
              <Button 
                onClick={handleResendVerification}
                className="w-full bg-gradient-rose text-white hover:opacity-90"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Renvoyer le lien de vérification
              </Button>
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
            Vérification Email
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 text-center">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg bg-white">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-magenta animate-spin mx-auto mb-4" />
            <p className="text-charcoal/60">Chargement...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

