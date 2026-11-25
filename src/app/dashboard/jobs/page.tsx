import { createPageMetadata } from "@/lib/seo/metadata";
import JobsDashboardSkeleton from "@/features/jobs/components/JobsDashboardSkeleton/JobsDashboardSkeleton";
import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import JobsDashboardWrapper from "@/features/jobs/components/JobsDashboardWrapper/JobsDashboardWrapper";

export const metadata = createPageMetadata({"title": "My Jobs", "description": "My Jobs on Emilist.", "index": false});



const JobsPage = () => (
  <DashboardLayout>
    <Suspense fallback={<JobsDashboardSkeleton />}>
      <JobsDashboardWrapper />
    </Suspense>
  </DashboardLayout>
);

export default JobsPage;
