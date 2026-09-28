import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MaterialReviewInfoSkeleton from "@/features/materials/components/MaterialReviewInfoWrapper/MaterialReviewInfoSkeleton/MaterialReviewInfoSkeleton";
import Container from "@/components/atoms/Container/Container";
export default function Loading() {
  return (
    <DashboardLayout>
      <Container variant="small" className="py-6">
        <MaterialReviewInfoSkeleton variant="dashboard" />
      </Container>
    </DashboardLayout>
  );
}
