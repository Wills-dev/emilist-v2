import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceJobWrapper from "@/features/jobs/components/MarketplaceJobWrapper/MarketplaceJobWrapper";

const MarketplaceJobPage = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceJobWrapper />
    </MainLayout>
  );
};

export default MarketplaceJobPage;
