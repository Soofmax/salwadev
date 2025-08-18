// Fichier: components/billing/PaymentMethodsList.tsx

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DeletePaymentMethodButton } from './DeletePaymentMethodButton';
import { FaCcVisa, FaCcMastercard, FaCreditCard } from 'react-icons/fa'; // Utilisation de react-icons pour les logos

// Définition du type pour un moyen de paiement.
interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  isDefault: boolean;
}

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethod[];
}

// Un petit composant pour afficher le bon logo de carte.
const BrandIcon = ({ brand }: { brand: string }) => {
  const lowerBrand = brand.toLowerCase();
  if (lowerBrand === 'visa') {
    return <FaCcVisa className="h-8 w-8 text-blue-600" />;
  }
  if (lowerBrand === 'mastercard') {
    return <FaCcMastercard className="h-8 w-8 text-red-600" />;
  }
  return <FaCreditCard className="h-8 w-8 text-muted-foreground" />;
};

export function PaymentMethodsList({ paymentMethods }: PaymentMethodsListProps) {
  if (!paymentMethods || paymentMethods.length === 0) {
    return (
      <div className="text-center border-2 border-dashed rounded-lg p-12">
        <h3 className="font-playfair text-2xl">Aucun moyen de paiement</h3>
        <p className="font-montserrat text-muted-foreground mt-2">
          Veuillez ajouter un moyen de paiement pour continuer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {paymentMethods.map((pm) => (
        <Card key={pm.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrandIcon brand={pm.brand} />
              <div className="font-montserrat">
                <span className="font-semibold">{pm.brand}</span> se terminant par <span className="font-semibold">{pm.last4}</span>
                {pm.isDefault && <Badge className="ml-2">Défaut</Badge>}
                <p className="text-sm text-muted-foreground">
                  Expire le {String(pm.exp_month).padStart(2, '0')}/{pm.exp_year}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* On délègue l'action de suppression à un composant bouton dédié */}
              <DeletePaymentMethodButton paymentMethodId={pm.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
