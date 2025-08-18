// Fichier : app/(app)/checkout/cancelled/page.tsx

// Import du futur composant "brique" que cette page va utiliser
import { CancelledDisplay } from '@/components/checkout/CancelledDisplay';

// Metadonnées pour le SEO (utile pour que les moteurs de recherche n'indexent pas cette page)
export const metadata = {
  title: "Paiement Annulé",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutCancelledPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4">
      {/* 
        Cette page est simple, elle pourrait contenir directement le JSX.
        Mais pour rester cohérent avec notre architecture, on délègue l'affichage
        à un composant dédié. Cela permet de réutiliser le "CancelledDisplay"
        ailleurs si besoin (par exemple dans une modale).
      */}
      <CancelledDisplay />
    </div>
  );
}
