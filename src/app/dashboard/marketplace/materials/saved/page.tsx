import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import SavedMaterialWrapper from "@/features/materials/components/SavedMaterialWrapper/SavedMaterialWrapper";

const page = () => {
  return (
    <DashboardLayout>
      <SavedMaterialWrapper />
    </DashboardLayout>
  );
};

export default page;
