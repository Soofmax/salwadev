'use client';

import { useCart } from '@/src/hooks/useCart';
import { useServices } from '@/src/hooks/useServices';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const { services } = useServices();

  const getService = (id: string) => services?.find((s: any) => s.id === id);
  const getAddon = (id: string) => services?.find((s: any) => s.id === id);

  const total = items.reduce((sum, item) => {
    const service = getService(item.serviceId);
    const addOnSum = item.addonIds
      .map((id) => getAddon(id)?.price || 0)
      .reduce((a, b) => a + b, 0);
    return sum + (service?.price || 0) + addOnSum;
  }, 0);

  const handleValidate = () => {
    // Encode cartItems in query param for contact
    const params = encodeURIComponent(JSON.stringify(items));
    window.location.href = `/contact?cartItems=${params}`;
  };

  if (!services) {
    return <div className="text-center my-20 text-lg">Chargement du panier...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Mon Panier Devis</h1>
      {items.length === 0 ? (
        <div className="text-center text-charcoal/60">
          Votre panier est vide.<br />
          <Link href="/services" className="text-magenta underline">Voir les services</Link>
        </div>
      ) : (
        <>
          <ul className="space-y-6 mb-8">
            {items.map((item) => {
              const service = getService(item.serviceId);
              return (
                <li key={item.serviceId} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-lg text-charcoal">{service?.name || 'Service inconnu'}</div>
                      <div className="text-charcoal/70">{service?.description}</div>
                    </div>
                    <Button variant="ghost" className="text-red-600" onClick={() => removeItem(item.serviceId)}>
                      Supprimer
                    </Button>
                  </div>
                  {item.addonIds.length > 0 && (
                    <div className="pl-4 mb-2">
                      <div className="font-semibold text-charcoal mb-1">Add-ons :</div>
                      <ul className="list-disc pl-6">
                        {item.addonIds.map((addOnId) => {
                          const addOn = getAddon(addOnId);
                          return (
                            <li key={addOnId} className="text-charcoal/80">
                              {addOn?.name} <span className="font-semibold text-magenta">+{addOn?.price || 0}€</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  <div className="font-bold text-magenta text-lg mt-2">
                    Total : {(service?.price || 0) +
                      item.addonIds
                        .map((id) => getAddon(id)?.price || 0)
                        .reduce((a, b) => a + b, 0)}€
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center mb-8">
            <Button variant="outline" onClick={clearCart}>Vider le panier</Button>
            <div className="font-bold text-xl text-charcoal">Total général : {total}€</div>
          </div>
          <Button size="lg" className="bg-gradient-rose text-white w-full" onClick={handleValidate}>
            Valider le devis
          </Button>
        </>
      )}
    </div>
  );
}