// Fichier: components/billing/CurrentPlanCard.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package } from 'lucide-react';

// Définition du type pour les données de l'abonnement.
// Ce type peut être partagé dans un fichier de types plus tard.
interface Subscription {
  planName: string;
  status: 'Actif' | 'Annulé' | 'En attente';
  nextPaymentDate: Date;
  price: number;
}

interface CurrentPlanCardProps {
  subscription: Subscription;
}

export function CurrentPlanCard({ subscription }: CurrentPlanCardProps) {
  // Logique pour calculer les jours restants et la progression
  const today = new Date();
  const nextPayment = subscription.nextPaymentDate;
  const cycleStartDate = new Date(nextPayment);
  cycleStartDate.setMonth(cycleStartDate.getMonth() - 1);

  const totalDaysInCycle = (nextPayment.getTime() - cycleStartDate.getTime()) / (1000 * 3600 * 24);
  const daysElapsed = (today.getTime() - cycleStartDate.getTime()) / (1000 * 3600 * 24);
  const progressPercentage = Math.min(100, (daysElapsed / totalDaysInCycle) * 100);

  const statusVariant = {
    'Actif': 'default',
    'Annulé': 'destructive',
    'En attente': 'secondary',
  }[subscription.status] as 'default' | 'destructive' | 'secondary';

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-playfair text-2xl flex items-center">
              <Package className="mr-3 h-6 w-6 text-primary" />
              Votre Abonnement
            </CardTitle>
            <CardDescription className="font-montserrat mt-1">
              Détails de votre plan actuel.
            </CardDescription>
          </div>
          <Badge variant={statusVariant} className="font-montserrat">{subscription.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="font-montserrat space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold">{subscription.planName}</span>
            <span className="font-playfair text-2xl font-bold text-primary">
              {subscription.price}€<span className="text-sm font-montserrat text-muted-foreground">/mois</span>
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-muted-foreground">Cycle de facturation</span>
            <span className="font-semibold">
              Prochain paiement le {nextPayment.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
