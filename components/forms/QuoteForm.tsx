'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const itemSchema = z.object({
  serviceId: z.string(),
  addonIds: z.array(z.string()),
});
const quoteSchema = z.object({
  name: z.string().min(2, 'Le nom est requis.'),
  email: z.string().email('Email invalide.'),
  message: z.string().min(10, 'Le message doit faire au moins 10 caractères.'),
  items: z.array(itemSchema).optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteForm({ initialItems }: { initialItems?: any[] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      items: initialItems || [],
    },
  });

  // Ensure items are set from initialItems prop
  // (For hidden field, in case of navigation)
  if (initialItems) setValue('items', initialItems);

  async function onSubmit(data: QuoteFormValues) {
    setSubmitting(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        window.alert('Votre demande a bien été envoyée !');
        router.push('/contact/thank-you');
      } else {
        const err = await res.json();
        window.alert('Erreur: ' + (err?.error || ''));
      }
    } catch (err: any) {
      window.alert('Erreur: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block font-medium mb-1 text-charcoal">
          Nom
        </label>
        <input
          id="name"
          type="text"
          className="w-full border rounded px-4 py-2"
          {...register('name')}
        />
        {errors.name && (
          <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block font-medium mb-1 text-charcoal">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border rounded px-4 py-2"
          {...register('email')}
        />
        {errors.email && (
          <div className="text-red-600 text-sm mt-1">{errors.email.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-1 text-charcoal">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full border rounded px-4 py-2"
          {...register('message')}
        />
        {errors.message && (
          <div className="text-red-600 text-sm mt-1">{errors.message.message}</div>
        )}
      </div>
      {/* Hidden items field */}
      <input type="hidden" {...register('items')} value={JSON.stringify(initialItems || [])} />
      <Button type="submit" size="lg" className="bg-gradient-rose text-white" disabled={submitting}>
        {submitting ? 'Envoi en cours...' : 'Envoyer la demande'}
      </Button>
    </form>
  );
}