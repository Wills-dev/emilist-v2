import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceMaterialWrapper from "@/features/materials/components/MarketplaceMaterialWrapper/MarketplaceMaterialWrapper";

const page = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceMaterialWrapper />
    </MainLayout>
  );
};

export default page;
