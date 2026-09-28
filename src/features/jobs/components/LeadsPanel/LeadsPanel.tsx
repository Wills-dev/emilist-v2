"use client";

import { useMemo } from "react";

import Button from "@/components/atoms/Button/Button";
import ManageJobsTable from "../ManageJobsPanel/ManageJobsTable/ManageJobsTable";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { useGetJobLeads } from "../../hooks/useGetJobLeads";
import { mapJobLeadRow } from "../../helpers/jobLeads";
import { isJobLeadsSubscriptionError } from "../../api/fetchJobLeads";

import { leadsColumns } from "./leadsColumns";
import type { LeadsCategory } from "./LeadsCategoryToggle/LeadsCategoryToggle";
import Image from "next/image";

const LeadsPanel = ({
  category,
  search,
  onSubscribe,
  page,
  onPageChange,
}: {
  page: number;
  onPageChange: (page: number) => void;
  category: LeadsCategory;
  search: string;
  onSubscribe: () => void;
}) => {
  const query = useGetJobLeads({ page, enabled: category === "jobs" });
  const leads = useMemo(
    () =>
      (query.data?.jobs ?? [])
        .map(mapJobLeadRow)
        .filter((lead) =>
          lead.jobTitle.toLowerCase().includes(search.trim().toLowerCase()),
        ),
    [query.data?.jobs, search],
  );

  if (category === "jobs" && isJobLeadsSubscriptionError(query.error)) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center text-[#303632] bg-white">
        <div className="flex justify-center items-center w-32 h-32 mb-6 rounded-full bg-[#F0FDF5]">
          <Image
            src={"/assets/images/job-empty.svg"}
            width={130.75390625}
            height={130.75390625}
            className=""
            alt="job empty state"
          />
        </div>
        <h3 className="font-exo text-xl font-semibold">Subscribe to Emilist</h3>
        <p className="mt-2 max-w-90 w-full text-xs text-[#707471] leading-5">
          Access recommended jobs for your business with an active non-basic
          plan.
        </p>
        <Button
          variant="primary"
          className="mt-6 max-w-90 w-full h-8 rounded-none"
          onClick={onSubscribe}
        >
          Subscribe
        </Button>
      </div>
    );
  }

  if (category === "experts") {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center text-[#303632]">
        <p className="text-sm text-[#707471]">Expert leads are coming soon.</p>
      </div>
    );
  }

  const loading = query.isPending || query.isPlaceholderData;
  return (
    <div>
      {search.trim() && (
        <p className="px-5 pt-4 text-xs text-[#707471]">
          Searching leads on this page.
        </p>
      )}
      <ManageJobsTable
        data={leads}
        columns={leadsColumns}
        isLoading={loading}
        isError={query.isError}
        page={page}
        onPrev={() => onPageChange(Math.max(1, page - 1))}
        onNext={() => onPageChange(page + 1)}
        onPageChange={onPageChange}
        emptyTitle={
          search.trim() ? "No matching leads on this page" : "No job leads yet"
        }
        emptyDescription={
          search.trim()
            ? "Try another search or check another page."
            : "Recommended jobs for your business will appear here."
        }
      />
      {query.isError && (
        <button
          type="button"
          onClick={() => void query.refetch()}
          className="m-5 text-sm text-[#18A154] underline"
        >
          Try again
        </button>
      )}
      {!loading && !query.isError && (query.data?.totalPages ?? 0) > 1 && (
        <div className="px-5 pb-4">
          <PaginationPanel
            page={page}
            totalPages={query.data?.totalPages}
            onPrev={() => onPageChange(Math.max(1, page - 1))}
            onNext={() => onPageChange(page + 1)}
            onPageChange={onPageChange}
            variant="centered"
          />
        </div>
      )}
    </div>
  );
};

export default LeadsPanel;
