"use client";
import { useRef, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { createSupportTicket } from "../api";
import { supportKeys } from "../queries/supportKeys";
import { ticketHref } from "../helpers/supportOptions";
import { useSupportFiles } from "./useSupportFiles";

export const useTicketForm = () => {
  const router = useRouter();
  const client = useQueryClient();
  const uploads = useSupportFiles();
  const pending = useRef(false);
  const mutation = useMutation({ mutationFn: createSupportTicket, onSuccess: async (ticket) => { await client.invalidateQueries({ queryKey: supportKeys.all }); toast.success(`Ticket ${ticket.ticketCode} created.`); router.push(ticketHref(ticket.id)); }, onError: promiseErrorFunction, onSettled: () => { pending.current = false; } });
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); if (pending.current) return;
    const form = new FormData(event.currentTarget);
    const field = (key: string) => String(form.get(key) || "").trim();
    const subject = field("subject"), description = field("description"), linkedType = field("linkedType"), linkedRecordId = field("linkedRecordId");
    if (!subject || !description) { toast.error("Enter a subject and description."); return; }
    if (Boolean(linkedType) !== Boolean(linkedRecordId)) { toast.error("Select a record type and enter its ID, or leave both empty."); return; }
    pending.current = true;
    mutation.mutate({ subject, description, category: field("category"), priority: field("priority"), attachments: uploads.files, ...(linkedType ? { linkedType, linkedRecordId } : {}) });
  };
  return { submit, uploads, busy: mutation.isPending };
};
