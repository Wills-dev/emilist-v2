"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useGetOrder } from "../../hooks/useGetOrder";
import type { Sale } from "../../types/order";
import OrderDetailsContent from "../OrderDetailsContent/OrderDetailsContent";

function DetailsSkeleton() {
  return <div role="status" aria-label="Loading details" aria-busy="true" className="space-y-6">
    <div className="space-y-3 border-b border-[#F1F2F9] pb-4"><div className="flex justify-between"><Skeleton className="h-4 w-16" /><Skeleton className="h-7 w-28" /></div><Skeleton className="h-4 w-3/4" /></div>
    <div className="flex gap-4 border-b border-[#F1F2F9] pb-5"><Skeleton className="size-20 shrink-0 rounded-lg" /><div className="flex-1 space-y-3"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-3 w-1/2" /><Skeleton className="h-3 w-1/3" /></div></div>
    {[0, 1].map((i) => <div key={i} className="space-y-4 border-b border-[#F1F2F9] pb-5"><Skeleton className="h-4 w-28" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>)}
  </div>;
}

export default function OrderDetailsModal({ orderId, open, onClose, sale }: {
  orderId: string; open: boolean; onClose: (open: boolean) => void; sale?: Sale;
}) {
  const query = useGetOrder(orderId, open);
  return (
    <ModalWrapper open={open} onClose={onClose} title={sale ? "Sale Details" : "Order Details"}
      className="w-[calc(100%-2rem)] max-w-2xl!"
      headerClassName="border-b border-[#ECECEC] pb-4 pr-8">
      <div className="space-y-6 pt-4">
        {query.isPending ? <DetailsSkeleton /> : query.isError ? <div role="alert" className="space-y-4 py-8 text-center"><p className="text-sm text-[#737774]">Unable to load these details.</p><Button type="button" variant="secondary" className="mx-auto h-10" onClick={() => void query.refetch()}>Try again</Button></div> : query.data ? <OrderDetailsContent key={`${sale?.saleId || "order"}:${query.data._id}`} order={query.data} sale={sale} /> : <p className="py-8 text-sm text-[#737774]">N/A</p>}
        <Button type="button" variant="default" className="h-11 w-full" onClick={() => onClose(false)}>Close</Button>
      </div>
    </ModalWrapper>
  );
}
