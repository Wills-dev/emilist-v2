import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PublicSavedMaterialWrapper from "@/features/materials/components/PublicSavedMaterialWrapper/PublicSavedMaterialWrapper";

const page = () => {
  return (
    <MainLayout variant="secondary">
      <PublicSavedMaterialWrapper />
    </MainLayout>
  );
};

export default page;
