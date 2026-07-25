import { use } from "react";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import RelatedMaterialsPageWrapper from "@/features/materials/components/RelatedMaterialsPageWrapper/RelatedMaterialsPageWrapper";

const SimilarMaterialsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  return (
    <DashboardLayout>
      <RelatedMaterialsPageWrapper
        resourceId={id}
        type="similar"
        variant="dashboard"
      />
    </DashboardLayout>
  );
};

export default SimilarMaterialsPage;
