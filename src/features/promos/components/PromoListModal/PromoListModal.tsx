"use client";
import { useState } from "react";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Button from "@/components/atoms/Button/Button";
import type { PromoView, SellerPromo } from "../../types";
import PromoListItem from "../PromoListItem/PromoListItem";

export default function PromoListModal({ promos, productName, canCreate, onSelect, onClose, loading, error, onRetry }: {
  promos: SellerPromo[]; productName: string; canCreate: boolean; onSelect: (view: PromoView) => void;
  onClose: () => void; loading: boolean; error: boolean; onRetry: () => void;
}) {
  const [now] = useState(() => Date.now());
  return (
    <ModalWrapper open onClose={onClose} title="Product Promos" className="max-w-xl!" headerClassName="border-b border-[#ECECEC] pb-4">
      <div className="space-y-5 pt-4">
        <p className="text-sm text-[#667085]">Promos for {productName}</p>
        {loading ? <p role="status" className="text-sm">Loading promos…</p>
          : error ? <p role="alert" className="text-sm text-[#FF5D7A]">Unable to load promos. <button type="button" onClick={onRetry} className="underline">Try again</button></p>
            : !promos.length ? <p className="text-sm text-[#737774]">No promos for this product yet.</p>
              : promos.map((promo) => <PromoListItem key={promo.id} promo={promo} now={now} onSelect={onSelect} />)}
        <div className="flex gap-3">
          <Button type="button" variant="default" className="h-11 flex-1" onClick={onClose}>Close</Button>
          <Button type="button" variant="primary" className="h-11 flex-1" disabled={!canCreate || loading || error} onClick={() => onSelect({ kind: "create" })}>Create promo</Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
