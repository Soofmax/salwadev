// Fichier: components/sections/PricingSection.tsx

// Import du composant "brique" qui affichera chaque plan individuel
import { PlanCard } from '@/components/pricing/PlanCard';

// Données simulées. Dans une application réelle, ce composant pourrait
// être un Server Component et récupérer ces données lui-même, ou les recevoir en props.
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

export function PricingSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* 
          On utilise le composant PricingTable pour organiser les cartes.
          Cela maintient une bonne séparation des responsabilités.
          PricingSection -> Structure de la section
          PricingTable -> Structure de la grille
          PlanCard -> Affichage d'un plan
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {mockPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
