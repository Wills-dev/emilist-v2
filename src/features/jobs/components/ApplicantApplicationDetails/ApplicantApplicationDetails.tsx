import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import type { JobApplicant } from "../../types/jobManagement";

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unavailable" : new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

export default function ApplicantApplicationDetails({ applicant }: { applicant: JobApplicant }) {
  return <div className="space-y-3 text-sm text-[#707471]">
    {applicant.status && <StatusBadge label={applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)} />}
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {applicant.appliedAt && <span>Applied: {formatDate(applicant.appliedAt)}</span>}
      {applicant.acceptedAt && <span>Accepted: {formatDate(applicant.acceptedAt)}</span>}
      {applicant.rejectedAt && <span>Rejected: {formatDate(applicant.rejectedAt)}</span>}
    </div>

  </div>;
}
