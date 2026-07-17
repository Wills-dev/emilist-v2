import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import CheckoutWrapper from "@/features/materials/components/CheckoutWrapper/CheckoutWrapper";

const CheckoutPage = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="verified merchants &"
        endText="materials for your projects"
        src="/assets/images/materials.svg"
        type="jobs"
        className="bg-[#1A201B]"
      />
      <CheckoutWrapper />
    </MainLayout>
  );
};

export default CheckoutPage;
