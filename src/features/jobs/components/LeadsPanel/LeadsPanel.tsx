"use client";

import { useMemo } from "react";

import Button from "@/components/atoms/Button/Button";
import DataTable from "@/components/organisms/DataTable/DataTable";

import { dummyLeadJobs } from "../../constants/manageJobsDummy";
import { leadsColumns } from "./leadsColumns";
import type { LeadsCategory } from "./LeadsCategoryToggle";
import Image from "next/image";

// The user model has no subscription/pro flag yet, so the upsell always shows
// until that data exists — this isn't a togglable UI state.
const HAS_PRO = false;

const LeadsPanel = ({
  category,
  search,
  onSubscribe,
}: {
  category: LeadsCategory;
  search: string;
  onSubscribe: () => void;
}) => {
  const leads = useMemo(
    () =>
      dummyLeadJobs.filter((lead) =>
        lead.jobTitle.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  if (!HAS_PRO) {
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
          Access recommended jobs and leads tailored for you on Plus+
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

  return (
    <div className="overflow-x-auto py-4">
      <DataTable data={leads} columns={leadsColumns} />
    </div>
  );
};

export default LeadsPanel;
