import type { ReportTarget } from "../../types/api";
import { formatReportCurrency } from "../../utils/currency";
import ReportCard from "../ReportCard/ReportCard";
import ReportLegendGrid from "../ReportLegendGrid/ReportLegendGrid";
const TargetsCard = ({ target, label, onEdit }: { target: ReportTarget; label: string; onEdit: () => void }) => (
  <ReportCard title="Targets" subtitle={label} periodLabel={target.duration === "yearly" ? "Annual" : "Monthly"} actionLabel={target.configured ? "Edit Targets" : "Set Targets"} onAction={onEdit}>
    <div className="w-full space-y-5">
      <p className="text-center text-sm text-[#667085]">{target.configured ? `${target.progress.overall.toLocaleString()}% Goal Completion` : "Set targets to track your progress"}</p>
      <ReportLegendGrid items={[
        { label: "Jobs done", value: `${target.actual.jobs.toLocaleString()} / ${target.goals.jobs.toLocaleString()}`, color: "#9EF769" },
        { label: "Amount Earned", value: `${formatReportCurrency(target.actual.amount, target.currency)} / ${formatReportCurrency(target.goals.amount, target.currency)}`, color: "#25C269" },
        { label: "Referrals", value: `${target.actual.referrals.toLocaleString()} / ${target.goals.referrals.toLocaleString()}`, color: "#B9BDBC" },
        { label: "Friends Invited", value: `${target.actual.invites.toLocaleString()} / ${target.goals.invites.toLocaleString()}`, color: "#FF5D7A" },
      ]} />
    </div>
  </ReportCard>
);
export default TargetsCard;
