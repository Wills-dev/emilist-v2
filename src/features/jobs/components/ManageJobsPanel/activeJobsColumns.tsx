"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import JobActionsMenu from "../JobActionsMenu/JobActionsMenu";
import { toast } from "sonner";

import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { routes } from "@/lib/helpers/routes";
import type { ActiveJobRow } from "../../types/manageJobs";

export const activeJobsColumns: ColumnDef<ActiveJobRow>[] = [
  { accessorKey: "startDate", header: "Start Date" },
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
      <Link
        href={routes.dashboardLinks.jobInfo(row.original.id, "active")}
        className="font-medium text-[#101828] hover:text-[#6667FF] hover:underline"
      >
        {row.original.jobTitle}
      </Link>
    ),
  },
  { accessorKey: "budget", header: "Budget" },
  { accessorKey: "progress", header: "Job Progress" },
  {
    id: "status",
    header: "Job Status",
    cell: () => <StatusBadge label="Active" tone="success" />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <JobActionsMenu
        jobTitle={row.original.jobTitle}
        viewHref={routes.dashboardLinks.jobInfo(row.original.id, "active")}
        actions={[
          {
            label: "Pause Job",
            onSelect: () => toast.info("Pause Job is coming soon."),
          },
        ]}
      />
    ),
  },
];
