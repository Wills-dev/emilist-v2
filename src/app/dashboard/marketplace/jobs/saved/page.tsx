import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobsWrapper from "@/features/jobs/components/DashboardJobsWrapper/DashboardJobsWrapper";

export const metadata = createPageMetadata({"title": "Saved Jobs", "description": "Saved Jobs on Emilist.", "index": false});



const DashboardSavedJobsPage = () => (
  <DashboardLayout>
    <DashboardJobsWrapper saved />
  </DashboardLayout>
);

export default DashboardSavedJobsPage;
