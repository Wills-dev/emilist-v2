import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import type { SupportTicket } from "../../types";
import { supportDate, supportLabel, ticketHref } from "../../helpers/supportOptions";
import TicketPriority from "./TicketPriority";
import TicketWorkflowBadge from "./TicketWorkflowBadge";
import TicketStatusBadge from "./TicketStatusBadge";

export const ticketColumns: ColumnDef<SupportTicket>[] = [
  { accessorKey: "createdAt", header: "Created", cell: ({ row }) => <span className="whitespace-nowrap text-[#7B859D]">{supportDate(row.original.createdAt)}</span> },
  { accessorKey: "ticketCode", header: "Ticket ID", cell: ({ row }) => <span className="block max-w-44 truncate text-[#7B859D]" title={row.original.ticketCode}>{row.original.ticketCode}</span> },
  { accessorKey: "subject", header: "Subject", cell: ({ row }) => <span className="block max-w-64 truncate font-medium text-[#172033]" title={row.original.subject}>{row.original.subject}</span> },
  { accessorKey: "category", header: "Category", cell: ({ row }) => <span className="text-[#7B859D]">{supportLabel(row.original.category)}</span> },
  { accessorKey: "priority", header: "Priority", cell: ({ row }) => <TicketPriority priority={row.original.priority} /> },
  { accessorKey: "status", header: "Workflow", cell: ({ row }) => <TicketWorkflowBadge status={row.original.status} /> },
  { accessorKey: "displayStatus", header: "Status", cell: ({ row }) => <TicketStatusBadge status={row.original.displayStatus} /> },
  { id: "view", header: "", cell: ({ row }) => <Link href={ticketHref(row.original.id)} className="text-[#6667FF] hover:underline">View<span className="sr-only"> {row.original.ticketCode}</span></Link> },
];
