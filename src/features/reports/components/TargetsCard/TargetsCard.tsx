import { ReportTargets } from "../../types";
import ReportCard from "../ReportCard/ReportCard";
import ReportLegendGrid from "../ReportLegendGrid/ReportLegendGrid";

const TargetsCard = ({
  targets,
  onEdit,
}: {
  targets: ReportTargets;
  onEdit: () => void;
}) => (
  <ReportCard
    title="Targets"
    subtitle="18% Goal Completion"
    periodLabel="2026"
    actionLabel="Edit Targets"
    onAction={onEdit}
  >
    <ReportLegendGrid
      items={[
        { label: "Jobs done", value: targets.jobsDone, color: "#9EF769" },
        {
          label: "Amount Earned",
          value: `₦ ${Number(targets.amountEarned || 0).toLocaleString()}`,
          color: "#25C269",
        },
        {
          label: "Referrals",
          value: targets.referralsMade,
          color: "#B9BDBC",
        },
        {
          label: "Friends Invited",
          value: targets.friendsInvited,
          color: "#FF5D7A",
        },
      ]}
    />
  </ReportCard>
);

export default TargetsCard;
