import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceSkeleton from "@/components/molecules/PageSkeleton/MarketplaceSkeleton/MarketplaceSkeleton";
export default function Loading() {
  return (
    <MainLayout>
      <MarketplaceSkeleton kind="materials" />
    </MainLayout>
  );
}
