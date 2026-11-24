import { ChevronDown } from "lucide-react";
import CopyReferenceButton from "@/components/atoms/CopyReferenceButton/CopyReferenceButton";
import type { CustomerOrder, Sale } from "../../types/order";
import { getDetailProducts } from "../../helpers/orderDetails";
import { displayOrderValue } from "../../helpers/orderDisplay";

export default function OrderReferencePanel({ order, sale }: { order: CustomerOrder; sale?: Sale }) {
  const products = getDetailProducts(order, sale);
  const groups = [
    { title: sale ? "Sale references" : "Order references", rows: [
      { label: "Order ID", value: order._id },
      { label: "Cart ID", value: order.cartId },
      ...(sale ? [{ label: "Sale ID", value: sale.saleId }] : []),
    ] },
    ...products.map((product, index) => ({ title: displayOrderValue(product.productName), rows: [
      { label: "Product ID", value: product.productId },
      { label: "Seller ID", value: product.merchantId },
      ...(product._id ? [{ label: "Order item ID", value: product._id }] : []),
    ], key: product._id || `${product.productId}-${index}` })),
    ...(sale && !products.length ? [{ title: displayOrderValue(sale.product.name), rows: [{ label: "Product ID", value: sale.product.id }] }] : []),
  ];
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-2 text-xs font-medium text-[#6667FF] outline-none focus-visible:ring-2 focus-visible:ring-[#25C269] [&::-webkit-details-marker]:hidden">
        <span>Reference IDs</span><ChevronDown size={14} aria-hidden="true" className="ml-auto transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-4 border-t border-[#F1F2F9] pt-4">
        {groups.map((group, index) => <section key={index} className="space-y-2"><h4 className="text-xs font-medium text-[#474C48]">{group.title}</h4><div className="divide-y divide-[#F1F2F9]">{group.rows.map((row) => <div key={row.label} className="flex items-center justify-between gap-3 py-2"><span className="text-xs text-[#737774]">{row.label}</span>{row.value ? <CopyReferenceButton value={row.value} label={`Copy ${row.label} for ${group.title}`} compact /> : <span className="text-xs text-[#8A8D8B]">N/A</span>}</div>)}</div></section>)}
      </div>
    </details>
  );
}
