import React from "react";

export interface OrderSummaryProps {
  items: {
    serviceId: string;
    addonIds?: string[];
    unitPrice: number;
    quantity: number;
  }[];
  total: number;
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-cream bg-white shadow">
      <table className="min-w-full divide-y divide-cream">
        <thead>
          <tr className="bg-rose-powder/10">
            <th className="px-4 py-3 text-left text-xs font-semibold text-charcoal uppercase">
              Service/Add-ons
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-charcoal uppercase">
              Quantité
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-charcoal uppercase">
              Prix unitaire
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-charcoal uppercase">
              Sous-total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream">
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-rose-powder/5">
              <td className="px-4 py-3">
                <div className="font-medium text-charcoal">{item.serviceName || item.serviceId}</div>
                {item.addons && item.addons.length > 0 && (
                  <div className="text-xs text-charcoal/60 mt-1">
                    + {item.addons.map((addon: any) => addon.addonName || addon.id).join(", ")}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-right">{item.quantity}</td>
              <td className="px-4 py-3 text-right">
                {item.unitPrice.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </td>
              <td className="px-4 py-3 text-right font-semibold">
                {(item.unitPrice * item.quantity + (item.addons?.reduce((a: number, addon: any) => a + addon.unitPrice, 0) || 0)).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="px-4 py-4 text-right font-bold text-charcoal">
              Total
            </td>
            <td className="px-4 py-4 text-right font-bold text-magenta text-lg">
              {total.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}