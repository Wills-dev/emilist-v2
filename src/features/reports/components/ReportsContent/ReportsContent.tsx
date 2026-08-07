import { motion } from "framer-motion";

import { chartReports } from "../../constants/dummyReports";
import { ReportTargets, ReportTab } from "../../types";
import ChartReportCard from "../ChartReportCard/ChartReportCard";
import EmptyReportCard from "../EmptyReportCard/EmptyReportCard";
import TargetsCard from "../TargetsCard/TargetsCard";

const ReportsContent = ({
  tab,
  search,
  targets,
  hasData,
  onEditTargets,
}: {
  tab: ReportTab;
  search: string;
  targets: ReportTargets;
  hasData: boolean;
  onEditTargets: () => void;
}) => {
  if (!hasData) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <EmptyReportCard title="Job Summary" />
        <EmptyReportCard title="Application Summary" />
      </div>
    );
  }

  const query = search.trim().toLowerCase();
  const reports = chartReports.filter(
    (report) =>
      report.tab === tab && report.title.toLowerCase().includes(query),
  );

  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="grid gap-4 lg:grid-cols-2"
    >
      {reports.map((report) => (
        <ChartReportCard key={report.id} report={report} />
      ))}
      {tab === "insights" && "targets".includes(query) && (
        <TargetsCard targets={targets} onEdit={onEditTargets} />
      )}
      {!reports.length &&
        !(tab === "insights" && "targets".includes(query)) && (
          <div className="bg-white p-12 text-center text-sm text-[#737774] lg:col-span-2">
            No reports match “{search}”.
          </div>
        )}
    </motion.div>
  );
};

export default ReportsContent;
