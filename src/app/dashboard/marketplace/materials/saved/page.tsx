import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import SavedMaterialWrapper from "@/features/materials/components/SavedMaterialWrapper/SavedMaterialWrapper";

export const metadata = createPageMetadata({"title": "Saved Materials", "description": "Saved Materials on Emilist.", "index": false});



const page = () => {
  return (
    <DashboardLayout>
      <SavedMaterialWrapper />
    </DashboardLayout>
  );
};

export default page;
