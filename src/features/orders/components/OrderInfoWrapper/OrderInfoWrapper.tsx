import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import { getCurrencySign } from "@/lib/helpers/currencySign";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import type { CustomerOrder } from "../../types/order";

const deliveryLabels: Record<CustomerOrder["deliveryStatus"], string> = {
  orderConfirmed: "Order confirmed",
  outForDelivery: "Out for delivery",
  delivered: "Delivered",
  canceled: "Canceled",
  returned: "Returned",
};

const OrderInfoWrapper = ({ order }: { order: CustomerOrder }) => (
  <div className="flex flex-wrap gap-y-2 border-y border-[#F1F2F9] py-2">
    <InfoItem
      label="Order date:"
      value={new Date(order.createdAt).toLocaleDateString()}
      variant="xs"
      labelClass="text-[#707471]"
      className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
    />
    <InfoItem
      label="Items:"
      value={String(order.products.reduce((count, item) => count + item.quantity, 0))}
      variant="xs"
      labelClass="text-[#707471]"
      className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
    />
    <InfoItem
      label="Payment:"
      value={order.paymentStatus}
      variant="xs"
      labelClass="text-[#707471]"
      className="border-r border-[#D0D5DD] px-2 capitalize text-[#1D2939]"
    />
    <InfoItem
      label="Delivery:"
      value={deliveryLabels[order.deliveryStatus]}
      variant="xs"
      labelClass="text-[#707471]"
      className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
    />
    <InfoItem
      label="Total:"
      value={`${getCurrencySign("NGN")}${numberWithCommas(order.totalAmount)}`}
      variant="xs"
      labelClass="text-[#707471]"
      className="px-2 text-[#1D2939]"
    />
  </div>
);

export default OrderInfoWrapper;
