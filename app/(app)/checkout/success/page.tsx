// Fichier : app/(app)/checkout/success/page.tsx
import { Suspense } from 'react';
import { SuccessDisplay } from '@/components/checkout/SuccessDisplay';
import { verifyPaymentSession } from '@/lib/actions/payment.actions'; // L'action serveur pour la vérification

// Interface mise à jour pour Next.js 15 - searchParams est maintenant un Promise
interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

/**
 * Ce composant serveur gère la logique de vérification.
 * Il est séparé pour être utilisé avec <Suspense>.
 */
async function SuccessView({ sessionId }: { sessionId: string }) {
  // Étape critique : On vérifie la session de paiement côté serveur.
  // Ne JAMAIS faire confiance à la redirection seule.
  const { success, orderDetails } = await verifyPaymentSession(sessionId);

  if (!success) {
    // Si la vérification échoue (session invalide, déjà utilisée, etc.)
    // On affiche un message d'erreur.
    return (
      <div className="text-center">
        <h1 className="font-playfair text-3xl font-bold text-destructive">Erreur de validation</h1>
        <p className="font-montserrat mt-4 text-muted-foreground">
          Impossible de confirmer votre paiement. Veuillez contacter le support si le problème persiste.
        </p>
      </div>
    );
  }

  // Si la vérification réussit, on passe les détails de la commande au composant d'affichage.
  return <SuccessDisplay orderDetails={orderDetails} />;
}

/**
 * La page principale exportée - maintenant async pour gérer le Promise searchParams.
 */
export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  // Attendre la résolution du Promise searchParams
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  // Si l'ID de session est manquant dans l'URL, on ne peut rien faire.
  if (!sessionId) {
    return (
      <div className="container mx-auto max-w-2xl py-20 text-center">
        <h1 className="font-playfair text-3xl font-bold">Session de paiement introuvable</h1>
        <p className="font-montserrat mt-4 text-muted-foreground">
          Le lien de confirmation semble invalide ou incomplet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4">
      <Suspense fallback={<SuccessLoading />}>
        <SuccessView sessionId={sessionId} />
      </Suspense>
    </div>
  );
}

/**
 * Un composant de chargement stylisé pendant la vérification.
 */
function SuccessLoading() {
  return (
    <div className="text-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="font-montserrat text-lg text-muted-foreground mt-6">
        Validation de votre paiement en cours...
      </p>
    </div>
  );
}
