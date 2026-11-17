import { useReducedMotion } from "framer-motion";

export const useReportDateTransition = () => {
  const reducedMotion = useReducedMotion();
  return {
    initial: { height: 0, opacity: 0, paddingBottom: 0, overflow: "hidden" },
    animate: { height: "auto", opacity: 1, paddingBottom: 12, transitionEnd: { overflow: "visible" } },
    exit: { height: 0, opacity: 0, paddingBottom: 0, overflow: "hidden" },
    transition: { duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] as const },
  };
};
