import { useLayoutEffect, useRef } from "react";

export const useMessageViewport = () => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(max-width: 767px)");
    const viewport = window.visualViewport;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    let frame = 0;
    const update = () => {
      if (media.matches) {
        const height = viewport?.height ?? window.innerHeight;
        const offset = viewport?.offsetTop ?? 0;
        const headerHeight = height < 320 ? 0 : 80;
        element.style.height = `${Math.max(0, height - headerHeight)}px`;
        element.style.top = `${offset + headerHeight}px`;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        element.style.height = `${Math.max(0, (viewport?.height ?? window.innerHeight) - 80)}px`;
        element.style.removeProperty("top");
        document.body.style.overflow = bodyOverflow;
        document.documentElement.style.overflow = rootOverflow;
      }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule); media.removeEventListener("change", schedule);
      viewport?.removeEventListener("resize", schedule); viewport?.removeEventListener("scroll", schedule);
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, []);
  return ref;
};
