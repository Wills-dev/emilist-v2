"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

import StatusBadge from "@/components/atoms/StatusBadge/StatusBadge";
import { routes } from "@/lib/helpers/routes";
import type { ActiveJobRow } from "../../types/manageJobs";

export const activeJobsColumns: ColumnDef<ActiveJobRow>[] = [
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "jobId", header: "Job ID", cell: ({ row }) => <span className="text-[#8A8D8B]">{row.original.jobId}</span> },
  { accessorKey: "jobTitle", header: "Job Title", cell: ({ row }) => <span className="font-medium text-[#101828]">{row.original.jobTitle}</span> },
  { accessorKey: "budget", header: "Budget" },
  { accessorKey: "progress", header: "Job Progress" },
  { id: "status", header: "Job Status", cell: () => <StatusBadge label="Active" tone="success" /> },
  {
    id: "pause",
    header: "",
    cell: () => (
      <button
        type="button"
        onClick={() => toast.info("Pause Job is coming soon.")}
        className="text-sm font-medium text-[#6667FF]"
      >
        Pause Job
      </button>
    ),
  },
  {
    id: "view",
    header: "",
    cell: ({ row }) => (
      <Link href={routes.dashboardLinks.marketplaceJobInfo(row.original.id)} className="text-sm text-[#737774]">
        View
      </Link>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <button type="button" aria-label="More actions" className="text-[#8A8D8B]">
        <MoreVertical className="size-4" />
      </button>
    ),
  },
];
