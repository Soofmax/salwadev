// Fichier: components/pricing/CheckoutButton.tsx

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Le bouton n'a besoin que de quelques informations du plan pour fonctionner.
type PlanInfo = {
  id: string;
  price: string;
  isFeatured?: boolean;
};

interface CheckoutButtonProps {
  plan: PlanInfo;
}

export function CheckoutButton({ plan }: CheckoutButtonProps) {
  // On détermine le lien en fonction du type de plan.
  const isContactPlan = plan.price === 'Sur devis';
  const href = isContactPlan ? '/contact' : `/checkout?plan=${plan.id}`;

  return (
    <Button 
      asChild 
      size="lg" 
      className={`w-full font-montserrat font-semibold text-lg py-6 transform hover:scale-105 transition-all duration-300
        ${plan.isFeatured ? 'bg-gradient-rose text-white shadow-rose' : ''}`
      }
      // On utilise la prop "variant" pour un style cohérent avec les boutons de shadcn/ui.
      variant={plan.isFeatured ? 'default' : 'outline'}
    >
      <Link href={href}>
        {isContactPlan ? 'Nous contacter' : 'Choisir ce plan'}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
