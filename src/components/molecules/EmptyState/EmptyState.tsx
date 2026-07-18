import { Inbox } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils";

const EmptyState = ({
  title = "Nothing to show yet",
  description = "There is no data available right now.",
  actionLabel,
  onAction,
  icon,
  className,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-72 w-full flex-col items-center justify-center rounded-[12px] border border-[#F1F2F9] bg-[#F9F9F9] px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#F0FDF5] text-[#18A154]">
        {icon || <Inbox className="size-6" aria-hidden="true" />}
      </div>
      <h2 className="font-exo text-xl font-semibold text-[#333E49]">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#707471]">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
