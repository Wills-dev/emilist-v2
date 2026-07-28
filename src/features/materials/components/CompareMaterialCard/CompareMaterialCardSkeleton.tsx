import { Skeleton } from "@/components/ui/skeleton";

const CompareMaterialCardSkeleton = () => (
  <div
    className="w-60 shrink-0 space-y-3 sm:w-72"
    aria-label="Loading compared material"
    aria-busy="true"
  >
    <section className="space-y-3 bg-[#F9F9F9] p-3">
      <div className="flex justify-between gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 flex-1" />
      </div>
      <Skeleton className="h-42 w-full rounded-[10px] sm:h-48" />
      <Skeleton className="h-8 w-full rounded-[10px]" />
    </section>

    <section className="space-y-3 bg-white p-4">
      <div className="space-y-2 border-y border-[#ECECEC] py-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex h-10 items-center gap-2">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-10 flex-1 rounded-md" />
          </div>
        ))}
      </div>
      <Skeleton className="h-8 w-full rounded-[10px]" />
    </section>

    <section className="bg-white p-4">
      <Skeleton className="h-20 w-full rounded-[10px]" />
    </section>
  </div>
);

export default CompareMaterialCardSkeleton;
