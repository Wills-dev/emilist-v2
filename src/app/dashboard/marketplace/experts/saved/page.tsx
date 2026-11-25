import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertsWrapper from "@/features/experts/components/DashboardExpertsWrapper/DashboardExpertsWrapper";

export const metadata = createPageMetadata({"title": "Saved Experts", "description": "Saved Experts on Emilist.", "index": false});



const DashboardSavedExpertsPage = () => (
  <DashboardLayout>
    <DashboardExpertsWrapper saved />
  </DashboardLayout>
);

export default DashboardSavedExpertsPage;
