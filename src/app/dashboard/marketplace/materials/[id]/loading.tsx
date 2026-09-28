import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MaterialInfoSkeleton from "@/features/materials/components/MaterialInfoWrapper/MaterialInfoSkeleton/MaterialInfoSkeleton";
import Container from "@/components/atoms/Container/Container";
export default function Loading() {
  return (
    <DashboardLayout>
      <Container variant="small" className="py-6">
        <MaterialInfoSkeleton variant="dashboard" />
      </Container>
    </DashboardLayout>
  );
}
