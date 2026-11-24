import type { ReactNode } from "react";
import OrderCardSkeleton from "../OrderCardSkeleton/OrderCardSkeleton";

export default function OrderListState({ label, loading, signedIn, error, empty, onRetry, children }: {
  label: "orders" | "sales"; loading: boolean; signedIn: boolean; error: boolean;
  empty: boolean; onRetry: () => void; children: ReactNode;
}) {
  if (loading) return (
    <div role="status" aria-label={`Loading ${label}`} aria-busy="true" className="space-y-3.5">
      {[0, 1, 2].map((item) => <OrderCardSkeleton key={item} isLast={item === 2} />)}
    </div>
  );
  if (!signedIn) return <p className="py-8 text-center text-sm text-[#737774]">Sign in to view your {label}.</p>;
  if (error) return (
    <div role="alert" className="space-y-3 py-8 text-center text-sm text-[#737774]">
      <p>Unable to load your {label}.</p>
      <button type="button" onClick={onRetry} className="font-medium text-[#25C269]">Try again</button>
    </div>
  );
  if (empty) return <p className="py-8 text-center text-sm text-[#737774]">No {label} found.</p>;
  return children;
}
