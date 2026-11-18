import { Skeleton } from "@/components/ui/skeleton/skeleton";
export default function SupportSkeleton({ detail = false }: { detail?: boolean }) {
  return <div role="status" aria-label={detail ? "Loading support conversation" : "Loading support tickets"} className="space-y-5">
    <div className="flex items-center justify-between gap-4"><Skeleton className="h-8 w-40" /><Skeleton className="h-10 w-28" /></div>
    {detail ? <>
      <div className="space-y-4 rounded-2xl border border-[#EDF1F6] bg-white p-6"><Skeleton className="h-4 w-32" /><div className="flex justify-between gap-4"><Skeleton className="h-7 w-1/2" /><Skeleton className="h-5 w-20 rounded-full" /></div><Skeleton className="h-4 w-3/4" /></div>
      <div className="space-y-7 rounded-2xl border border-[#EDF1F6] bg-white p-5"><Skeleton className="h-6 w-32" />{[0, 1, 2].map((message) => <div key={message} className={`flex gap-3 ${message === 1 ? "flex-row-reverse" : ""}`}><Skeleton className="size-10 shrink-0 rounded-full" /><div className="flex-1 space-y-3 rounded-2xl bg-[#F7F8FA] p-5"><Skeleton className="h-3 w-36" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div></div>)}<Skeleton className="h-16 w-full rounded-xl" /><Skeleton className="h-3 w-3/4" /></div>
    </> : <>
      <div className="flex gap-3"><Skeleton className="h-10 w-36" /><Skeleton className="h-10 w-36" /></div>
      <div className="overflow-hidden rounded-xl border border-[#EDF1F6] bg-white"><div className="p-5"><Skeleton className="h-4 w-32" /></div><div className="flex gap-5 border-y border-[#EDF1F6] p-4">{[0, 1, 2, 3].map((cell) => <Skeleton key={cell} className="h-4 flex-1" />)}</div>{[0, 1, 2, 3, 4].map((row) => <div key={row} className="flex gap-5 p-5 odd:bg-[#F7F8FA]">{[0, 1, 2, 3].map((cell) => <Skeleton key={cell} className="h-5 flex-1" />)}</div>)}</div>
    </>}
  </div>;
}
