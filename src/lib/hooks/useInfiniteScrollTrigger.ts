// lib/hooks/useInfiniteScrollTrigger.ts
import { useEffect, useRef, RefObject } from "react";

interface UseInfiniteScrollTriggerParams {
  /** Called when the sentinel element scrolls into view */
  onIntersect: () => void;
  /** Whether the trigger should be active (e.g. hasNextPage && !isFetchingNextPage) */
  enabled: boolean;
  /** Pass the scroll container's ref for horizontal or contained scroll areas. Omit for normal page scroll. */
  rootRef?: RefObject<HTMLElement>;
  /** How much of the sentinel must be visible before firing. Defaults to 1 (fully visible). */
  threshold?: number;
}

export const useInfiniteScrollTrigger = ({
  onIntersect,
  enabled,
  rootRef,
  threshold = 1,
}: UseInfiniteScrollTriggerParams) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled) {
          onIntersect();
        }
      },
      {
        root: rootRef?.current ?? null,
        threshold,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect, enabled, rootRef, threshold]);

  return sentinelRef;
};
