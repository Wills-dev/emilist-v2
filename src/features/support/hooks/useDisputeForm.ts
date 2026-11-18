"use client";
import { useRef, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { jobKeys } from "@/features/jobs/queries/jobKeys";
import type { JobInvoice } from "@/features/jobs/types/jobManagement";
import { createInvoiceDispute } from "../api";
import { supportKeys } from "../queries/supportKeys";
import { ticketHref } from "../helpers/supportOptions";
import { disputeOptions } from "../helpers/disputeOptions";
import type { DisputeType } from "../types";
import { useSupportFiles } from "./useSupportFiles";

export interface DisputeFormProps { jobId: string; invoice: JobInvoice; isOwner: boolean; onClose: () => void; }
export const useDisputeForm = ({ jobId, invoice, isOwner, onClose }: DisputeFormProps) => {
  const router = useRouter(); const client = useQueryClient(); const uploads = useSupportFiles();
  const unresolved = invoice.hasUnresolvedDispute === true || Boolean(invoice.disputeStatus && invoice.disputeStatus !== "resolved");
  const blockedMessage = unresolved ? "This invoice already has an unresolved dispute. Continue the conversation in Support." : invoice.status === "pending" ? "A payment is processing for this invoice. Wait for confirmation before raising a dispute." : "";
  const options = blockedMessage ? [] : disputeOptions(invoice, isOwner);
  const pending = useRef(false);
  const mutation = useMutation({ mutationFn: createInvoiceDispute, onSuccess: async (ticket) => { await Promise.all([client.invalidateQueries({ queryKey: supportKeys.all }), client.invalidateQueries({ queryKey: jobKeys.all })]); onClose(); toast.success(`Dispute ${ticket.ticketCode} created.`); router.push(ticketHref(ticket.id)); }, onError: promiseErrorFunction, onSettled: () => { pending.current = false; } });
  const cancel = () => { if (!pending.current) onClose(); };
  const changeOpen = (open: boolean) => { if (!open) cancel(); };
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); if (pending.current) return;
    const form = new FormData(event.currentTarget);
    const disputeType = String(form.get("disputeType") || "") as DisputeType;
    const reason = String(form.get("reason") || "").trim();
    if (!jobId || !invoice.milestoneId || !options.some((option) => option.value === disputeType) || !reason) { toast.error("Select an available dispute reason and describe the issue."); return; }
    pending.current = true;
    mutation.mutate({ jobId, milestoneId: invoice.milestoneId, invoiceId: invoice.invoiceId || undefined, disputeType, reason, subject: String(form.get("subject") || "").trim() || undefined, attachments: uploads.files });
  };
  return { blockedMessage, existingHref: unresolved && invoice.disputeTicketId ? ticketHref(invoice.disputeTicketId) : "", options, uploads, busy: mutation.isPending, cancel, changeOpen, submit };
};
