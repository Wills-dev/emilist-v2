import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ReportsWrapper from "@/features/reports/components/ReportsWrapper/ReportsWrapper";

export const metadata = createPageMetadata({"title": "Reports", "description": "Reports on Emilist.", "index": false});



const ReportsPage = () => (
  <DashboardLayout>
    <ReportsWrapper />
  </DashboardLayout>
);

export default ReportsPage;
