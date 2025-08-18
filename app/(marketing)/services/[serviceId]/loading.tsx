import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-3/4 mb-6" />
      <Skeleton className="w-full h-80 rounded-lg mb-8" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
