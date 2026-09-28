import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MaterialReviewInfoSkeleton from "@/features/materials/components/MaterialReviewInfoWrapper/MaterialReviewInfoSkeleton/MaterialReviewInfoSkeleton";
import Container from "@/components/atoms/Container/Container";
export default function Loading() {
  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="verified merchants &"
        endText="materials for your projects"
        src="/assets/images/materials.svg"
        type="jobs"
        className="bg-[#1A201B]"
      />
      <Container variant="center" className="py-6">
        <MaterialReviewInfoSkeleton variant="public" />
      </Container>
    </MainLayout>
  );
}
