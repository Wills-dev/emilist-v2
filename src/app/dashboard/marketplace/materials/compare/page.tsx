import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CompareMaterialsWrapper from "@/features/materials/components/CompareMaterialsWrapper/CompareMaterialsWrapper";

export const metadata = createPageMetadata({"title": "Compare Materials", "description": "Compare Materials on Emilist.", "index": false});



const page = () => {
  return (
    <DashboardLayout>
      <CompareMaterialsWrapper />
    </DashboardLayout>
  );
};

export default page;
