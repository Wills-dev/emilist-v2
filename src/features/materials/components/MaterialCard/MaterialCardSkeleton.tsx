import { Skeleton } from "@/components/ui/skeleton";

const MaterialCardSkeleton = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading material"
      className="max-w-[375.5px] w-full sm:min-w-[375.5px] min-w-72.5 px-2 pt-2 pb-3 bg-[#F9F9F9] rounded-[8px]"
    >
      <div className="space-y-4">
        <div className="p-2.5 bg-white rounded-[12px]">
          <Skeleton className="h-45 w-full rounded-[12px]" />
        </div>

        <div className="flex justify-between gap-2 border-b border-[#ECECEC] pb-2">
          <div className="max-w-50 w-full space-y-2.5">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <div className="flex flex-col items-end space-y-2.5">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 pl-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="size-8 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-3 w-28" />
        </div>

        <div className="flex w-full items-center gap-2.5">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </div>
    </div>
  );
};

export default MaterialCardSkeleton;
