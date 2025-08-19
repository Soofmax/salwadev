'use client';

import { OrderSummary, PaymentForm } from '@/components/checkout';
import { useCart } from '@/src/hooks/useCart';
import { useServices } from '@/src/hooks/useServices';

export default function CheckoutPage() {
  const { items } = useCart();
  const { services, isLoading: loadingServices } = useServices();

  // Enrichir items : nom, prix unitaire, add-on names, etc.
  const enrichedItems = items.map((item) => {
    const service = services?.find((s) => s.id === item.serviceId);
    const unitPrice = service?.price || 0;
    const serviceName = service?.name || item.serviceId;
    const addonsDetails = (item.addonIds || []).map((id) => {
      const addon = services?.find((s) => s.id === id);
      return {
        id,
        unitPrice: addon?.price || 0,
        addonName: addon?.name || id,
      };
    });
    return {
      ...item,
      unitPrice,
      serviceName,
      addons: addonsDetails,
      quantity: item.quantity || 1,
    };
  });

  const total = enrichedItems.reduce((sum, item) => {
    const serviceTotal = item.unitPrice * item.quantity;
    const addonsTotal = item.addons.reduce((a: number, addon: any) => a + addon.unitPrice, 0);
    return sum + serviceTotal + addonsTotal;
  }, 0);

  if (loadingServices) {
    return <div>Chargement des prix...</div>;
  }

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <OrderSummary items={enrichedItems} total={total} />
        </div>
        <div className="md:col-span-3">
          <PaymentForm items={enrichedItems} />
        </div>
      </div>
    </div>
  );
}
  );
}