import type { ReactNode } from "react";
import type { OrderSort } from "../../types/order";
import OrderSortSelect from "../OrderSortSelect/OrderSortSelect";

export default function OrderListPanel({ title, total, sortBy, onSortChange, children }: {
  title: "Orders" | "Sales"; total: number; sortBy: OrderSort;
  onSortChange: (sort: OrderSort) => void; children: ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-xl border border-[#F1F2F9] bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1F2F9] pb-4">
        <h2 className="font-exo text-sm font-semibold">{total} {title}</h2>
        <OrderSortSelect value={sortBy} onChange={onSortChange} label={`Sort ${title.toLowerCase()}`} />
      </div>
      {children}
    </section>
  );
}
