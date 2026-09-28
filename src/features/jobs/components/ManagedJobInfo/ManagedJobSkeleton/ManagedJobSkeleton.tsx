import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { SkeletonLines } from "@/components/molecules/PageSkeleton/SkeletonSections/SkeletonSections";
import JobInfoSkeleton from "../../JobInfoSkeleton/JobInfoSkeleton";
import type { JobInfoTab } from "../../../types/jobManagement";

export default function ManagedJobSkeleton({
  section = "details",
}: {
  section?: JobInfoTab;
}) {
  if (section === "details") return <JobInfoSkeleton variant="dashboard" />;
  return (
    <Container variant="small" className="py-4">
      <div role="status" aria-busy="true" aria-label={`Loading job ${section}`}>
        <div aria-hidden="true" className="space-y-5">
          <Skeleton className="h-8 w-20" />
          <div className="flex gap-5 border-b pb-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          {section === "payments" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div key={i} className="space-y-5 bg-white p-5">
                    <Skeleton className="size-6" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-7 w-32" />
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-8 border-b bg-white p-5">
                      {[0, 1, 2, 3, 4, 5].map((j) => (
                        <Skeleton key={j} className="h-5 flex-1" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {section === "applicants" && (
                <div className="flex justify-between gap-4">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-8 w-32" />
                </div>
              )}
              <div className="grid gap-5 lg:grid-cols-2">
                {Array.from(
                  { length: section === "invoices" ? 3 : 4 },
                  (_, i) => (
                    <div
                      key={i}
                      className={`space-y-6 bg-[#F9F9F9] p-5 ${section === "invoices" ? "border-[6px] border-[#EDEEF0]" : "rounded-xl"}`}
                    >
                      {section === "applicants" ? (
                        <div className="flex gap-4">
                          <Skeleton className="size-14 rounded-full" />
                          <div className="flex-1 space-y-3">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                      )}
                      <SkeletonLines />
                      <div className="flex gap-4">
                        <Skeleton className="h-9 flex-1" />
                        <Skeleton className="h-9 flex-1" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </Container>
  );
}
