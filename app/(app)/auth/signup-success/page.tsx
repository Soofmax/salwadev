'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Mail, 
  CheckCircle, 
  ArrowLeft,
  Loader2,
  RefreshCw
} from 'lucide-react';

function SignUpSuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleResendEmail = async () => {
    // Logique pour renvoyer l'email de vérification
    console.log('Renvoi de l\'email de vérification pour:', email);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
            Inscription réussie !
          </CardTitle>
          <p className="text-charcoal/60 mt-2">
            Votre compte a été créé avec succès. Une dernière étape vous attend.
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 text-center space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">
              Vérifiez votre email
            </h3>
            <p className="text-sm text-charcoal/60 mb-3">
              Nous avons envoyé un lien de vérification à :
            </p>
            {email && (
              <p className="font-medium text-charcoal bg-white px-3 py-2 rounded border text-sm break-all">
                {email}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="text-sm text-charcoal/60 space-y-2">
              <p>
                <strong>Étapes suivantes :</strong>
              </p>
              <ol className="text-left space-y-1 pl-4">
                <li>1. Consultez votre boîte email</li>
                <li>2. Cliquez sur le lien de vérification</li>
                <li>3. Connectez-vous à votre compte</li>
              </ol>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-xs text-yellow-800">
                💡 <strong>Astuce :</strong> Vérifiez également votre dossier spam ou courrier indésirable.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail}
              variant="outline" 
              className="w-full border-magenta text-magenta hover:bg-magenta hover:text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Renvoyer l'email de vérification
            </Button>
            
            <Link href="/auth/signin">
              <Button className="w-full bg-gradient-rose text-white hover:opacity-90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Aller à la page de connexion
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-charcoal/50">
              Vous rencontrez des difficultés ? 
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

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignUpSuccessContent />
    </Suspense>
  );
}

