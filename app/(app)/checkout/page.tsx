// Fichier : app/(app)/checkout/page.tsx

"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Import des composants UI de base
import { Button } from '@/components/ui/button';

// Import des futurs composants "briques" que cette page va utiliser
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { PaymentForm } from '@/components/checkout/PaymentForm';

/**
 * Le composant interne qui gère la logique de la page.
 * Il est séparé pour pouvoir utiliser le hook `useSearchParams` à l'intérieur de <Suspense>.
 */
function CheckoutView() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');

  // Cas où l'URL ne contient pas de ?plan=...
  if (!planId) {
    return (
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold">Plan non valide</h2>
        <p className="font-montserrat text-muted-foreground mt-2 mb-6">
          Veuillez retourner à la page des tarifs pour choisir une offre.
        </p>
        <Button asChild>
          <Link href="/pricing">Voir les tarifs</Link>
        </Button>
      </div>
    );
  }

  // Si un plan est sélectionné, on affiche le checkout en utilisant les composants dédiés.
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
          Finaliser votre commande
        </h1>
        <p className="font-montserrat mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Vous y êtes presque. Vérifiez les détails et procédez au paiement en toute sécurité.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        
        {/* Colonne de gauche : Le composant de récapitulatif */}
        <div className="lg:col-span-2">
          <OrderSummary planId={planId} />
        </div>

        {/* Colonne de droite : Le composant de paiement */}
        <div className="lg:col-span-3">
          <PaymentForm planId={planId} />
        </div>
      </div>
    </>
  );
}

/**
 * La page principale exportée, qui gère le chargement avec Suspense.
 */
export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutView />
      </Suspense>
    </div>
  );
}

/**
 * Un composant de chargement stylisé.
 */
function CheckoutLoading() {
  return (
    <div className="text-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="font-montserrat text-lg text-muted-foreground mt-6">
        Préparation de votre commande...
      </p>
    </div>
  );
}
