import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CompareJobsWrapper from "@/features/jobs/components/CompareJobsWrapper/CompareJobsWrapper";

export const metadata = createPageMetadata({"title": "Compare Jobs", "description": "Compare Jobs on Emilist.", "index": false});



const DashboardCompareJobsPage = () => (
  <DashboardLayout>
    <CompareJobsWrapper />
  </DashboardLayout>
);

export default DashboardCompareJobsPage;
