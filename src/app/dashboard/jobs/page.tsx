import JobsDashboardSkeleton from "@/features/jobs/components/JobsDashboardSkeleton/JobsDashboardSkeleton";
import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import JobsDashboardWrapper from "@/features/jobs/components/JobsDashboardWrapper/JobsDashboardWrapper";

const JobsPage = () => (
  <DashboardLayout>
    <Suspense fallback={<JobsDashboardSkeleton />}>
      <JobsDashboardWrapper />
    </Suspense>
  </DashboardLayout>
);

export default JobsPage;
