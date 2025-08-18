// Fichier: components/pricing/PlanCard.tsx

import { Check } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Définition du type pour un plan, pour la robustesse et la clarté du code.
type Plan = {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
};

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card 
      className={`flex flex-col h-full transition-transform duration-300 service-card
        ${plan.isFeatured ? 'border-primary border-2 scale-105 shadow-rose-lg z-10' : 'border-border/80 bg-white/80 backdrop-blur-sm'}`
      }
    >
      {/* Bannière pour le plan mis en avant */}
      {plan.isFeatured && (
        <div className="text-center py-2 bg-gradient-rose text-white font-semibold font-montserrat">
          Le plus populaire
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="font-playfair text-3xl">{plan.name}</CardTitle>
        <CardDescription className="font-montserrat h-12">{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow p-6">
        <div className="text-center my-4">
          <span className="font-playfair text-5xl font-bold">{plan.price}</span>
          {plan.interval && <span className="font-montserrat text-muted-foreground">{plan.interval}</span>}
        </div>

        <ul className="font-montserrat space-y-4 mb-8 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* 
          L'action de clic est déléguée à un composant bouton dédié.
          Cela permet de garder la carte concentrée sur l'affichage.
        */}
        <div className="mt-auto">
          <CheckoutButton plan={plan} />
        </div>
      </CardContent>
    </Card>
  );
}
