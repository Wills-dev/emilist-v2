import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton";

const OverviewSkeleton = () => (
  <Container variant="small">
    <main
      aria-label="Loading dashboard overview"
      className="grid gap-4 py-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]"
    >
      <div className="space-y-4">
        <Skeleton className="h-19 w-full bg-gray-200" />
        <section className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-40 bg-gray-200" />
          ))}
        </section>
        <div className="space-y-3 pt-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-28 bg-gray-200" />
            <Skeleton className="size-8 rounded-[10px] bg-gray-200" />
          </div>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-20 bg-gray-200" />
            ))}
          </section>
        </div>
        <Skeleton className="h-80 w-full bg-gray-200" />
      </div>

      <aside className="space-y-4">
        <Skeleton className="hidden h-41.5 bg-gray-200 xl:block" />
        <Skeleton className="h-140 bg-gray-200" />
        <Skeleton className="h-36 bg-gray-200" />
      </aside>
    </main>
  </Container>
);

export default OverviewSkeleton;

