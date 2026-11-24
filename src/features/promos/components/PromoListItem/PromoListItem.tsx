import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";
import CopyReferenceButton from "@/components/atoms/CopyReferenceButton/CopyReferenceButton";
import type { PromoView, SellerPromo } from "../../types";

export default function PromoListItem({ promo, now, onSelect }: { promo: SellerPromo; now: number; onSelect: (view: PromoView) => void }) {
  const status = Date.parse(promo.expiryDate) <= now ? "Expired" : promo.isActive ? "Enabled" : "Disabled";
  const expiry = new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" }).format(new Date(promo.expiryDate));
  return (
    <section className="space-y-3 border-b border-[#F1F2F9] pb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-exo font-semibold text-[#474C48]">{promo.code} · {promo.discountPercentage}% off</h3>
        <CopyReferenceButton value={promo.code} label={`Copy ${promo.code}`} compact />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#737774]">
        <span>{status}</span><span>Expires: {expiry} WAT</span>
        <span>{promo.useCount} {promo.useCount === 1 ? "use" : "uses"}</span>
        <span>{promo.isSingleUse ? "Single use" : "Multiple uses"}</span>
      </div>
      <p className="text-xs text-[#737774]">Products: {promo.products.map((product) => product.name).join(", ") || "N/A"}</p>
      <div className="flex flex-wrap gap-2">
        <ItemActionButton title="Edit promo" className="text-[#6667FF]" onClick={() => onSelect({ kind: "edit", promo })} />
        <ItemActionButton title="Delete promo" className="text-[#FF5D7A]" onClick={() => onSelect({ kind: "delete", promo })} />
      </div>
    </section>
  );
}
