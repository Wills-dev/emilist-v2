import { Skeleton } from "@/components/ui/skeleton";

const ListedCardSkeleton = ({ isLast = false }: { isLast?: boolean }) => (
  <div
    aria-busy="true"
    aria-label="Loading listed material"
    className={`w-full ${isLast ? "" : "border-b border-[#F1F2F9] pb-3.5"}`}
  >
    <div className="flex min-w-0 gap-2.5 py-3.5 sm:gap-3.5">
      <Skeleton className="h-14 w-14 min-w-14 rounded-[8.75px] md:h-28 md:w-28 md:min-w-28" />
      <div className="min-w-0 flex-1 space-y-4">
        <div className="flex min-w-0 justify-between gap-2 sm:gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5 min-w-16 max-w-full" />
            <div className="flex min-w-0 gap-2 sm:gap-3">
              <Skeleton className="h-3 w-16 max-w-[45%] sm:w-24" />
              <Skeleton className="h-3 w-20 max-w-[45%] sm:w-28" />
            </div>
            <Skeleton className="hidden h-3 w-32 max-w-full sm:block" />
          </div>
          <Skeleton className="h-8 w-18 shrink-0 sm:w-28" />
        </div>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Skeleton className="h-8 w-20 max-w-full sm:w-24" />
          <div className="hidden gap-2 md:flex">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-28" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-2 border-t border-[#F1F2F9] pt-3.5 md:hidden">
      <Skeleton className="h-7 w-20 max-w-[45%]" />
      <Skeleton className="h-7 w-24 max-w-[45%]" />
    </div>
  </div>
);

export default ListedCardSkeleton;
