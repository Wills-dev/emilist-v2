import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CompareMaterialsWrapper from "@/features/materials/components/CompareMaterialsWrapper/CompareMaterialsWrapper";

const page = () => {
  return (
    <DashboardLayout>
      <CompareMaterialsWrapper />
    </DashboardLayout>
  );
};

export default page;
