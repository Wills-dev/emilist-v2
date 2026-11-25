import { createPageMetadata } from "@/lib/seo/metadata";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import CheckoutWrapper from "@/features/materials/components/CheckoutWrapper/CheckoutWrapper";

export const metadata = createPageMetadata({"title": "Checkout", "description": "Checkout on Emilist.", "index": false, "path": "/checkout"});

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
