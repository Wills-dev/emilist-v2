import Link from "next/link";
import { ArrowRight } from "lucide-react";

import MonthYearSelector from "@/components/molecules/MonthYearSelector/MonthYearSelector";
import { routes } from "@/lib/helpers/routes";

const JobsPageHeader = ({
  month,
  year,
  onMonthChange,
  onYearChange,
}: {
  month: string;
  year: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <MonthYearSelector
      month={month}
      year={year}
      onMonthChange={onMonthChange}
      onYearChange={onYearChange}
    />

    <div className="flex flex-wrap items-center gap-5 text-xs">
      <Link
        href={routes.dashboardLinks.offerService}
        className="flex items-center gap-1 border-b border-[#303632] text-[#303632]"
      >
        Offer a service <ArrowRight className="size-3" />
      </Link>
      <Link
        href={routes.dashboardLinks.experts}
        className="flex items-center gap-1 border-b border-[#303632] text-[#303632]"
      >
        Hire experts directly <ArrowRight className="size-3" />
      </Link>
      <Link
        href={routes.postJob}
        className="flex items-center gap-1 border-b border-[#18A154] font-medium text-[#18A154]"
      >
        Post a job <ArrowRight className="size-3" />
      </Link>
    </div>
  </div>
);

export default JobsPageHeader;
