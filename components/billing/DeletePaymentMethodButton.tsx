// Fichier: components/billing/DeletePaymentMethodButton.tsx

'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';

// Import des composants pour la modale de confirmation
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

interface DeletePaymentMethodButtonProps {
  paymentMethodId: string;
}

export function DeletePaymentMethodButton({ paymentMethodId }: DeletePaymentMethodButtonProps) {
  const [isPending, startTransition] = useTransition();

  // La logique d'appel à la Server Action pour supprimer le moyen de paiement.
  const handleDelete = () => {
    startTransition(async () => {
      console.log(`Appel de l'action serveur pour supprimer le moyen de paiement ${paymentMethodId}...`);
      // await deletePaymentMethodAction(paymentMethodId);
      // Ici, tu devras aussi rafraîchir la liste des moyens de paiement.
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Supprimer</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-playfair">
            Supprimer ce moyen de paiement ?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-montserrat">
            Cette action est irréversible. Si ce moyen de paiement est utilisé pour un abonnement actif, assurez-vous d'en ajouter un autre pour éviter toute interruption de service.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-montserrat">Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isPending}
            className="font-montserrat bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Oui, supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
