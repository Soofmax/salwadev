'use client';

import { OrderSummary, PaymentForm } from '@/components/checkout';
import { useCart } from '@/src/hooks/useCart';

export default function CheckoutPage() {
  const { items } = useCart();

  // Calcul du total
  const total = items.reduce((sum, item) => {
    const service = { unitPrice: 0, quantity: 1, ...item }; // Adapter si pricing réel dispo
    const addonsTotal = (item.addonIds || []).length * 0; // Adapter si addons pricing connu
    return sum + (service.unitPrice * service.quantity) + addonsTotal;
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