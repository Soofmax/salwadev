// Fichier: components/billing/BillingActions.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Power } from 'lucide-react';

// Import des composants pour la modale de confirmation (si tu utilises shadcn/ui)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function BillingActions() {
  // La logique d'appel à la Server Action pour annuler l'abonnement sera ici.
  const handleCancelSubscription = () => {
    console.log("Appel de l'action serveur pour annuler l'abonnement...");
    // await cancelSubscriptionAction();
  };

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl flex items-center text-destructive">
          <AlertTriangle className="mr-3 h-6 w-6" />
          Zone de danger
        </CardTitle>
        <CardDescription className="font-montserrat">
          Les actions ci-dessous sont irréversibles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full font-montserrat">
              <Power className="mr-2 h-4 w-4" />
              Annuler l'abonnement
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-playfair">
                Êtes-vous absolument sûr(e) ?
              </AlertDialogTitle>
              <AlertDialogDescription className="font-montserrat">
                Cette action est irréversible. Votre abonnement sera annulé à la fin de la période de facturation en cours. Vous perdrez l'accès aux fonctionnalités Pro.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-montserrat">Retour</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelSubscription}
                className="font-montserrat bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Oui, annuler mon abonnement
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
