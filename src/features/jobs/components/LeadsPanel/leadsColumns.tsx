"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

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
    id: "apply",
    header: "",
    cell: ({ row }) => (
      <Link
        href={routes.dashboardLinks.marketplaceJobInfo(row.original.id)}
        className="text-sm font-medium text-[#6667FF]"
      >
        Apply Now
      </Link>
    ),
  },
  {
    id: "view",
    header: "",
    cell: ({ row }) => (
      <Link
        href={routes.dashboardLinks.marketplaceJobInfo(row.original.id)}
        className="text-sm text-[#737774]"
      >
        View
      </Link>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <button
        type="button"
        aria-label="More actions"
        className="text-[#8A8D8B]"
      >
        <MoreVertical className="size-4" />
      </button>
    ),
  },
];
