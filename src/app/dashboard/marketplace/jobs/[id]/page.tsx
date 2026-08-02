import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobInfoWrapper from "@/features/jobs/components/DashboardJobInfoWrapper/DashboardJobInfoWrapper";

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
