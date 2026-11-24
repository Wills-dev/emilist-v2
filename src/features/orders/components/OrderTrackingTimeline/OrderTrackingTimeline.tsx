import { formatDeliveryDate, getTrackingSteps } from "../../helpers/orderDelivery";
import type { OrderTracking } from "../../types/order";

export default function OrderTrackingTimeline({ tracking }: { tracking: OrderTracking }) {
  const steps = getTrackingSteps(tracking);

  return (
    <div className="rounded-xl bg-[#FAFAFA] p-2 sm:min-h-40 sm:px-3 sm:py-6">
      <ol aria-label="Delivery progress" className="flex flex-col gap-7 sm:flex-row sm:gap-0">
        {steps.map((step, index) => {
          const textColor = step.isCompleted ? "text-[#18A154]" : step.isNext ? "text-[#D59600]" : "text-[#8A8D8B]";
          const markerColor = step.isCompleted ? "bg-[#25C269]" : step.isNext ? "bg-[#FFC107]" : "bg-[#D0D5DD]";
          const mobileBackground = step.isCompleted ? "bg-[#FAFFF6]" : step.isNext ? "bg-[#FFFDEB]" : "bg-white";
          const date = formatDeliveryDate(step.timestamp);
          const hasNext = index < steps.length - 1;

          return (
            <li
              key={step.status}
              aria-current={step.status === tracking.deliveryStatus ? "step" : undefined}
              className={`relative flex min-w-0 flex-1 flex-col items-center rounded-lg px-3 py-3 text-center sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 ${mobileBackground}`}
            >
              <span className={`flex items-center justify-center text-xs sm:min-h-9 sm:px-1 ${textColor}`}>{step.label}</span>
              <div className="relative mt-1 hidden h-5 w-full items-center justify-center sm:flex">
                {hasNext && <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-1 w-full -translate-y-1/2 bg-[#EAEAEA]" />}
                <span
                  aria-label={step.isCompleted ? "Completed" : step.isNext ? "Next step" : "Not completed"}
                  className={`relative z-10 h-[18px] w-7 rounded-full ${markerColor}`}
                />
              </div>
              {step.isCompleted && (
                <span className={`mt-2 text-[10px] leading-4 sm:px-1 ${textColor}`}>
                  {date ? <time dateTime={step.timestamp!}>{date}</time> : "N/A"}
                </span>
              )}
              {step.note && <p className="mt-1 px-1 text-[10px] leading-4 text-[#667085]">{step.note}</p>}
              {hasNext && <span aria-hidden="true" className="absolute left-1/2 top-full mt-2 h-3 -translate-x-1/2 rounded-full border-l-[3px] border-dotted border-[#D9D9D9] sm:hidden" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
