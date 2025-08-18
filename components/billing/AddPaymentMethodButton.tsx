// Fichier: components/billing/AddPaymentMethodButton.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Import des composants pour la modale (si tu utilises shadcn/ui)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export function AddPaymentMethodButton() {
  // La logique pour gérer l'ajout d'un moyen de paiement sera ici.
  // Cela impliquera probablement d'interagir avec une API comme Stripe Elements.
  const handleAddNewMethod = () => {
    console.log("Ouverture de l'interface pour ajouter un nouveau moyen de paiement...");
    // Ici, on initialiserait le formulaire Stripe dans la modale.
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-montserrat bg-gradient-rose text-white shadow-rose">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un moyen de paiement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-playfair">Nouveau moyen de paiement</DialogTitle>
          <DialogDescription className="font-montserrat">
            Ajoutez une nouvelle carte à votre compte en toute sécurité.
          </DialogDescription>
        </DialogHeader>
        
        {/* 
          Cette div est un placeholder pour le formulaire Stripe Elements.
          Il sera remplacé par le formulaire de carte bancaire réel.
        */}
        <div className="py-4">
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center bg-muted/40">
            <h3 className="font-playfair text-lg font-semibold text-foreground">
              Formulaire de carte
            </h3>
            <p className="font-montserrat text-sm text-muted-foreground mt-2">
              Le formulaire sécurisé s'affichera ici.
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="font-montserrat">
              Annuler
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleAddNewMethod} className="font-montserrat bg-gradient-rose text-white">
            Enregistrer la carte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
