import { Skeleton } from "@/components/ui/skeleton/skeleton";
const MessagingSkeleton = ({ variant }: { variant: "inbox" | "chat" }) => (
  <div role="status" aria-label={variant === "inbox" ? "Loading conversations" : "Loading messages"} className="space-y-5 p-4">
    {Array.from({ length: 5 }, (_, index) => (
      <div key={index} aria-hidden="true" className={`flex gap-3 ${variant === "chat" && index % 2 ? "justify-end" : ""}`}>
        {variant === "inbox" && <Skeleton className="size-9 shrink-0 rounded-full" />}
        <div className="w-3/4 space-y-2"><Skeleton className={variant === "chat" ? "h-14 w-full rounded-xl" : "h-4 w-24"} /><Skeleton className="h-3 w-3/4" /></div>
      </div>
    ))}
  </div>
);
export default MessagingSkeleton;
