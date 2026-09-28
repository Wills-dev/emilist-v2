"use client";

import { ColumnDef } from "@tanstack/react-table";
import JobActionsMenu from "../JobActionsMenu/JobActionsMenu";

import { routes } from "@/lib/helpers/routes";
import type { LeadJobRow } from "../../types/manageJobs";

export const leadsColumns: ColumnDef<LeadJobRow>[] = [
  { accessorKey: "posted", header: "Posted" },
  { accessorKey: "serviceCategory", header: "Service Category" },
  {
    accessorKey: "jobId",
    header: "Job ID",
    cell: ({ row }) => (
      <span className="text-[#8A8D8B]">{row.original.jobId}</span>
    ),
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => (
      <span className="font-medium text-[#101828]">
        {row.original.jobTitle}
      </span>
    ),
  },
  { accessorKey: "budget", header: "Budget" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "applicants", header: "Applicants" },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <JobActionsMenu
        jobTitle={row.original.jobTitle}
        viewHref={routes.dashboardLinks.marketplaceJobInfo(row.original.id)}
        actions={[
          {
            label: "Apply Now",
            href: routes.dashboardLinks.marketplaceJobInfo(row.original.id),
          },
        ]}
      />
    ),
  },
];
