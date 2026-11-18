import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function ServicesTabSkeleton() {
  return (
    <section role="status" aria-label="Loading your businesses" aria-busy="true" className="space-y-4">
      <div aria-hidden="true" className="space-y-4">
        <div className="grid gap-3 bg-white p-2 xl:grid-cols-[1.05fr_1fr]">
          <div className="rounded-lg bg-[#F4F7F5] p-3">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between"><Skeleton className="h-5 w-32" /><Skeleton className="size-9" /></div>
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-5 rounded-lg bg-white p-4">
              <Skeleton className="size-28 shrink-0 rounded-full" />
              <div className="flex flex-wrap gap-2"><Skeleton className="h-8 w-28" /><Skeleton className="h-8 w-32" /></div>
            </div>
            <div className="mt-3 space-y-3 rounded-lg bg-white p-4">
              <div className="flex justify-between gap-3"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-5 w-24" /></div>
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="mt-3 space-y-4 rounded-lg bg-white p-4">
              <Skeleton className="h-4 w-20" />
              <div className="flex flex-wrap gap-5"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-24" /></div>
            </div>
          </div>
          <div className="space-y-3 rounded-lg bg-[#F4F7F5] p-3">
            <div className="space-y-5 rounded-lg bg-white p-4">
              <div className="flex justify-between"><Skeleton className="h-5 w-36" /><Skeleton className="h-8 w-14" /></div>
              <div className="space-y-3">{[0, 1, 2, 3, 4].map((line) => <Skeleton key={line} className={line === 4 ? "h-4 w-3/5" : "h-4 w-full"} />)}</div>
            </div>
            <div className="rounded-lg p-4">
              <div className="mb-4 flex justify-between"><Skeleton className="h-5 w-28" /><Skeleton className="h-8 w-14" /></div>
              <div className="flex gap-2 overflow-hidden">{[0, 1, 2].map((photo) => <Skeleton key={photo} className="size-24 shrink-0 rounded-lg" />)}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-2">
          <div className="rounded-lg p-4">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><Skeleton className="h-5 w-32" /><div className="flex gap-2"><Skeleton className="h-8 w-24" /><Skeleton className="h-8 w-36" /></div></div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Array.from({ length: 10 }, (_, field) => <div key={field} className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-12 w-full rounded-lg" /></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
