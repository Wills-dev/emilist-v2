import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
export default function CartPageSkeleton({
  dashboard = false,
  checkout = false,
}: {
  dashboard?: boolean;
  checkout?: boolean;
}) {
  return (
    <Container variant={dashboard ? "small" : "center"}>
      <div
        role="status"
        aria-busy="true"
        aria-label={`Loading ${checkout ? "checkout" : "cart"}`}
        className="pb-15 pt-6"
      >
        <div aria-hidden="true" className="space-y-10">
          <Skeleton className="h-8 w-20" />
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div className="space-y-6 bg-[#F9F9F9] p-4 sm:p-6">
              <Skeleton className="h-7 w-36" />
              {checkout && (
                <div className="space-y-4 border-b pb-6">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-10 w-32" />
                </div>
              )}
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="flex gap-4 border-t border-[#ECECEC] pt-6"
                >
                  <Skeleton className="size-20 shrink-0 sm:size-28" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex justify-between gap-4">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {!checkout && (
                <div className="space-y-4 bg-[#F9F9F9] p-5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              <div className="space-y-6 bg-[#F9F9F9] p-5">
                <Skeleton className="h-6 w-40" />
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex justify-between gap-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
                <Skeleton className="h-11 w-full" />
              </div>
              {!checkout && (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
