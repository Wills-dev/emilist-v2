import Link from "next/link";
import { routes } from "@/lib/helpers/routes";

export default function OrderViewTabs({ sales = false }: { sales?: boolean }) {
  return <nav aria-label="Orders and sales" className="flex w-fit rounded-full bg-[#F9F9F9] p-1 text-sm">
    <Link scroll={false} href={routes.dashboardLinks.orders} aria-current={!sales ? "page" : undefined} className={`rounded-full px-4 py-3 ${!sales ? "bg-white text-[#172033]" : "text-[#737774]"}`}>Orders</Link>
    <Link scroll={false} href={`${routes.dashboardLinks.orders}?tab=sales`} aria-current={sales ? "page" : undefined} className={`rounded-full px-4 py-3 ${sales ? "bg-white text-[#172033]" : "text-[#737774]"}`}>Sales</Link>
  </nav>;
}
