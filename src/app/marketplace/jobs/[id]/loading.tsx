import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import JobInfoSkeleton from "@/features/jobs/components/JobInfoSkeleton/JobInfoSkeleton";
export default function Loading() {
  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="verified job offers around"
        endText="your location, in minutes"
        src="/assets/images/jobs.svg"
        type="jobs"
      />
      <JobInfoSkeleton variant="public" />
    </MainLayout>
  );
}
