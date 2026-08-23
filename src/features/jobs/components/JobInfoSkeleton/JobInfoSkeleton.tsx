import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton";

const JobMainInfoSkeleton = () => (
  <div className="w-full min-w-0 flex-1" aria-hidden="true">
    <div className="mb-4 flex items-center justify-between">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
    </div>
    <div className="space-y-8 rounded-[11.33px] border-[0.94px] border-[#F1F2F9] bg-[#F9F9F9] px-2 pb-6 pt-8 sm:px-5 md:px-11">
      <Skeleton className="h-7 w-28 rounded-full" />
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-7 w-64 max-w-full" />
            </div>
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div className="flex min-h-24 w-full max-w-106.25 flex-wrap items-center gap-4 rounded-[8px] border border-[#F1F2F9] bg-white p-4">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-4 w-22" />
              ))}
            </div>
            <div className="flex gap-3">
              <Skeleton className="size-10 rounded-[8px]" />
              <Skeleton className="size-10 rounded-[8px]" />
            </div>
          </div>
        </div>
        <Skeleton className="h-40 w-full rounded-[16px] sm:h-81.25" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-3 rounded-[8px] bg-white p-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
      <Skeleton className="h-11 w-full" />
    </div>
  </div>
);

const JobMilestoneSkeleton = ({ dashboard = false }: { dashboard?: boolean }) => (
  <div
    aria-hidden="true"
    className={`w-full min-w-72.5 space-y-6 rounded-[11.33px] border-[0.94px] px-3 py-6 ${
      dashboard
        ? "border-[#ECECEC] bg-[#F9F9F9]"
        : "border-[#F1F2F9] bg-[#F6F7F9] sm:px-5 sm:pt-8"
    }`}
  >
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className={`space-y-5 ${index > 0 ? "border-t border-[#ECECEC] pt-6" : ""}`}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="size-5" />
        </div>
        <Skeleton className="h-12 w-full rounded-[8px]" />
        <div className="space-y-3 rounded-[8px] bg-white p-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    ))}
  </div>
);

const JobInfoSkeleton = ({ variant = "public" }: { variant?: "public" | "dashboard" }) => {
  if (variant === "dashboard") {
    return (
      <Container variant="small">
        <div role="status" aria-label="Loading job details" className="space-y-4 pb-20 pt-4">
          <Skeleton className="h-12 w-full lg:hidden" />
          <div className="flex w-full items-start gap-4 max-xl:flex-col">
            <JobMainInfoSkeleton />
            <div className="w-full xl:max-w-87.75">
              <JobMilestoneSkeleton dashboard />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div role="status" aria-label="Loading job details" className="space-y-10 pt-6">
      <Container>
        <div className="flex w-full flex-wrap gap-10">
          <JobMainInfoSkeleton />
          <div className="hidden w-full max-w-119.25 sm:block">
            <JobMilestoneSkeleton />
          </div>
        </div>
      </Container>
      <div className="sm:hidden">
        <JobMilestoneSkeleton />
      </div>
    </div>
  );
};

export default JobInfoSkeleton;
