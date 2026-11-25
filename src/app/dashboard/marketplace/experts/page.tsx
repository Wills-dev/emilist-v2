import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertsWrapper from "@/features/experts/components/DashboardExpertsWrapper/DashboardExpertsWrapper";

export const metadata = createPageMetadata({"title": "Find Experts", "description": "Find Experts on Emilist.", "index": false});



const DashboardExpertsPage = () => (
  <DashboardLayout>
    <DashboardExpertsWrapper />
  </DashboardLayout>
);

export default DashboardExpertsPage;
