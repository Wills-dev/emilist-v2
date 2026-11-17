"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReportFilterController } from "../../hooks/useReportFilters";
import { useReportDateTransition } from "../../hooks/useReportDateTransition";
import ReportDateRange from "../ReportDateRange/ReportDateRange";

const AnimatedReportDateRange = ({ filters }: { filters: ReportFilterController }) => {
  const animation = useReportDateTransition();
  return (
    <AnimatePresence initial={false}>
      {filters.range === "custom" && (
        <motion.div key="report-date-range" {...animation}>
          <ReportDateRange filters={filters} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedReportDateRange;
