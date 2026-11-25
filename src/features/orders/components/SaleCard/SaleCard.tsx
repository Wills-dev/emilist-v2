"use client";
import { useState } from "react";
import Image from "next/image";
import ItemActionButton from "@/components/atoms/ItemActionButton/ItemActionButton";
import MessageButton from "@/features/messages/components/MessageButton/MessageButton";
import { deliveryLabels, deliveryTone, getSaleActions } from "../../helpers/orderDelivery";
import { displayOrderDate, displayOrderValue } from "../../helpers/orderDisplay";
import { useSaleActions } from "../../hooks/useSales";
import { useCancelOrder } from "../../hooks/useCancelOrder";
import type { Sale } from "../../types/order";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import ConfirmOrderActionModal from "../ConfirmOrderActionModal/ConfirmOrderActionModal";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
import OrderStatusUpdate from "../OrderStatusUpdate/OrderStatusUpdate";

export default function SaleCard({ sale }: { sale: Sale }) {
  const [details, setDetails] = useState(false);
  const [confirmation, setConfirmation] = useState<"outForDelivery" | "delivered" | null>(null);
  const actions = getSaleActions(sale.deliveryStatus);
  const mutation = useSaleActions(sale.orderId);
  const cancel = useCancelOrder({ orderId: sale.orderId, onCancelOrder: async ({ reason }) => { await mutation.cancel(reason); } });
  const total = Number.isFinite(sale.pricing.totalAmount) ? new Intl.NumberFormat("en-NG", { style: "currency", currency: sale.pricing.currency }).format(sale.pricing.totalAmount) : "N/A";
  return <article className="space-y-4 border-b border-[#F1F2F9] py-5 last:border-0">
    <div className="flex items-start gap-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-[#F4F7F5] sm:size-28">{sale.product.thumbnail && <Image src={sale.product.thumbnail} alt={sale.product.name} fill sizes="112px" className="object-cover" />}</div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap justify-between gap-2"><h2 className="break-all font-exo font-semibold">Order #{displayOrderValue(sale.orderNumber?.replace(/^#/, ""))}</h2><p className="text-sm"><span className="text-[#737774]">Total cost: </span><strong>{total}</strong></p></div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-[#F1F2F9] py-3 text-xs text-[#737774]">
          <span>Order date: <span className="text-[#172033]">{displayOrderDate(sale.orderDate)}</span></span>
          <span>Order quantity: <span className="text-[#172033]">{displayOrderValue(sale.quantity)} {displayOrderValue(sale.quantityMetric)}</span></span>
          <span>Payment status: <span className="capitalize text-[#172033]">{displayOrderValue(sale.paymentStatus)}</span></span>
          <span>Delivery date: <span className="text-[#172033]">{displayOrderDate(sale.deliveryDate)}</span></span>
          <span>Status: <span className={deliveryTone(sale.deliveryStatus)}>{displayOrderValue(deliveryLabels[sale.deliveryStatus])}</span></span>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#737774]">
      <span>Product name: <span className="text-[#474C48]">{displayOrderValue(sale.product.name)}</span></span>
      <span>Brand: {displayOrderValue(sale.product.brand)}</span><span>Category: {displayOrderValue(sale.product.category)}</span>
      <span>Buyer: {displayOrderValue(sale.buyer.name)} · {displayOrderValue(sale.buyer.email)}</span>
      <span>Delivery address: {displayOrderValue(sale.deliveryAddress)}</span>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <OrderStatusUpdate status={sale.deliveryStatus} updatedAt={sale.deliveryStatusUpdatedAt || (sale.latestStep?.status === sale.deliveryStatus ? sale.latestStep.activatedAt : undefined)} />
      <div className="flex flex-wrap gap-2">
        <MessageButton recipient={{ userId: sale.buyer.id, name: sale.buyer.name }} label="Contact Buyer" showLabel className="inline-flex h-7 items-center justify-center rounded-md bg-[#F6F7F9] px-3 text-[#737774]" />
        <ItemActionButton title="View Sales" onClick={() => setDetails(true)} />
        {actions.canCancel && <ItemActionButton title="Cancel Order" onClick={cancel.openModal} disabled={mutation.busy} />}
        {actions.canDispatch && <ItemActionButton title="Confirm Order Dispatched" onClick={() => setConfirmation("outForDelivery")} disabled={mutation.busy} className="text-[#6667FF]" />}
        {actions.canDeliver && <ItemActionButton title="Confirm Order Delivered" onClick={() => setConfirmation("delivered")} disabled={mutation.busy} className="text-[#18A154]" />}
      </div>
    </div>
    <CancelOrderModal open={cancel.isOpen} onClose={cancel.handleModalChange} orderNumber={sale.orderNumber} reason={cancel.reason} setReason={cancel.setReason} onSubmit={cancel.handleSubmit} isSubmitting={cancel.isSubmitting || mutation.busy} canSubmit={cancel.canSubmit && actions.canCancel} />
    <OrderDetailsModal orderId={sale.orderId} open={details} onClose={setDetails} sale={sale} />
    <ConfirmOrderActionModal key={confirmation ?? "closed"} requireDeliveryEvidence={confirmation === "delivered"} open={Boolean(confirmation)} onClose={(open) => { if (!open) setConfirmation(null); }} title={confirmation === "outForDelivery" ? "Confirm Order Dispatched" : "Confirm Order Delivered"} description={confirmation === "outForDelivery" ? "Confirm that this package has been dispatched. Its status will change to Out for Delivery." : "Confirm that this order has been delivered to the buyer. Its status will change to Delivered."} disabled={confirmation === "outForDelivery" ? !actions.canDispatch : !actions.canDeliver} onConfirm={(deliveryImage) => mutation.update(confirmation!, deliveryImage)} />
  </article>;
}
