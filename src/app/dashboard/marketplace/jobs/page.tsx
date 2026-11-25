import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobsWrapper from "@/features/jobs/components/DashboardJobsWrapper/DashboardJobsWrapper";

export const metadata = createPageMetadata({"title": "Find Jobs", "description": "Find Jobs on Emilist.", "index": false});



const DashboardJobsPage = () => (
  <DashboardLayout>
    <DashboardJobsWrapper />
  </DashboardLayout>
);

export default DashboardJobsPage;
