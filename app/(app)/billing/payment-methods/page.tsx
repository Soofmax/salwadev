// Fichier : app/(app)/billing/payment-methods/page.tsx

// Import des futurs composants "briques" que cette page va utiliser
import { PaymentMethodsList } from '@/components/billing/PaymentMethodsList';
import { AddPaymentMethodButton } from '@/components/billing/AddPaymentMethodButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Metadonnées pour le SEO
export const metadata = {
  title: "Moyens de Paiement | Votre Service",
  description: "Gérez vos cartes de crédit et autres moyens de paiement.",
};

// Simulation d'une fonction qui récupère les moyens de paiement de l'utilisateur.
// Dans une vraie application, cette fonction interrogerait l'API Stripe.
async function getUserPaymentMethods() {
  // Simule un appel réseau
  await new Promise(resolve => setTimeout(resolve, 500)); 
  return [
    { id: 'pm_123', brand: 'Visa', last4: '4242', exp_month: 8, exp_year: 2028, isDefault: true },
    { id: 'pm_456', brand: 'Mastercard', last4: '5555', exp_month: 12, exp_year: 2026, isDefault: false },
  ];
}

export default async function PaymentMethodsPage() {
  // En tant que Server Component, on récupère les données directement.
  const paymentMethods = await getUserPaymentMethods();

  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
      <div className="flex justify-between items-start mb-12">
        <div>
          <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/billing">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la facturation
            </Link>
          </Button>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Moyens de paiement
          </h1>
          <p className="font-montserrat mt-4 text-lg text-muted-foreground">
            Ajoutez, mettez à jour ou supprimez vos moyens de paiement.
          </p>
        </div>
        {/* 
          Le bouton pour ajouter un moyen de paiement est un composant client
          car il devra probablement ouvrir une modale ou un formulaire interactif.
        */}
        <AddPaymentMethodButton />
      </div>

      {/* 
        On délègue l'affichage de la liste au composant dédié.
        On lui passe les données récupérées côté serveur.
      */}
      <PaymentMethodsList paymentMethods={paymentMethods} />
    </div>
  );
}
