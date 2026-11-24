"use client";
import { useState } from "react";
import { Tag } from "lucide-react";
import { useStore } from "@/store/authStore";
import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";
import { useSellerPromos } from "../../hooks/useSellerPromos";
import type { PromoProduct, PromoView } from "../../types";
import PromoFormModal from "../PromoFormModal/PromoFormModal";
import PromoListModal from "../PromoListModal/PromoListModal";
import DeletePromoModal from "../DeletePromoModal/DeletePromoModal";

function OwnerPromoActions({ product }: { product: PromoProduct }) {
  const query = useSellerPromos();
  const [view, setView] = useState<PromoView | null>(null);
  const promos = query.data?.filter((promo) => promo.products.some((item) => item.id === product.id)) ?? [];
  const canCreate = !product.isDeleted && (!product.status || product.status === "active");
  const close = () => setView(null);
  return <>
    {query.isPending ? <ItemActionButton title="Loading promos…" onClick={() => {}} disabled icon={<Tag size={13} />} /> : query.isError || promos.length > 0 ? <ItemActionButton title={promos.length > 1 ? "View promos" : "View promo"} onClick={() => setView({ kind: "list" })} icon={<Tag size={13} />} className="text-[#6667FF]" /> : <ItemActionButton title="Create promo" onClick={() => setView({ kind: "create" })} disabled={!canCreate} icon={<Tag size={13} />} className="text-[#6667FF]" />}
    {view?.kind === "list" && <PromoListModal promos={promos} productName={product.name} canCreate={canCreate} onSelect={setView} onClose={close} loading={query.isPending} error={query.isError} onRetry={() => void query.refetch()} />}
    {(view?.kind === "create" || view?.kind === "edit") && <PromoFormModal key={view.kind === "edit" ? view.promo.id : "create"} product={product} promo={view.kind === "edit" ? view.promo : undefined} onClose={close} />}
    {view?.kind === "delete" && <DeletePromoModal promo={view.promo} onClose={close} />}
  </>;
}

export default function ProductPromoActions({ product, ownerId }: { product: PromoProduct; ownerId?: string }) {
  const userId = useStore((state) => state.currentUser?._id);
  return userId && ownerId === userId ? <OwnerPromoActions key={userId} product={product} /> : null;
}
