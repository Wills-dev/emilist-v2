import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardMaterialsWrapper from "@/features/materials/components/DashboardMaterialsWrapper/DashboardMaterialsWrapper";

export const metadata = createPageMetadata({"title": "Find Materials", "description": "Find Materials on Emilist.", "index": false});



const DashboardMaterialPage = () => {
  return (
    <DashboardLayout>
      <DashboardMaterialsWrapper />
    </DashboardLayout>
  );
};

export default DashboardMaterialPage;
