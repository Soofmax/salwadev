// Fichier: components/pricing/PricingTable.tsx

// Import du composant "brique" qui affichera chaque plan individuel
import { PlanCard } from '@/components/pricing/PlanCard';

// Données simulées. Plus tard, ce composant pourra les recevoir en props depuis la page.
const mockPlans = [
  {
    id: 'plan_free',
    name: 'Essentiel',
    price: '0€',
    interval: '/mois',
    description: 'Idéal pour démarrer et découvrir nos fonctionnalités de base.',
    features: ['1 projet', 'Analyse basique', 'Support communautaire'],
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    price: '29€',
    interval: '/mois',
    description: 'Parfait pour les freelances et les petites équipes en croissance.',
    features: ['Projets illimités', 'Analyse avancée', 'Support prioritaire', 'Intégrations API'],
    isFeatured: true,
  },
  {
    id: 'plan_enterprise',
    name: 'Entreprise',
    price: 'Sur devis',
    interval: '',
    description: 'Pour les organisations avec des besoins spécifiques et sur mesure.',
    features: ['Toutes les fonctionnalités Pro', 'SSO & Sécurité renforcée', 'Support dédié 24/7'],
  },
];

export function PricingTable() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      {/* 
        On mappe sur la liste des plans et on délègue l'affichage de chaque plan
        au composant PlanCard. C'est le principe de composition.
      */}
      {mockPlans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
