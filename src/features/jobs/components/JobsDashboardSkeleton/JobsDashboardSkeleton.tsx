import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
export default function JobsDashboardSkeleton() {
  return (
    <Container variant="small" className="py-4">
      <div role="status" aria-busy="true" aria-label="Loading jobs dashboard">
        <div aria-hidden="true" className="space-y-6">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-5 bg-white p-5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </div>
          <Skeleton className="h-9 w-40" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-9 w-24 shrink-0" />
            ))}
          </div>
          <div className="flex justify-between gap-4">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[700px] space-y-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="grid grid-cols-6 gap-5 bg-white p-5">
                  {Array.from({ length: 6 }, (_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-9 w-36" />
        </div>
      </div>
    </Container>
  );
}
