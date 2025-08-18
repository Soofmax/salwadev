// Fichier : app/(app)/billing/page.tsx
import { CurrentPlanCard } from '@/components/billing/CurrentPlanCard';
import { BillingActions } from '@/components/billing/BillingActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FileText, CreditCard } from 'lucide-react';
import { Metadata } from 'next';

// Typage des données de facturation pour paiements à la carte
type PaymentStatus = "Actif" | "Annulé" | "En attente";

interface UserBilling {
  planName: string;
  status: PaymentStatus;
  nextPaymentDate: Date; // Obligatoire pour correspondre au type attendu
  price: number;
}

// Métadonnées pour le SEO (Next.js 15)
export const metadata: Metadata = {
  title: "Facturation | Votre Service",
  description: "Gérez vos paiements, vos moyens de paiement et consultez vos factures.",
};

// Simulation d'une fonction qui récupère les données de facturation de l'utilisateur.
// Dans une vraie application, cette fonction interrogerait votre base de données ou l'API de paiement.
async function getUserBilling(): Promise<UserBilling> {
  // Simule un appel réseau
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  return {
    planName: 'Paiement à la carte',
    status: 'Actif' as const,
    nextPaymentDate: new Date('2025-09-15T00:00:00Z'), // Date du prochain paiement possible ou date d'expiration du crédit
    price: 29, // Dernier paiement ou crédit restant
  };
}

export default async function BillingPage(): Promise<JSX.Element> {
  // En tant que Server Component, on peut récupérer les données directement.
  const billing = await getUserBilling();

  return (
    <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
      <div className="mb-12">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
          Gestion de la Facturation
        </h1>
        <p className="font-montserrat mt-4 text-lg text-muted-foreground">
          Gérez vos paiements, vos moyens de paiement et consultez l'historique de vos factures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Colonne principale avec les informations de facturation */}
        <div className="lg:col-span-2">
          <CurrentPlanCard subscription={billing} />
        </div>

        {/* Colonne latérale avec les actions et liens */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">Ressources</CardTitle>
              <CardDescription className="font-montserrat">Accès rapide</CardDescription>
            </CardHeader>
            <CardContent className="font-montserrat space-y-2">
              <Link 
                href="/billing/payment-methods" 
                className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
              >
                <CreditCard className="mr-3 h-5 w-5 text-primary" />
                <span>Gérer les moyens de paiement</span>
              </Link>
              <Link 
                href="/billing/invoices" 
                className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
              >
                <FileText className="mr-3 h-5 w-5 text-primary" />
                <span>Historique des factures</span>
              </Link>
            </CardContent>
          </Card>

          {/* Le composant pour les actions sensibles comme l'annulation */}
          <BillingActions />
        </div>
      </div>
    </div>
  );
}
