import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import JobCardSkeleton from "@/features/jobs/components/JobCard/JobCardSkeleton/JobCardSkeleton";
import MaterialCardSkeleton from "@/features/materials/components/MaterialCard/MaterialCardSkeleton/MaterialCardSkeleton";

export default function MarketplaceSkeleton({
  dashboard = false,
  kind = "jobs",
  related = false,
}: {
  dashboard?: boolean;
  related?: boolean;
  kind?: "jobs" | "materials" | "experts";
}) {
  return (
    <Container variant={dashboard ? "small" : "center"} className="py-6">
      <div role="status" aria-busy="true" aria-label={`Loading ${kind}`}>
        <div aria-hidden="true" className="space-y-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div
            className={`grid items-start gap-6 ${related ? "" : "xl:grid-cols-[240px_minmax(0,1fr)]"}`}
          >
            {!related && (
              <aside className="hidden space-y-6 bg-[#F9F9F9] p-4 xl:block">
                <Skeleton className="h-7 w-24" />
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </aside>
            )}
            <div className="min-w-0 space-y-5">
              <div className="flex gap-4">
                <Skeleton className="h-11 flex-1" />
                <Skeleton className="h-11 w-24" />
              </div>
              <div className="flex gap-3 overflow-hidden">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-7 w-28" />
              </div>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="w-full min-w-0 sm:w-[375.5px]">
                    {kind === "jobs" ? (
                      <JobCardSkeleton />
                    ) : kind === "materials" ? (
                      <MaterialCardSkeleton />
                    ) : (
                      <div className="space-y-5 rounded-lg bg-[#F9F9F9] p-4">
                        <div className="flex gap-4">
                          <Skeleton className="size-14 rounded-full" />
                          <div className="flex-1 space-y-3">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-9 w-full" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
