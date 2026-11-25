import { createPageMetadata } from "@/lib/seo/metadata";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceExpertWrapper from "@/features/experts/components/MarketplaceExpertWrapper/MarketplaceExpertWrapper";

export const metadata = createPageMetadata({"title": "Hire Experts", "description": "Find skilled professionals and service providers on Emilist. Explore their services, experience and customer reviews.", "index": true, "path": "/marketplace/experts"});

const MarketplaceExpertPage = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceExpertWrapper />
    </MainLayout>
  );
};

export default MarketplaceExpertPage;
