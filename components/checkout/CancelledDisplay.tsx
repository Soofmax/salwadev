// Fichier: components/checkout/CancelledDisplay.tsx

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, RefreshCw } from 'lucide-react';

export function CancelledDisplay() {
  return (
    <Card className="text-center border-destructive/30 shadow-lg">
      <CardHeader className="items-center">
        <div className="bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
          <XCircle className="h-12 w-12 text-destructive" />
        </div>
        <CardTitle className="font-playfair text-4xl">Paiement Annulé</CardTitle>
        <CardDescription className="font-montserrat text-lg pt-2">
          Votre transaction n'a pas pu être finalisée.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-montserrat text-muted-foreground mb-8 max-w-md mx-auto">
          Aucun prélèvement n'a été effectué. Vous pouvez retourner à la page des tarifs pour réessayer ou choisir une autre offre.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-rose text-white shadow-rose">
            <Link href="/pricing">
              <RefreshCw className="mr-2 h-5 w-5" />
              Voir les tarifs
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              Contacter le support
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
