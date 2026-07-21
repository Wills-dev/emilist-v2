import { Skeleton } from "@/components/ui/skeleton";

const MaterialReviewInfoSkeleton = ({
  variant = "public",
}: {
  variant?: "public" | "dashboard";
}) => {
  const isDashboard = variant === "dashboard";

  return (
    <div aria-busy="true" aria-label="Loading material reviews" className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>

        <div
          className={`flex flex-wrap items-start justify-between ${isDashboard ? "gap-2" : "gap-6"}`}
        >
          <div
            className={`w-full min-w-72.5 space-y-6 ${isDashboard ? "max-w-[657px] bg-white py-6 sm:px-3" : "max-w-197.75"}`}
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-7 w-32" />
            </div>
            <div className="space-y-6">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-2.5 flex-1 rounded-[10px]" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>

          <div
            className={`w-full min-w-72.5 space-y-6 ${isDashboard ? "max-w-[439px]" : "max-w-96.75"}`}
          >
            <div
              className={
                isDashboard
                  ? "space-y-4 bg-white py-6 sm:px-3"
                  : "space-y-4 rounded-[8px] bg-[#F6F7F9] p-4"
              }
            >
              <Skeleton className="h-5 w-28" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
            <div
              className={
                isDashboard
                  ? "space-y-3 bg-white py-6 sm:px-3"
                  : "space-y-3 rounded-[8px] bg-[#F6F7F9] p-4"
              }
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div
              className={
                isDashboard
                  ? "space-y-4 bg-white py-6 sm:px-3"
                  : "space-y-4 rounded-[8px] bg-[#F6F7F9] p-4"
              }
            >
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Skeleton key={rating} className="h-8 w-10 rounded-[24px]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`space-y-6 ${isDashboard ? "bg-white max-sm:px-4 max-sm:py-6 sm:p-10" : "bg-[#F6F7F9] p-4 sm:p-10"}`}
      >
        <div className="space-y-4">
          <Skeleton className="h-7 w-28" />
          <div className="flex items-end justify-between gap-6 max-sm:flex-col">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((review) => (
            <div key={review} className="flex gap-6 border-t border-[#D9D9D9] py-6">
              <Skeleton className="size-10 shrink-0 rounded-full sm:size-20" />
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialReviewInfoSkeleton;
