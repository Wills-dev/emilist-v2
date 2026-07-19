import { Skeleton } from "@/components/ui/skeleton";

const MaterialReviewSkeleton = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading material reviews"
      className="max-w-96.75 w-full space-y-6"
    >
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
  );
};

export default MaterialReviewSkeleton;
