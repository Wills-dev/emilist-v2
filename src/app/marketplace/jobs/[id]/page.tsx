import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import JobInfoWrapper from "@/features/jobs/components/JobInfoWrapper/JobInfoWrapper";

import { use } from "react";

const JobInfoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="verified job offers around"
        endText="your location, in minutes"
        src="/assets/images/jobs.svg"
        type="jobs"
      />
      <JobInfoWrapper jobId={id} />
    </MainLayout>
  );
};

export default JobInfoPage;
