import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import CartPageSkeleton from "@/features/materials/components/CartPageSkeleton/CartPageSkeleton";
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
      <CartPageSkeleton checkout />
    </MainLayout>
  );
}
