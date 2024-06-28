import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonView() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-4 w-[380px] bg-blue-400' />
    </div>
  );
}
