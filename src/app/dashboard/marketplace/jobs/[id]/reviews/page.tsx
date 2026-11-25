import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobReviews from "@/features/jobs/components/DashboardJobReviews/DashboardJobReviews";

export const metadata = createPageMetadata({"title": "Job Reviews", "description": "Job Reviews on Emilist.", "index": false});



const DashboardJobReviewsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <DashboardLayout>
      <DashboardJobReviews jobId={id} />
    </DashboardLayout>
  );
};

export default DashboardJobReviewsPage;
