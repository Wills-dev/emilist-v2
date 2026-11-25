import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MaterialInfoWrapper from "@/features/materials/components/MaterialInfoWrapper/MaterialInfoWrapper";
import SimilarMaterials from "@/features/materials/components/SimilarMaterials/SimilarMaterials";
import { use } from "react";

export const metadata = createPageMetadata({"title": "Material Details", "description": "Material Details on Emilist.", "index": false});



const DashboardMaterialInfoPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  return (
    <DashboardLayout>
      <MaterialInfoWrapper materialId={id} />
      <SimilarMaterials productId={id} />
    </DashboardLayout>
  );
};

export default DashboardMaterialInfoPage;
