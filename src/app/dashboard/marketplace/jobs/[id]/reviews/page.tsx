import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobReviews from "@/features/jobs/components/DashboardJobReviews/DashboardJobReviews";

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
