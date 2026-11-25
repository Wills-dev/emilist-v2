import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import OverviewWrapper from "@/features/overview/components/OverviewWrapper/OverviewWrapper";

export const metadata = createPageMetadata({"title": "Overview", "description": "Overview on Emilist.", "index": false});



const OverviewPage = () => {
  return (
    <DashboardLayout>
      <OverviewWrapper />
    </DashboardLayout>
  );
};

export default OverviewPage;
