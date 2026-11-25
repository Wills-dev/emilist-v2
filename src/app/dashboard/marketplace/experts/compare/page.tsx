import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CompareExpertsWrapper from "@/features/experts/components/CompareExpertsWrapper/CompareExpertsWrapper";

export const metadata = createPageMetadata({"title": "Compare Experts", "description": "Compare Experts on Emilist.", "index": false});



const DashboardCompareExpertsPage = () => (
  <DashboardLayout>
    <CompareExpertsWrapper />
  </DashboardLayout>
);

export default DashboardCompareExpertsPage;
