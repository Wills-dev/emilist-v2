import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import CompareMaterialCardSkeleton from "@/features/materials/components/CompareMaterialCard/CompareMaterialCardSkeleton/CompareMaterialCardSkeleton";
import ComparisonProfileCardSkeleton from "./ComparisonProfileCardSkeleton";

export default function ComparisonSkeleton({ variant = "job" }: { variant?: "job" | "expert" | "material" }) {
  return (
    <Container variant="small" className="py-4">
      <div role="status" aria-busy="true" aria-label={`Loading compared ${variant === "expert" ? "experts" : variant === "material" ? "materials" : "jobs"}`}>
        <div aria-hidden="true">
          <div className="mb-4 flex items-center justify-between gap-4">
            <Skeleton className="h-8 w-20" />
            <div className="flex gap-3">{variant === "job" && <Skeleton className="h-9 w-32" />}<Skeleton className="h-5 w-40" /></div>
          </div>
          <div className="flex w-full gap-3 overflow-hidden pb-4">
            {[0, 1, 2, 3].map((index) => variant === "material" ? <CompareMaterialCardSkeleton key={index} /> : <ComparisonProfileCardSkeleton key={index} expert={variant === "expert"} />)}
          </div>
        </div>
      </div>
    </Container>
  );
}
