import Truck2 from "@/components/atoms/icons/Truck2/Truck2";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import { displayOrderDate, displayOrderValue } from "../../helpers/orderDisplay";
import { deliveryLabels } from "../../helpers/orderDelivery";
import type { CustomerOrder } from "../../types/order";

export default function OrderInfoWrapper({ order }: { order: CustomerOrder }) {
  const firstProduct = order.products[0];
  const quantity = order.products.reduce((total, product) => total + product.quantity, 0);
  const unit = order.products.length === 1 ? firstProduct?.quantityMetric : undefined;
  const quantityLabel = !order.products.length || !Number.isFinite(quantity)
    ? "N/A"
    : unit
      ? `${quantity} ${unit}${quantity === 1 || unit.endsWith("s") ? "" : "s"}`
      : `${quantity} ${quantity === 1 ? "item" : "items"}`;
  const fields = [
    { label: "Order date:", value: displayOrderDate(order.createdAt) },
    { label: "Order quantity:", value: quantityLabel },
    { label: "Payment status:", value: displayOrderValue(order.paymentStatus) },
    { label: "Delivery date:", value: displayOrderDate(order.deliveryDate), icon: <Truck2 size="14" /> },
    { label: "Delivery Status:", value: displayOrderValue(deliveryLabels[order.deliveryStatus]), icon: <Truck2 size="14" /> },
    ...(firstProduct ? [
      { label: "Product name:", value: displayOrderValue(firstProduct.productName) },
      { label: "Brand:", value: displayOrderValue(firstProduct.brand) },
      { label: "Category:", value: displayOrderValue(firstProduct.categoryName) },
    ] : []),
  ];

  return (
    <div className="flex flex-wrap gap-y-2 border-y border-[#F1F2F9] py-2">
      {fields.map((field) => (
        <InfoItem key={field.label} {...field} variant="xs" labelClass="text-[#707471]" className="border-r border-[#D0D5DD] px-2 text-[#1D2939]" />
      ))}
    </div>
  );
}
