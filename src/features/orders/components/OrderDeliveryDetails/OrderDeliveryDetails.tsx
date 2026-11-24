import type { CustomerOrder, Sale } from "../../types/order";
import { displayOrderDateTime, displayOrderValue } from "../../helpers/orderDisplay";
import OrderDetailSection from "../OrderDetailSection/OrderDetailSection";

export default function OrderDeliveryDetails({ order, sale }: { order: CustomerOrder; sale?: Sale }) {
  const deliveredAt = sale?.deliveredAt ?? order.deliveredAt;
  const rows = [
    ...(sale ? [{ label: "Buyer", value: displayOrderValue(sale.buyer.name) }, { label: "Email", value: displayOrderValue(sale.buyer.email) }] : []),
    { label: "Delivery address", value: displayOrderValue(sale?.deliveryAddress ?? order.shippingAddress) },
    { label: "Expected delivery", value: displayOrderDateTime(sale?.deliveryDate ?? order.deliveryDate) },
    { label: "Status updated", value: displayOrderDateTime(sale?.deliveryStatusUpdatedAt ?? order.deliveryStatusUpdatedAt) },
    ...(deliveredAt ? [{ label: "Delivered", value: displayOrderDateTime(deliveredAt) }] : []),
    { label: "Order note", value: displayOrderValue(order.orderNote) },
    ...(order.cancellationReason ? [{ label: "Cancellation reason", value: order.cancellationReason }] : []),
    ...(order.returnReason ? [{ label: "Return reason", value: order.returnReason }] : []),
  ];
  return (
    <OrderDetailSection title="Delivery details">
      <dl className="space-y-3">
        {rows.map((row) => <div key={row.label} className="flex flex-col gap-1 sm:flex-row sm:gap-4"><dt className="shrink-0 text-xs text-[#737774] sm:w-32">{row.label}</dt><dd className="min-w-0 break-words text-xs leading-5 text-[#474C48]">{row.value}</dd></div>)}
      </dl>
    </OrderDetailSection>
  );
}
