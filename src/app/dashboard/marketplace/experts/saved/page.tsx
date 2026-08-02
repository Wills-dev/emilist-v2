import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertsWrapper from "@/features/experts/components/DashboardExpertsWrapper/DashboardExpertsWrapper";

const DashboardSavedExpertsPage = () => (
  <DashboardLayout>
    <DashboardExpertsWrapper saved />
  </DashboardLayout>
);

export default DashboardSavedExpertsPage;
