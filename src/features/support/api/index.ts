import { axiosInstance } from "@/lib/axiosInstance";
import { normalizeTicket, normalizeTicketList, supportPayload } from "../helpers/normalizeSupport";
import { validateSupportFiles } from "../helpers/supportOptions";
import type { CreateTicketPayload, DisputePayload, TicketListQuery } from "../types";

export const fetchSupportTickets = async (params: TicketListQuery, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get("/support/requests", { params, signal });
  return normalizeTicketList(data);
};
export const fetchSupportTicket = async (requestId: string, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get(`/support/requests/${encodeURIComponent(requestId)}`, { signal });
  const ticket = normalizeTicket(supportPayload(data));
  if (ticket.id !== requestId) throw new Error("The response does not match this ticket.");
  return ticket;
};
export const createSupportTicket = async (payload: CreateTicketPayload) => {
  const { data } = await axiosInstance.post("/support/requests", payload);
  return normalizeTicket(supportPayload(data));
};
export const replyToSupportTicket = async ({ requestId, message, attachments }: { requestId: string; message: string; attachments: File[] }) => {
  validateSupportFiles(attachments);
  const body = new FormData();
  body.append("message", message.trim());
  attachments.forEach((file) => body.append("attachments", file));
  return axiosInstance.post(`/support/requests/${encodeURIComponent(requestId)}/replies`, body);
};
export const createInvoiceDispute = async (payload: DisputePayload) => {
  validateSupportFiles(payload.attachments);
  const body = new FormData();
  body.append("jobId", payload.jobId); body.append("milestoneId", payload.milestoneId);
  body.append("disputeType", payload.disputeType); body.append("reason", payload.reason.trim());
  if (payload.invoiceId) body.append("invoiceId", payload.invoiceId);
  if (payload.subject?.trim()) body.append("subject", payload.subject.trim());
  payload.attachments.forEach((file) => body.append("attachments", file));
  const { data } = await axiosInstance.post("/support/job-invoice-disputes", body);
  return normalizeTicket(supportPayload(data));
};
