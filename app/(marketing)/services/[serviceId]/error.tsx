'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Une erreur est survenue !</h2>
      <p className="text-gray-500 mb-6">
        Impossible de charger les informations de ce service.
      </p>
      <Button onClick={() => reset()}>
        Réessayer
      </Button>
    </div>
  );
}
