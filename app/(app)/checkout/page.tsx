'use client';

import { OrderSummary, PaymentForm } from '@/components/checkout';
import { useCart } from '@/src/hooks/useCart';

export default function CheckoutPage() {
  const { items } = useCart();

  // Calcul du total
  // Calcul du total en incluant le prix des services et des add-ons
  const total = items.reduce((sum, item) => {
    // Prix du service principal
    const serviceTotal = (item.unitPrice || 0) * (item.quantity || 1);
    // Prix des add-ons si fournis
    const addonsTotal = Array.isArray(item.addons)
      ? item.addons.reduce((a, addon) => a + (addon.unitPrice || 0), 0)
      : 0;
    return sum + serviceTotal + addonsTotal;
  }, 0);

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <OrderSummary items={items} total={total} />
        </div>
        <div className="md:col-span-3">
          <PaymentForm items={items} />
        </div>
      </div>
    </div>
  );
}