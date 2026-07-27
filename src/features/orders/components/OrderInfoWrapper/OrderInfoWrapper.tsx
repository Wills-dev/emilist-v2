import Truck2 from "@/components/atoms/icons/Truck2";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import { OrderTrackingStatus } from "../../hooks/useTrackOrder";

const OrderInfoWrapper = ({
  trackingStatus,
}: {
  trackingStatus: OrderTrackingStatus;
}) => {
  const statusConfig: Record<
    OrderTrackingStatus,
    { label: string; color: string; iconColor: string }
  > = {
    confirmed: {
      label: "Confirmed",
      color: "text-[#1D2939]",
      iconColor: "#1D2939",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      color: "text-[#FF9933]",
      iconColor: "#FF9933",
    },
    delivered: {
      label: "Delivered",
      color: "text-[#25C269]",
      iconColor: "#25C269",
    },
  };
  const orderStatus = statusConfig[trackingStatus];

  return (
    <div className="py-2 border-y border-[#F1F2F9] flex flex-wrap space-y-2">
      {" "}
      <InfoItem
        label="Order date:"
        value={"February 17, 2026"}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />{" "}
      <InfoItem
        label="Order quantity:"
        value={"15 bags"}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />
      <InfoItem
        label="Payment status:"
        value={"Paid"}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />
      <InfoItem
        label="Delivery date:"
        value={"February 19, 2026"}
        icon={<Truck2 size="14" />}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />
      <InfoItem
        label="Delivery Status:"
        icon={<Truck2 currentColor={orderStatus.iconColor} size="14" />}
        value={orderStatus.label}
        variant="xs"
        labelClass="text-[#707471]"
        className={`${orderStatus.color} border-r border-[#D0D5DD] px-2`}
      />
      <InfoItem
        label="Product name:"
        value={"Cement"}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />
      <InfoItem
        label="Brand:"
        value={"Dangote"}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />
      <InfoItem
        label="Category:"
        value={"Building Materials"}
        variant="xs"
        labelClass="text-[#707471]"
        className="text-[#1D2939] border-r border-[#D0D5DD] px-2"
      />
    </div>
  );
};

export default OrderInfoWrapper;
