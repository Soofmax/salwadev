import useSWR from 'swr';
import { fetcher } from '@/services/serviceClient';

export function useServices() {
  const { data, error, mutate } = useSWR('/api/services', fetcher);

  // Create service and refresh list
  async function createService(service: any) {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error('Erreur lors de la création');
    await mutate(); // revalidate
    return res.json();
  }

  return {
    services: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
    createService,
  };
}