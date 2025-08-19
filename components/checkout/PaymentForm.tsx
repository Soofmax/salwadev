'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const paymentFormSchema = z.object({
  provider: z.enum(["stripe", "paypal", "coinbase"], { required_error: "Choisissez un moyen de paiement." }),
  email: z.string().email("Email invalide."),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export function PaymentForm({ items }: { items: any[] }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      provider: "stripe",
      email: "",
    },
  });

  async function onSubmit(data: PaymentFormValues) {
    setServerError(null);
    setLoading(true);
    try {
      const payload = {
        provider: data.provider,
        email: data.email,
        items: (items || []).map((it: any) => ({
          serviceId: it.serviceId,
          addonIds: Array.isArray(it.addons) ? it.addons.map((a: any) => a.id) : (it.addonIds || []),
        })),
      };
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok && result.url) {
        window.location.href = result.url;
      } else {
        setServerError(result.error || "Erreur lors du paiement.");
      }
    } catch (e: any) {
      setServerError(e.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="max-w-xl mx-auto space-y-8 pt-8" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mb-4">
        <legend className="block mb-2 font-semibold text-charcoal">Choisissez un moyen de paiement</legend>
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input type="radio" {...register("provider")} value="stripe" />
            <span>Carte bancaire (Stripe)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" {...register("provider")} value="paypal" />
            <span>PayPal</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" {...register("provider")} value="coinbase" />
            <span>Crypto (Coinbase)</span>
          </label>
        </div>
        {errors.provider && <div className="text-red-600 text-sm mt-2">{errors.provider.message}</div>}
      </fieldset>

      <div>
        <label htmlFor="email" className="block font-medium mb-1 text-charcoal">
          Email pour le reçu
        </label>
        <input
          id="email"
          type="email"
          className="w-full border rounded px-4 py-2"
          {...register("email")}
        />
        {errors.email && (
          <div className="text-red-600 text-sm mt-1">{errors.email.message}</div>
        )}
      </div>

      {/* No hidden input for items, they are included in the payload from props */}

      {serverError && <div className="text-red-600 text-center mb-4">{serverError}</div>}

      <Button type="submit" size="lg" className="w-full bg-gradient-rose text-white" disabled={loading}>
        {loading ? "Paiement en cours..." : "Payer"}
      </Button>
    </form>
  );
}