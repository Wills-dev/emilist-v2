import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PopOver = ({
  children,
  actionBtn,
  className = "",
}: {
  children: React.ReactNode;
  actionBtn: React.ReactElement;
  variant?: "left" | "top" | "bottom" | "right";
  className?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{actionBtn}</TooltipTrigger>
      <TooltipContent
        sideOffset={8}
        className={`${className} bg-gray-50 shadow text-[#272727]`}
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

export default PopOver;
