import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobInfoWrapper from "@/features/jobs/components/DashboardJobInfoWrapper/DashboardJobInfoWrapper";

export const metadata = createPageMetadata({"title": "Job Details", "description": "Job Details on Emilist.", "index": false});



const DashboardJobInfoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <DashboardLayout>
      <DashboardJobInfoWrapper jobId={id} />
    </DashboardLayout>
  );
};

export default DashboardJobInfoPage;
