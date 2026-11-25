import { createPageMetadata } from "@/lib/seo/metadata";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceJobWrapper from "@/features/jobs/components/MarketplaceJobWrapper/MarketplaceJobWrapper";

export const metadata = createPageMetadata({"title": "Find Jobs", "description": "Browse jobs and project opportunities on Emilist. Find work that matches your skills, location and experience.", "index": true, "path": "/marketplace/jobs"});

const MarketplaceJobPage = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceJobWrapper />
    </MainLayout>
  );
};

export default MarketplaceJobPage;
