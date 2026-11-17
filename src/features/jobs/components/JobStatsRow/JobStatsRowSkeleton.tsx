import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function JobStatsRowSkeleton() {
  return (
    <div role="status" aria-label="Loading job analytics" aria-busy="true" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} aria-hidden="true" className="flex min-h-40 flex-col justify-between border border-[#F1F2F9] bg-white p-4">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-12" />
        </div>
      ))}
    </div>
  );
}
