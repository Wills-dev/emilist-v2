import { displayOrderDate, displayOrderValue } from "../../helpers/orderDisplay";
import type { OrderDeliveryStatus } from "../../types/order";
import { deliveryLabels, deliveryTone } from "../../helpers/orderDelivery";

export default function OrderStatusUpdate({ status, updatedAt }: { status: OrderDeliveryStatus; updatedAt?: string | null }) {
  const date = displayOrderDate(updatedAt);
  return <p className="text-xs text-[#707471]"><span className={`${deliveryTone(status)} underline`}>{displayOrderValue(deliveryLabels[status])}</span> on {date === "N/A" ? date : <time dateTime={updatedAt!}>{date}</time>}</p>;
}
