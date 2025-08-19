import { Skeleton } from '@/components/ui/skeleton';
import PageContainer from '@/components/ui/PageContainer';

export default function LoadingServicePage() {
  return (
    <PageContainer className="bg-cream">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-charcoal mb-4">Chargement du service...</h2>
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="w-full h-80 rounded-lg mb-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </PageContainer>
  );
}
