import { use } from "react";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import RelatedMaterialsPageWrapper from "@/features/materials/components/RelatedMaterialsPageWrapper/RelatedMaterialsPageWrapper";

const SellerMaterialsPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sellerName?: string }>;
}) => {
  const { id } = use(params);
  const { sellerName } = use(searchParams);

  return (
    <DashboardLayout>
      <RelatedMaterialsPageWrapper
        resourceId={id}
        type="seller"
        variant="dashboard"
        sellerName={sellerName}
      />
    </DashboardLayout>
  );
};

export default SellerMaterialsPage;
