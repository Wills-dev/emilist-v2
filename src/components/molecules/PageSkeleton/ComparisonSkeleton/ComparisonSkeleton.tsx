import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { SkeletonLines } from "../SkeletonSections/SkeletonSections";
export default function ComparisonSkeleton() {
  return (
    <Container variant="small" className="py-4">
      <div role="status" aria-busy="true" aria-label="Loading comparison">
        <div aria-hidden="true" className="space-y-5">
          <div className="flex justify-between">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="min-w-72 flex-1 space-y-6 rounded-lg border border-[#ECECEC] p-4"
              >
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="border-t py-4">
                    <SkeletonLines />
                  </div>
                ))}
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
