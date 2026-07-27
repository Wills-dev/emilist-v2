import MerchantsInfo from "../MerchantsInfo/MerchantsInfo";
import OrderCardActionBtns from "../OrderCardActionBtns/OrderCardActionBtns";
import OrderInfoWrapper from "../OrderInfoWrapper/OrderInfoWrapper";
import { OrderTrackingStatus } from "../../hooks/useTrackOrder";

const OrderCard = ({
  isLast = false,
  trackingStatus = "out_for_delivery",
}: {
  isLast?: boolean;
  trackingStatus?: OrderTrackingStatus;
}) => {
  const orderId = "3354654654526";
  const orderNumber = "3354654654526";

  return (
    <div
      className={`w-full ${isLast ? "" : "border-b border-[#F1F2F9] pb-3.5"}`}
    >
      <div className="py-3.5 space-y-2">
        <div className="flex items-center sm:gap-3.5 gap-2.5 max-lg:border-b max-lg:border-[#F1F2F9] max-lg:pb-2">
          <div className="bg-[#ECECF0] md:w-28 w-16.5 md:h-32.5 h-16 rounded-[8.75px] overflow-hidden"></div>
          <div className="flex-1 w-full space-y-2">
            <div className="w-full flex lg:items-center justify-between max-lg:flex-col">
              <p className="font-semibold font-exo max-sm:text-sm">
                Order #3354654654526
              </p>
              <div className="flex items-center gap-1 justify-between">
                <span className="text-[#707471] text-xs">Total cost:</span>
                <span className="font-semibold font-exo max-sm:text-sm">
                  {" "}
                  ₦135,000{" "}
                </span>
              </div>
            </div>
            <div className="max-lg:hidden">
              <OrderInfoWrapper trackingStatus={trackingStatus} />
            </div>
            <div className="flex justify-between items-center gap-4 max-lg:hidden">
              <MerchantsInfo />

              <div className="">
                <OrderCardActionBtns
                  orderId={orderId}
                  orderNumber={orderNumber}
                  trackingStatus={trackingStatus}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <OrderCardActionBtns
            orderId={orderId}
            orderNumber={orderNumber}
            trackingStatus={trackingStatus}
          />
        </div>
        <div className="lg:hidden">
          <OrderInfoWrapper trackingStatus={trackingStatus} />
        </div>
        <div className="lg:hidden">
          <MerchantsInfo />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
