import { createPageMetadata } from "@/lib/seo/metadata";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import CartBreakdown from "@/features/materials/components/CartBreakdown/CartBreakdown";

export const metadata = createPageMetadata({"title": "Cart", "description": "Cart on Emilist.", "index": false, "path": "/cart"});

const CartPage = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="verified merchants &"
        endText="materials for your projects"
        src="/assets/images/materials.svg"
        type="jobs"
        className="bg-[#1A201B]"
      />
      <CartBreakdown />
    </MainLayout>
  );
};

export default CartPage;
