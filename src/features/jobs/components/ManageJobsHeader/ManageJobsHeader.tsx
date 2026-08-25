import { Mic, MoreVertical, Search } from "lucide-react";

import SegmentedTabs, {
  SegmentedTabOption,
} from "@/components/molecules/SegmentedTabs/SegmentedTabs";
import type { ManageJobsTab } from "../../types/manageJobs";

const tabOptions: SegmentedTabOption<ManageJobsTab>[] = [
  { value: "listed", label: "Listed jobs" },
  { value: "overdue", label: "Overdue jobs" },
  { value: "paused", label: "Paused jobs" },
  { value: "active", label: "Active jobs" },
  { value: "completed", label: "Completed jobs" },
  { value: "leads", label: "Leads", badge: "PRO" },
];

const ManageJobsHeader = ({
  tab,
  search,
  onTabChange,
  onSearchChange,
}: {
  tab: ManageJobsTab;
  search: string;
  onTabChange: (tab: ManageJobsTab) => void;
  onSearchChange: (search: string) => void;
}) => (
  <section className={tab === "leads" ? "" : "bg-white"}>
    {tab === "leads" ? (
      <div className="flex items-start justify-between gap-3 px-5 py-5 border-b border-[#EAEEEB] text-white">
        <div>
          <h2 className="font-exo text-xl font-semibold">Manage Leads</h2>
          <p className="mt-1 text-xs text-[#DDF7E8] sm:text-sm">
            Get recommended job opportunities tailored for you
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
          Pro users only
        </span>
      </div>
    ) : (
      <div className="flex items-start justify-between border-b border-[#EAEEEB] px-5 py-5">
        <div>
          <h2 className="font-exo text-xl font-semibold text-[#101828]">
            Manage Jobs
          </h2>
          <p className="mt-1 text-xs text-[#667085] sm:text-sm">
            View and manage all jobs you&apos;ve interacted with on Emilist
          </p>
        </div>
        <button
          type="button"
          aria-label="More job options"
          className="rounded-lg border border-[#E8EBE9] p-2 text-[#737774]"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>
    )}

    <div
      className={`flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center border-b border-[#EAEEEB] sm:justify-between ${tab === "leads" ? "bg-linear-to-b from-[#0F6B4B] to-[#215342]" : ""}`}
    >
      <SegmentedTabs
        options={tabOptions}
        value={tab}
        onChange={onTabChange}
        ariaLabel="Manage jobs tabs"
        responsive
        size="compact"
      />

      <label className="flex h-9 w-full items-center gap-2 rounded-full bg-[#F6F7F9] px-4 sm:max-w-64">
        <Search className="size-4 text-[#737774]" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <Mic className="size-4 shrink-0 text-[#737774]" />
      </label>
    </div>
  </section>
);

export default ManageJobsHeader;
