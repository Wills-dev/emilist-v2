import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton";

const UserSettingsSkeleton = () => (
  <Container variant="small">
    <main
      aria-label="Loading user settings"
      className="space-y-4 pb-20 pt-4"
    >
      <section className="space-y-5 bg-white px-6 py-6 max-sm:px-3">
        <Skeleton className="h-7 w-36" />
        <div className="flex items-center justify-between gap-4 border-t border-[#F1F2F9] pt-5">
          <Skeleton className="h-11 w-full max-w-164 rounded-full" />
          <Skeleton className="size-10 shrink-0 rounded-lg" />
        </div>
      </section>

      <section className="grid grid-cols-[1.05fr_1fr] gap-3 bg-white p-3 max-xl:grid-cols-1">
        <div className="min-h-64 space-y-5 rounded-lg bg-[#F9F9F9] p-4">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="size-36 shrink-0 rounded-full max-sm:size-28" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-36 max-sm:hidden" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-44 rounded-full" />
            <Skeleton className="h-6 w-40 rounded-full" />
          </div>
        </div>

        <div className="min-h-64 rounded-lg bg-[#F9F9F9] p-4">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-9 w-16" />
          </div>
          <Skeleton className="h-44 w-full bg-gray-200" />
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 max-sm:p-4">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-9 w-16" />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-md:grid-cols-1">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-12 w-full rounded-[10px]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  </Container>
);

export default UserSettingsSkeleton;
