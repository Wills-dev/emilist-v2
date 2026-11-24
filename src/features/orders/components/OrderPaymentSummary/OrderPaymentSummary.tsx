import type { CustomerOrder, Sale } from "../../types/order";
import { formatOrderMoney } from "../../helpers/orderDetails";
import { displayOrderValue } from "../../helpers/orderDisplay";
import OrderDetailSection from "../OrderDetailSection/OrderDetailSection";

export default function OrderPaymentSummary({ order, sale }: { order: CustomerOrder; sale?: Sale }) {
  const currency = sale?.pricing.currency ?? order.products[0]?.currency ?? "NGN";
  const total = sale?.pricing.totalAmount ?? order.totalAmount;
  const rows = sale ? [{ label: "Payment status", value: displayOrderValue(sale.paymentStatus) }] : [
    { label: "Subtotal", value: formatOrderMoney(order.subtotalAmount, currency) },
    { label: "Discount", value: order.discountAmount > 0 ? `−${formatOrderMoney(order.discountAmount, currency)}` : formatOrderMoney(order.discountAmount, currency) },
    { label: "Shipping", value: formatOrderMoney(order.shippingAmount, currency) },
    { label: "Tax", value: formatOrderMoney(order.taxAmount, currency) },
  ];
  return (
    <OrderDetailSection title="Payment summary">
      <dl className="space-y-3">
        {rows.map((row) => <div key={row.label} className="flex justify-between gap-3 text-xs"><dt className="text-[#737774]">{row.label}</dt><dd className="text-right capitalize text-[#474C48]">{row.value}</dd></div>)}
        <div className="flex justify-between gap-3 border-t border-[#F1F2F9] pt-4 text-sm font-semibold"><dt className="text-[#303632]">{sale ? "Sale total" : "Order total"}</dt><dd className="text-right font-exo text-[#474C48]">{formatOrderMoney(total, currency)}</dd></div>
      </dl>
    </OrderDetailSection>
  );
}
