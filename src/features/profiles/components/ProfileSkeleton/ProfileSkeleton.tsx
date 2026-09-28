import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import {
  CommentsSkeleton,
  RatingSkeleton,
  SkeletonLines,
} from "@/components/molecules/PageSkeleton/SkeletonSections/SkeletonSections";

export default function ProfileSkeleton({
  dashboard = false,
  reviewsPage = false,
  artisan = false,
}: {
  dashboard?: boolean;
  reviewsPage?: boolean;
  artisan?: boolean;
}) {
  const identity = (
    <div className="flex items-center gap-4 bg-white p-4">
      <Skeleton className="size-14 shrink-0 rounded-full" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
  const stats = (
    <div className={`grid gap-3 ${reviewsPage ? "" : "sm:grid-cols-2"}`}>
      <div className="bg-white p-5">
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="space-y-4 bg-white p-5">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
  return (
    <Container
      variant={dashboard ? "small" : "center"}
      className="py-4 sm:py-6"
    >
      <div
        role="status"
        aria-busy="true"
        aria-label={`Loading ${artisan ? "artisan" : "profile"}${reviewsPage ? " reviews" : ""}`}
      >
        <div aria-hidden="true" className="space-y-4">
          <Skeleton className="h-8 w-20" />
          {reviewsPage ? (
            <>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,32%)]">
                <RatingSkeleton />
                <div className="space-y-3">
                  {identity}
                  {stats}
                </div>
              </div>
              <CommentsSkeleton />
            </>
          ) : (
            <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,32%)]">
              <div className="space-y-4 rounded-xl border border-[#EDEEF0] bg-[#F9F9F9] p-4">
                {identity}
                {artisan ? (
                  <>
                    <div className="flex gap-3">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="aspect-square w-full sm:aspect-video" />
                    <Skeleton className="h-5 w-3/4" />
                    <div className="bg-white p-4">
                      <SkeletonLines count={5} />
                    </div>
                    <Skeleton className="h-11 w-full" />
                  </>
                ) : (
                  <>
                    <div className="bg-white p-4">
                      <SkeletonLines count={2} />
                    </div>
                    {stats}
                    <RatingSkeleton />
                  </>
                )}
              </div>
              <div className="space-y-4">
                {artisan && <RatingSkeleton />}
                <CommentsSkeleton compact />
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
