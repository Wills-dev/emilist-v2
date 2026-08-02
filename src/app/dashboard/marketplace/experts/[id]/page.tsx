import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertInfoWrapper from "@/features/experts/components/DashboardExpertInfoWrapper/DashboardExpertInfoWrapper";

const DashboardExpertInfoPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <DashboardLayout>
      <DashboardExpertInfoWrapper expertId={id} />
    </DashboardLayout>
  );
};

export default DashboardExpertInfoPage;
