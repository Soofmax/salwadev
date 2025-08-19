import useSWR from 'swr';
import { fetcher } from '@/services/serviceClient';

export function useService(id: string) {
  const { data, error, mutate } = useSWR(id ? `/api/services/${id}` : null, fetcher);

  async function updateService(update: any) {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
    if (!res.ok) throw new Error('Erreur update');
    await mutate();
    return res.json();
  }

  async function deleteService() {
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('Erreur delete');
    await mutate();
    return true;
  }

  return {
    service: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
    updateService,
    deleteService,
  };
}