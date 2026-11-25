import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertInfoWrapper from "@/features/experts/components/DashboardExpertInfoWrapper/DashboardExpertInfoWrapper";

export const metadata = createPageMetadata({"title": "Expert Profile", "description": "Expert Profile on Emilist.", "index": false});



const DashboardExpertInfoPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <DashboardLayout>
      <DashboardExpertInfoWrapper expertId={id} />
    </DashboardLayout>
  );
};

export default DashboardExpertInfoPage;
