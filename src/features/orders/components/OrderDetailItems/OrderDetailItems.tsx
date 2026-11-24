import Image from "next/image";
import { Package } from "lucide-react";
import type { CustomerOrder, OrderProduct, Sale } from "../../types/order";
import { displayOrderValue } from "../../helpers/orderDisplay";
import { formatOrderMoney, getDetailProducts } from "../../helpers/orderDetails";
import OrderDetailSection from "../OrderDetailSection/OrderDetailSection";

function DetailItem({ product, sale }: { product?: OrderProduct; sale?: Sale }) {
  const name = sale?.product.name ?? product?.productName;
  const image = sale?.product.thumbnail ?? product?.thumbnail;
  const quantity = sale?.quantity ?? product?.quantity;
  const unit = sale?.quantityMetric ?? product?.quantityMetric;
  const currency = sale?.pricing.currency ?? product?.currency ?? "NGN";
  const metadata = [sale?.product.brand ?? product?.brand, sale?.product.category ?? product?.categoryName].filter(Boolean).join(" · ");
  const amount = sale ? sale.pricing.totalAmount : product && Number.isFinite(product.price) && Number.isFinite(product.quantity) ? product.price * product.quantity : undefined;

  return (
    <li className="flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4">
      <div className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-[8.75px] bg-[#ECECF0] text-[#737774] sm:size-24">
        {image ? <Image src={image} alt={displayOrderValue(name)} fill sizes="96px" className="object-cover" /> : <Package size={24} />}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <h4 className="break-words font-exo text-sm font-semibold text-[#474C48]">{displayOrderValue(name)}</h4>
          <p className="text-sm font-semibold text-[#474C48]">{formatOrderMoney(amount, currency)}</p>
        </div>
        <p className="text-xs text-[#737774]">{displayOrderValue(metadata)}</p>
        <p className="text-xs text-[#474C48]">Quantity: {displayOrderValue(quantity)} {unit || ""}</p>
        {product && <p className="text-xs text-[#737774]">{formatOrderMoney(product.price, currency)} per {unit || "item"}</p>}
        {!sale && <p className="text-xs text-[#737774]">Seller: <span className="text-[#474C48]">{displayOrderValue(product?.merchantName)}</span></p>}
        {product?.promoCode && <p className="text-xs text-[#18A154]">Promo: {product.promoCode}</p>}
      </div>
    </li>
  );
}

export default function OrderDetailItems({ order, sale }: { order: CustomerOrder; sale?: Sale }) {
  const products = getDetailProducts(order, sale);
  return (
    <OrderDetailSection title={sale ? "Item sold" : "Items ordered"}>
      <ul className="divide-y divide-[#F1F2F9]">
        {sale ? <DetailItem product={products[0]} sale={sale} /> : products.map((product, index) => <DetailItem key={product._id || `${product.productId}-${index}`} product={product} />)}
      </ul>
      {!sale && !products.length && <p className="text-sm text-[#737774]">N/A</p>}
    </OrderDetailSection>
  );
}
