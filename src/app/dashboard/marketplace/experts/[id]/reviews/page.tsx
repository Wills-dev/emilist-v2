import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertReviews from "@/features/experts/components/DashboardExpertReviews/DashboardExpertReviews";

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
