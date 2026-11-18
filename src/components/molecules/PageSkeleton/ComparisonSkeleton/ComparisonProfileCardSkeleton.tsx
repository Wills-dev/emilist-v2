import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ComparisonProfileCardSkeleton({ expert = false }: { expert?: boolean }) {
  return (
    <div className="w-58 shrink-0 space-y-3 sm:w-60">
      <section className="space-y-4 rounded-md bg-[#F9F9F9] p-3">
        <Skeleton className={expert ? "size-10 rounded-full" : "size-8 rounded-md"} />
        <div className="flex items-end justify-between gap-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-4 w-16" /></div>
        <Skeleton className="h-3 w-36" />
        <div className="min-h-31 space-y-3 rounded-md bg-white p-3">
          {[0, 1, 2].map((line) => <Skeleton key={line} className="h-4 w-full" />)}
        </div>
        <Skeleton className="h-8 w-full rounded-[10px]" />
      </section>
      <section className={`${expert ? "min-h-32" : "min-h-24"} space-y-2 border-y border-[#ECECEC] bg-white p-4 shadow-[0_8px_16px_rgba(27,49,37,0.06)]`}>
        <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" />
        {expert && <Skeleton className="h-4 w-3/5" />}
      </section>
      <section className="space-y-2 border-y border-[#ECECEC] bg-white p-4 shadow-[0_8px_16px_rgba(27,49,37,0.06)]">
        {Array.from({ length: expert ? 9 : 8 }, (_, row) => <div key={row} className="flex h-8 items-center gap-2 rounded-md bg-[#F9F9F9] px-2"><Skeleton className="size-3.5 shrink-0" /><Skeleton className="h-3 flex-1" /></div>)}
        <div className="border-t border-[#ECECEC] pt-4"><Skeleton className="h-8 w-full rounded-[10px]" /></div>
      </section>
    </div>
  );
}
