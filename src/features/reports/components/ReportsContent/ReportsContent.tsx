import { motion } from "framer-motion";
import type { ReportsController } from "../../hooks/useReports";
import ChartReportCard from "../ChartReportCard/ChartReportCard";
import TargetsCard from "../TargetsCard/TargetsCard";
import ReportsSkeleton from "../ReportsSkeleton/ReportsSkeleton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
const ReportsContent = ({ controller }: { controller: ReportsController }) => {
  if (controller.query.isPending) return <ReportsSkeleton />;
  if (controller.query.isError) return <EmptyState title="Unable to load reports" description="Please try again." actionLabel="Try again" onAction={controller.retry} />;
  return <>
    <motion.div key={controller.tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="grid gap-4 lg:grid-cols-2">
      {controller.cards.map((report) => <ChartReportCard key={report.id} report={report} period={controller.filters.periodLabel} currency={controller.filters.currency} onPeriodChange={controller.filters.changePeriod} onCurrencyChange={controller.filters.changeCurrency} />)}
      {controller.visibleTab === "insights" && <TargetsCard target={controller.query.data.insights.targets} label={controller.query.data.filters.label} onEdit={controller.editTargets} />}
      {!controller.visibleTab && <p className="bg-white p-12 text-center text-sm text-[#737774] lg:col-span-2">No report types match “{controller.search}”.</p>}
    </motion.div>
    {controller.visibleTab === "insights" && controller.query.data.insights.trackingNote && <p className="text-xs text-[#737774]">{controller.query.data.insights.trackingNote}</p>}
  </>;
};
export default ReportsContent;
