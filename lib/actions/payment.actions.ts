// Fichier: lib/actions/payment.actions.ts

'use server';

// Ce fichier contiendra toutes les actions liées au paiement.
// Il est marqué 'use server' pour indiquer que toutes les fonctions
// exportées ici sont des Server Actions.

// --- Types partagés ---
// Dans une vraie application, ces types seraient dans un fichier partagé (ex: types/index.ts)
interface OrderDetails {
  orderNumber: string;
  planName: string;
  amount: number;
}

// --- Action pour créer une session de paiement ---
// Appelée depuis le bouton "Choisir ce plan" sur la page des tarifs.
export async function createCheckoutSession(planId: string) {
  console.log(`[Server Action] Création d'une session de checkout pour le plan : ${planId}`);

  // LOGIQUE RÉELLE (à implémenter avec Stripe) :
  // 1. Récupérer les détails du plan depuis la base de données pour obtenir le prix.
  // 2. Créer une session de checkout Stripe avec le prix, les URLs de succès/annulation.
  // 3. Retourner l'URL de la page de paiement Stripe.

  // Simulation
  await new Promise(resolve => setTimeout(resolve, 1000));

  // On simule une redirection vers la page de paiement.
  // Dans la vraie vie, on utiliserait la fonction redirect() de Next.js
  // avec l'URL retournée par Stripe.
  return {
    success: true,
    message: 'Session de checkout créée.',
    redirectUrl: `/checkout?plan=${planId}` // Pour la démo, on redirige vers notre propre page.
  };
}


// --- Action pour vérifier une session de paiement ---
// Appelée depuis la page de succès du checkout.
export async function verifyPaymentSession(sessionId: string) {
  console.log(`[Server Action] Vérification de la session de paiement : ${sessionId}`);

  // LOGIQUE RÉELLE (à implémenter avec Stripe) :
  // 1. Récupérer l'objet de session depuis l'API Stripe en utilisant le sessionId.
  // 2. Vérifier que le statut de la session est 'complete'.
  // 3. Si c'est le cas, mettre à jour la base de données (activer l'abonnement de l'utilisateur).
  // 4. Récupérer les détails de la commande pour les afficher.

  // Simulation
  await new Promise(resolve => setTimeout(resolve, 1500));

  // On simule une vérification réussie.
  if (sessionId.startsWith('cs_')) { // Simule un ID de session Stripe valide
    return {
      success: true,
      message: 'Paiement validé avec succès.',
      orderDetails: {
        orderNumber: `ORDER-${Math.floor(Math.random() * 10000)}`,
        planName: 'Plan Pro',
        amount: 29.00,
      } as OrderDetails,
    };
  }

  // On simule une vérification échouée.
  return {
    success: false,
    message: 'Session de paiement invalide ou expirée.',
    orderDetails: null,
  };
}


// --- Action pour annuler un abonnement ---
// Appelée depuis le bouton "Annuler l'abonnement" dans BillingActions.
export async function cancelSubscription() {
  console.log(`[Server Action] Annulation de l'abonnement de l'utilisateur...`);

  // LOGIQUE RÉELLE (à implémenter avec Stripe) :
  // 1. Récupérer l'ID de l'abonnement de l'utilisateur depuis la base de données.
  // 2. Appeler l'API Stripe pour annuler l'abonnement (cancel_at_period_end: true).
  // 3. Mettre à jour le statut de l'abonnement dans la base de données.

  // Simulation
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'Votre abonnement a été programmé pour être annulé à la fin de la période en cours.',
  };
}
