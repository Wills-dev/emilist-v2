import { Skeleton } from "@/components/ui/skeleton/skeleton";
const ReportsSkeleton = () => (
  <div role="status" aria-label="Loading reports" aria-busy="true" className="grid gap-4 lg:grid-cols-2">
    {[0, 1].map((index) => <div key={index} aria-hidden="true" className="min-h-96 space-y-5 bg-white p-5">
      <div className="flex justify-between gap-4"><div className="space-y-3"><Skeleton className="h-5 w-28" /><Skeleton className="h-3 w-44" /></div><Skeleton className="h-9 w-28 rounded-full" /></div>
      <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-[#FAFAFA] p-5 sm:flex-row"><Skeleton className="size-48 shrink-0 rounded-full" /><div className="grid grid-cols-2 gap-5">{[0, 1, 2, 3].map((value) => <div key={value} className="space-y-2"><Skeleton className="h-3 w-16" /><Skeleton className="h-5 w-14" /></div>)}</div></div>
    </div>)}
  </div>
);
export default ReportsSkeleton;
