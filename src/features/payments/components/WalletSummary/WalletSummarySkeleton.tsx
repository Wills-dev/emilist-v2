import { Skeleton } from "@/components/ui/skeleton/skeleton";

export default function WalletSummarySkeleton() {
  return (
    <section role="status" aria-busy="true" aria-label="Loading wallets">
      <div aria-hidden="true" className="space-y-3">
        <div className="flex h-10 items-center justify-between bg-white px-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="size-3" />
        </div>
        <div className="divide-y divide-[#E9EDEB] bg-white">
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="mt-3 h-7 w-36" />
            <Skeleton className="mt-2 h-4 w-24" />
          </div>
          <div className="flex items-center justify-between gap-2 p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
