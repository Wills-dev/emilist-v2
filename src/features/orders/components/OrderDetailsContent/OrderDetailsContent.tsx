import CopyReferenceButton from "@/components/atoms/CopyReferenceButton/CopyReferenceButton";
import { deliveryLabels, deliveryTone } from "../../helpers/orderDelivery";
import { displayOrderDateTime, displayOrderValue } from "../../helpers/orderDisplay";
import type { CustomerOrder, Sale } from "../../types/order";
import OrderDetailItems from "../OrderDetailItems/OrderDetailItems";
import OrderPaymentSummary from "../OrderPaymentSummary/OrderPaymentSummary";
import OrderDeliveryDetails from "../OrderDeliveryDetails/OrderDeliveryDetails";
import OrderReferencePanel from "../OrderReferencePanel/OrderReferencePanel";

export default function OrderDetailsContent({ order, sale }: { order: CustomerOrder; sale?: Sale }) {
  const status = sale?.deliveryStatus ?? order.deliveryStatus;
  const paymentStatus = sale?.paymentStatus ?? order.paymentStatus;
  const itemCount = sale?.quantity ?? order.products.reduce((sum, product) => sum + product.quantity, 0);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#737774]">{displayOrderValue(itemCount)} {itemCount === 1 ? "item" : "items"}</p>
          <CopyReferenceButton value={order._id} label="Copy order ID" />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-y border-[#F1F2F9] py-3 text-xs text-[#737774]">
          <p>Order date: <span className="text-[#474C48]">{displayOrderDateTime(sale?.orderDate ?? order.createdAt)}</span></p>
          <p>Payment status: <span className="capitalize text-[#474C48]">{displayOrderValue(paymentStatus)}</span></p>
          <p>Delivery status: <span className={deliveryTone(status)}>{displayOrderValue(deliveryLabels[status])}</span></p>
        </div>
      </div>
      <OrderDetailItems order={order} sale={sale} />
      <OrderDeliveryDetails order={order} sale={sale} />
      <OrderPaymentSummary order={order} sale={sale} />
      <OrderReferencePanel order={order} sale={sale} />
    </div>
  );
}
