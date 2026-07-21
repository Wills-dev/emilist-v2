import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MaterialInfoWrapper from "@/features/materials/components/MaterialInfoWrapper/MaterialInfoWrapper";
import SimilarMaterials from "@/features/materials/components/SimilarMaterials/SimilarMaterials";
import { use } from "react";

const DashboardMaterialInfoPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  return (
    <DashboardLayout>
      <MaterialInfoWrapper materialId={id} />
      <SimilarMaterials variant="dashboard" />
    </DashboardLayout>
  );
};

export default DashboardMaterialInfoPage;
