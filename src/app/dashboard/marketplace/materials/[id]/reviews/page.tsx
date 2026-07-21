import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MaterialReviewInfoWrapper from "@/features/materials/components/MaterialReviewInfoWrapper/MaterialReviewInfoWrapper";
import { use } from "react";

const DashboardMaterialReviewsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  return (
    <DashboardLayout>
      <MaterialReviewInfoWrapper materialId={id} />
    </DashboardLayout>
  );
};

export default DashboardMaterialReviewsPage;
