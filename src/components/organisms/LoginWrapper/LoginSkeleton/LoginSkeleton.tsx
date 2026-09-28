import { Skeleton } from "@/components/ui/skeleton/skeleton";
export default function LoginSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading login"
      className="min-h-screen bg-white"
    >
      <div aria-hidden="true">
        <div className="flex h-20 items-center justify-between border-b px-5 sm:px-10 lg:px-20">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="size-10 rounded-full" />
        </div>
        <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(360px,625px)_minmax(0,1fr)]">
          <Skeleton className="hidden h-full rounded-none lg:block" />
          <div className="px-5 py-8 sm:px-10 lg:px-14 lg:py-12">
            <div className="mx-auto max-w-155 space-y-8">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-3/4" />
              {[0, 1].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
