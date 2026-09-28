import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import ListedCardSkeleton from "@/features/materials/components/ListedCard/ListedCardSkeleton/ListedCardSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <Container variant="small" className="space-y-8 py-6">
        <div
          role="status"
          aria-busy="true"
          aria-label="Loading listed materials"
          className="space-y-8"
        >
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-20" />
          <div className="space-y-5 rounded-xl border border-[#F1F2F9] p-5">
            <Skeleton className="h-7 w-44" />
            {[0, 1, 2].map((i) => (
              <ListedCardSkeleton key={i} isLast={i === 2} />
            ))}
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
