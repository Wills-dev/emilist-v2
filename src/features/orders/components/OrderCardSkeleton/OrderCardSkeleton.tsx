import { Skeleton } from "@/components/ui/skeleton/skeleton";

const OrderCardSkeleton = ({ isLast = false }: { isLast?: boolean }) => (
  <div
    aria-hidden="true"
    className={`w-full ${isLast ? "" : "border-b border-[#F1F2F9] pb-3.5"}`}
  >
    <div className="space-y-2 py-3.5">
      <div className="flex items-center gap-2.5 sm:gap-3.5 max-lg:border-b max-lg:border-[#F1F2F9] max-lg:pb-2">
        <Skeleton className="h-16 w-16.5 shrink-0 rounded-[8.75px] md:h-32.5 md:w-28" />
        <div className="w-full flex-1 space-y-3">
          <div className="flex justify-between gap-4 max-lg:flex-col lg:items-center">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="hidden flex-wrap gap-3 border-y border-[#F1F2F9] py-3 lg:flex">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="hidden items-center justify-between gap-4 lg:flex">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-24 rounded-[6.75px]" />
              <Skeleton className="h-7 w-24 rounded-[6.75px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 lg:hidden">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-24 rounded-[6.75px]" />
          <Skeleton className="h-7 w-24 rounded-[6.75px]" />
        </div>
        <div className="flex flex-wrap gap-3 border-y border-[#F1F2F9] py-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  </div>
);

export default OrderCardSkeleton;
