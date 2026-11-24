import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import Rating from "@/components/molecules/Rating/Rating";
import { displayOrderValue } from "../../helpers/orderDisplay";
import type { OrderProduct } from "../../types/order";

const MerchantsInfo = ({ product }: { product: OrderProduct }) => (
  <div className="flex items-center gap-2">
    <div className="md:hidden">
      <ProfileAvatar variant="very-small" profileImage="" />
    </div>
    <div className="flex gap-2 max-md:flex-col md:items-center">
      <div className="flex items-center gap-2">
        <p className="text-xs text-[#5E625F]">{displayOrderValue(product.merchantName)}</p>
        {product.merchantRating == null ? <span className="text-xs text-[#737774]">N/A</span> : <Rating rating={product.merchantRating} />}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-exo text-[10px]">
          {displayOrderValue(product.merchantReviewCount)} reviews
        </span>
        <span className="font-exo text-[10px]">
          {displayOrderValue(product.totalUnitsSoldAtPurchase)} items sold
        </span>
      </div>
    </div>
  </div>
);

export default MerchantsInfo;
