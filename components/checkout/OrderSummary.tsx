// Fichier: components/checkout/OrderSummary.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';

interface OrderSummaryProps {
  planId: string;
}

// Données simulées. Dans une application réelle, tu les importerais
// d'un fichier de configuration central (ex: `lib/plans-data.ts`).
const planDetails: { [key: string]: { name: string; price: number | null } } = {
  plan_free: { name: 'Plan Essentiel', price: 0 },
  plan_pro: { name: 'Plan Pro', price: 29 },
  plan_enterprise: { name: 'Plan Entreprise', price: null },
};

export function OrderSummary({ planId }: OrderSummaryProps) {
  const selectedPlan = planDetails[planId] || null;

  // Gestion du cas où le planId n'est pas valide.
  if (!selectedPlan) {
    return (
      <Card className="sticky top-24 border-destructive">
        <CardHeader>
          <CardTitle className="font-playfair text-destructive">Erreur de commande</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-montserrat">Le plan sélectionné est invalide. Veuillez réessayer.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24 border-border/80 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl flex items-center">
          <ShoppingBag className="mr-3 h-6 w-6 text-primary" />
          Récapitulatif
        </CardTitle>
        <CardDescription className="font-montserrat">Votre commande en un coup d'œil.</CardDescription>
      </CardHeader>
      <CardContent className="font-montserrat space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Abonnement</span>
          <span className="font-semibold">{selectedPlan.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Fréquence</span>
          <span className="font-semibold">Mensuel</span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Total (TTC)</span>
          <span className="font-playfair font-bold text-3xl text-primary">
            {selectedPlan.price !== null ? `${selectedPlan.price}€` : 'Sur devis'}
          </span>
        </div>
        <div className="text-xs text-muted-foreground pt-4">
          Vous serez facturé mensuellement. Vous pouvez annuler votre abonnement à tout moment depuis votre espace de facturation.
        </div>
      </CardContent>
    </Card>
  );
}
