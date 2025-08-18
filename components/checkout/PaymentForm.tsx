// Fichier: components/checkout/PaymentForm.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, ArrowRight } from 'lucide-react';

interface PaymentFormProps {
  planId: string;
}

export function PaymentForm({ planId }: PaymentFormProps) {
  // La logique de soumission du formulaire sera étoffée plus tard
  // pour interagir avec une API de paiement comme Stripe.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Début du processus de paiement pour le plan :', planId);
    // Ici, on appellera la logique pour créer un "Payment Intent"
    // et soumettre les informations de la carte à Stripe.
  };

  return (
    <Card className="border-border/80 shadow-lg">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl flex items-center">
          <CreditCard className="mr-3 h-6 w-6 text-primary" />
          Paiement Sécurisé
        </CardTitle>
        <CardDescription className="font-montserrat">
          Vos informations sont chiffrées et ne sont jamais stockées sur nos serveurs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 
            Cette div est un placeholder pour le composant Stripe Elements.
            Elle sera remplacée par le formulaire de carte bancaire réel,
            qui est injecté de manière sécurisée par la bibliothèque Stripe.
          */}
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center bg-muted/40">
            <h3 className="font-playfair text-xl font-semibold text-foreground">
              Formulaire de paiement
            </h3>
            <p className="font-montserrat text-muted-foreground mt-2">
              Le formulaire de carte bancaire sécurisé s'affichera ici.
            </p>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-gradient-rose text-white shadow-rose-lg text-lg font-semibold py-6 transform hover:scale-105 transition-all duration-300"
          >
            Payer et s'abonner
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
        <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground font-montserrat">
          <Lock className="h-4 w-4 mr-2" />
          <span>Transactions sécurisées et chiffrées par Stripe.</span>
        </div>
      </CardContent>
    </Card>
  );
}
