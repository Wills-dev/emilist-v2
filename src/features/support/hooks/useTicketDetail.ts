"use client";
import { useEffect, useRef, useState, type MouseEvent, type SubmitEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { jobKeys } from "@/features/jobs/queries/jobKeys";
import { fetchSupportTicket, replyToSupportTicket } from "../api";
import { supportKeys } from "../queries/supportKeys";
import { useSupportFiles } from "./useSupportFiles";

export const useTicketDetail = (requestId: string) => {
  const userId = useStore((state) => state.currentUser?._id);
  const client = useQueryClient();
  const uploads = useSupportFiles();
  const pending = useRef(false);
  const [image, setImage] = useState("");
  const query = useQuery({ queryKey: supportKeys.detail(userId, requestId), queryFn: ({ signal }) => fetchSupportTicket(requestId, signal), enabled: Boolean(userId && requestId), refetchInterval: 15_000, retry: 1 });
  const mutation = useMutation({ mutationFn: replyToSupportTicket, onSuccess: async () => { uploads.clear(); toast.success("Reply sent."); await client.invalidateQueries({ queryKey: supportKeys.all }); }, onError: promiseErrorFunction, onSettled: () => { pending.current = false; } });
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current || !query.data || query.data.status === "resolved") return;
    const form = event.currentTarget;
    const message = String(new FormData(form).get("message") || "").trim();
    if (!message) { toast.error("Enter a reply."); return; }
    pending.current = true;
    mutation.mutate({ requestId, message, attachments: uploads.files }, { onSuccess: () => form.reset() });
  };
  // Refreshed ticket resolutions may change the job's dispute and closure state.
  const resolvedJob = query.data?.status === "resolved" ? query.data.jobId || (query.data.linkedType === "job" ? query.data.linkedRecordId : "") : "";
  const resolutionRef = useRef("");
  useEffect(() => {
    if (!resolvedJob || resolutionRef.current === resolvedJob) return;
    resolutionRef.current = resolvedJob;
    void client.invalidateQueries({ queryKey: jobKeys.all });
  }, [resolvedJob, client]);
  const refresh = async () => {
    const result = await query.refetch();
    if (result.data?.status === "resolved") await client.invalidateQueries({ queryKey: jobKeys.all });
  };
  const openImage = (event: MouseEvent<HTMLButtonElement>) => setImage(event.currentTarget.dataset.url || "");
  const closeImage = () => setImage("");
  return { query, uploads, submit, busy: mutation.isPending, refresh, image, openImage, closeImage };
};
