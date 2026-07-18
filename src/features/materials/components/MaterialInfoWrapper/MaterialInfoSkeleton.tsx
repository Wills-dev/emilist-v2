import { Skeleton } from "@/components/ui/skeleton";

const MaterialInfoSkeleton = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading material details"
      className="w-full flex justify-between flex-wrap gap-6"
    >
      <div className="max-w-197.75 w-full space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="space-y-8 rounded-[11.33px] border-[0.94px] border-[#F1F2F9] bg-[#F9F9F9] px-2 pt-8 pb-6 sm:px-5 md:px-11">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-4 border-b border-[#ECECEC] pb-4">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-28" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-44" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-[#ECECEC] pb-4">
                <div className="w-full max-w-106.25 space-y-3 rounded-[8px] border border-[#F1F2F9] bg-white p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex gap-3.25">
                  <Skeleton className="size-10 rounded-[8px]" />
                  <Skeleton className="size-10 rounded-[8px]" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Skeleton className="h-80 w-full rounded-[12px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          <Skeleton className="h-11 w-full" />
        </div>
      </div>

      <div className="max-w-96.75 w-full space-y-6">
        <div className="space-y-4 rounded-[8px] bg-[#F9F9F9] p-5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-16 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
        <div className="space-y-3 rounded-[8px] bg-[#F9F9F9] p-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="space-y-4 rounded-[8px] bg-[#F9F9F9] p-5">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
};

export default MaterialInfoSkeleton;
