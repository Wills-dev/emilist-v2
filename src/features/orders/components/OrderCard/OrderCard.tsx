import { getCurrencySign } from "@/lib/helpers/currencySign";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import OrderCardActionBtns from "../OrderCardActionBtns/OrderCardActionBtns";
import OrderInfoWrapper from "../OrderInfoWrapper/OrderInfoWrapper";
import type { CustomerOrder } from "../../types/order";

const OrderCard = ({
  order,
  isLast = false,
  selected = false,
  onSelectionChange,
}: {
  order: CustomerOrder;
  isLast?: boolean;
  selected?: boolean;
  onSelectionChange?: (orderId: string, selected: boolean) => void;
}) => (
  <article
    className={`w-full space-y-4 ${isLast ? "" : "border-b border-[#F1F2F9] pb-5"}`}
  >
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        {order.deliveryStatus === "orderConfirmed" &&
          order.paymentStatus === "paid" &&
          onSelectionChange && (
            <input
              type="checkbox"
              checked={selected}
              onChange={(event) =>
                onSelectionChange(order._id, event.target.checked)
              }
              aria-label={`Select order ${order._id} for bulk cancellation`}
              className="mt-1 accent-[#25C269]"
            />
          )}
        <div>
        <h2 className="font-exo text-sm font-semibold">Order #{order._id}</h2>
        <p className="mt-1 text-xs text-[#707471]">
          Placed {new Date(order.createdAt).toLocaleString()}
        </p>
        </div>
      </div>
      <p className="text-sm font-semibold">
        Total: {getCurrencySign("NGN")}
        {numberWithCommas(order.totalAmount)}
      </p>
    </div>

    <OrderInfoWrapper order={order} />

    <ul className="space-y-3">
      {order.products.map((product) => (
        <li
          key={product.productId}
          className="flex flex-wrap justify-between gap-2 rounded-lg bg-[#F9F9F9] p-3"
        >
          <div>
            <p className="text-sm font-medium">{product.productName}</p>
            <p className="mt-1 text-xs text-[#707471]">
              {product.brand ? `${product.brand} · ` : ""}
              {product.categoryName ?? "Material"} · Qty {product.quantity}
            </p>
            <p className="mt-1 text-xs text-[#707471]">
              Sold by {product.merchantName}
            </p>
          </div>
          <p className="text-xs text-[#474C48]">
            {getCurrencySign("NGN")}
            {numberWithCommas(product.price)} each
          </p>
        </li>
      ))}
    </ul>

    {order.deliveryStatus === "canceled" && order.cancellationReason && (
      <p className="text-sm text-[#737774]">
        Cancellation reason: {order.cancellationReason}
      </p>
    )}
    {order.deliveryStatus === "returned" && order.returnReason && (
      <p className="text-sm text-[#737774]">
        Return reason: {order.returnReason}
      </p>
    )}

    <OrderCardActionBtns order={order} />
  </article>
);

export default OrderCard;
