// Fichier: components/checkout/SuccessDisplay.tsx

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

// Le composant reçoit les détails de la commande après validation côté serveur.
// Pour l'instant, on utilise un type simple.
interface OrderDetails {
  orderNumber?: string;
  planName?: string;
}

interface SuccessDisplayProps {
  orderDetails?: OrderDetails | null;
}

export function SuccessDisplay({ orderDetails }: SuccessDisplayProps) {
  return (
    <Card className="text-center border-green-500/30 shadow-lg">
      <CardHeader className="items-center">
        <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="font-playfair text-4xl">Paiement réussi !</CardTitle>
        <CardDescription className="font-montserrat text-lg pt-2">
          Merci pour votre confiance. Votre abonnement est maintenant actif.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orderDetails && (
          <div className="text-left bg-muted/50 rounded-lg p-4 mb-8 font-montserrat">
            <h3 className="font-semibold mb-2">Détails de la commande :</h3>
            {orderDetails.planName && (
              <p><strong>Abonnement :</strong> {orderDetails.planName}</p>
            )}
            {orderDetails.orderNumber && (
              <p><strong>N° de commande :</strong> {orderDetails.orderNumber}</p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Une confirmation a été envoyée à votre adresse e-mail.
            </p>
          </div>
        )}
        <Button asChild size="lg" className="bg-gradient-rose text-white shadow-rose">
          <Link href="/billing">
            Accéder à mon espace facturation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
