import { Skeleton } from "@/components/ui/skeleton/skeleton";

export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${i === count - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}
export function RatingSkeleton() {
  return (
    <div className="space-y-6 bg-white p-5">
      <Skeleton className="h-5 w-32" />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-2 flex-1" />
          <Skeleton className="h-3 w-6" />
        </div>
      ))}
    </div>
  );
}
export function CommentsSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-6 bg-white p-4 sm:p-6">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-9 w-full rounded-full" />
      {Array.from({ length: compact ? 2 : 4 }, (_, i) => (
        <div key={i} className="space-y-5 border-t border-[#ECECEC] pt-5">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="ml-auto h-4 w-20" />
          </div>
          <SkeletonLines count={compact ? 3 : 4} />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}
