"use client";
import { promoProductUnavailableReason } from "../../helpers/promoProductEligibility";
import { useState } from "react";
import type { PromoProduct } from "../../types";
import { usePromoProducts } from "../../hooks/useSellerPromos";

export default function PromoProductPicker({ initialProducts, selected, onChange }: { initialProducts: PromoProduct[]; selected: string[]; onChange: (ids: string[]) => void }) {
  const query = usePromoProducts();
  const [search, setSearch] = useState("");
  const products = [...new Map([...initialProducts, ...(query.data?.pages.flatMap((page) => page.products) ?? [])].map((product) => [product.id, product])).values()];
  const visible = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) && (selected.includes(product.id) || !promoProductUnavailableReason(product)));
  return <div className="space-y-3">
    <div className="flex items-center justify-between text-sm"><p className="font-medium text-[#474C48]">Products</p><span className="text-xs text-[#737774]">{selected.length} / 50 selected</span></div>
    <input type="search" aria-label="Find your listed products" placeholder="Find a product" value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 w-full rounded-lg border border-[#ECECEC] bg-white px-3 text-sm outline-none focus:border-[#25C269]" />
    <div className="max-h-52 space-y-1 overflow-y-auto rounded-lg border border-[#F1F2F9] p-2">
      {visible.map((product) => {
        const checked = selected.includes(product.id);
        const unavailable = promoProductUnavailableReason(product);
        return <label key={product.id} className="flex cursor-pointer items-center gap-3 rounded-md p-2 text-xs hover:bg-[#F6F7F9]"><input type="checkbox" checked={checked} disabled={!checked && (Boolean(unavailable) || selected.length >= 50)} onChange={() => onChange(checked ? selected.filter((id) => id !== product.id) : [...selected, product.id])} className="size-4 shrink-0 accent-[#25C269]" /><span>{product.name}{unavailable && <span className="ml-2 text-[#FF5D7A]">Unavailable</span>}</span></label>;
      })}
      {query.isPending && <p role="status" className="p-2 text-xs text-[#737774]">Loading products…</p>}
      {query.isError && <p role="alert" className="p-2 text-xs text-[#FF5D7A]">Unable to load more products. <button type="button" onClick={() => void query.refetch()} className="underline">Try again</button></p>}
      {!query.isPending && !visible.length && <p className="p-2 text-xs text-[#737774]">No matching active products.</p>}
      {query.hasNextPage && <button type="button" disabled={query.isFetchingNextPage} onClick={() => void query.fetchNextPage()} className="p-2 text-xs text-[#6667FF] underline">{query.isFetchingNextPage ? "Loading…" : "Load more products"}</button>}
    </div>
  </div>;
}
