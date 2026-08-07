import InsightEmptyState from "@/components/atoms/icons/InsightEmptyState";

import ReportCard from "../ReportCard/ReportCard";

const EmptyReportCard = ({ title }: { title: string }) => (
  <ReportCard
    title={title}
    subtitle="From 1-31 March, 2026"
    periodLabel="Last 30 days"
  >
    <div className="flex flex-col items-center gap-5 text-center">
      <InsightEmptyState />
      <strong className="font-exo text-sm text-[#474C48]">
        No records found
      </strong>
    </div>
  </ReportCard>
);

export default EmptyReportCard;
