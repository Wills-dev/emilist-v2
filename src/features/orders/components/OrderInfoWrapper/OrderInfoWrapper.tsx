import Truck2 from "@/components/atoms/icons/Truck2/Truck2";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import type { CustomerOrder } from "../../types/order";

const deliveryLabels: Record<CustomerOrder["deliveryStatus"], string> = {
  orderConfirmed: "Confirmed",
  outForDelivery: "Out for Delivery",
  delivered: "Delivered",
  canceled: "Canceled",
  returned: "Returned",
};

const OrderInfoWrapper = ({ order }: { order: CustomerOrder }) => {
  const firstProduct = order.products[0];
  const quantity = order.products.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  const quantityLabel =
    order.products.length === 1 && firstProduct?.quantityMetric
      ? `${quantity} ${firstProduct.quantityMetric}${quantity === 1 ? "" : "s"}`
      : `${quantity} ${quantity === 1 ? "item" : "items"}`;

  return (
    <div className="flex flex-wrap space-y-2 border-y border-[#F1F2F9] py-2">
      <InfoItem
        label="Order date:"
        value={new Date(order.createdAt).toLocaleDateString()}
        variant="xs"
        labelClass="text-[#707471]"
        className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
      />
      <InfoItem
        label="Order quantity:"
        value={quantityLabel}
        variant="xs"
        labelClass="text-[#707471]"
        className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
      />
      <InfoItem
        label="Payment status:"
        value={order.paymentStatus}
        variant="xs"
        labelClass="text-[#707471]"
        className="border-r border-[#D0D5DD] px-2 capitalize text-[#1D2939]"
      />
      {order.deliveryDate && (
        <InfoItem
          label="Delivery date:"
          value={new Date(order.deliveryDate).toLocaleDateString()}
          icon={<Truck2 size="14" />}
          variant="xs"
          labelClass="text-[#707471]"
          className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
        />
      )}
      <InfoItem
        label="Delivery Status:"
        icon={<Truck2 size="14" />}
        value={deliveryLabels[order.deliveryStatus]}
        variant="xs"
        labelClass="text-[#707471]"
        className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
      />
      {firstProduct && (
        <>
          <InfoItem
            label="Product name:"
            value={firstProduct.productName}
            variant="xs"
            labelClass="text-[#707471]"
            className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
          />
          {firstProduct.brand && (
            <InfoItem
              label="Brand:"
              value={firstProduct.brand}
              variant="xs"
              labelClass="text-[#707471]"
              className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
            />
          )}
          {firstProduct.categoryName && (
            <InfoItem
              label="Category:"
              value={firstProduct.categoryName}
              variant="xs"
              labelClass="text-[#707471]"
              className="border-r border-[#D0D5DD] px-2 text-[#1D2939]"
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrderInfoWrapper;
