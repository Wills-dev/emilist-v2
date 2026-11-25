import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertReviews from "@/features/experts/components/DashboardExpertReviews/DashboardExpertReviews";

export const metadata = createPageMetadata({"title": "Expert Reviews", "description": "Expert Reviews on Emilist.", "index": false});



const DashboardExpertReviewsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <DashboardLayout>
      <DashboardExpertReviews expertId={id} />
    </DashboardLayout>
  );
};

export default DashboardExpertReviewsPage;
