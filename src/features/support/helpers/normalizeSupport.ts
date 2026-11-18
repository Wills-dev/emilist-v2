import { formatQueueTime } from "./formatQueueTime";
import type { SupportTicket, TicketAttachment, TicketMessage, TicketList } from "../types";
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
const text = (value: unknown) => typeof value === "string" ? value : "";
const id = (value: unknown) => typeof value === "string" ? value : text(object(value)._id) || text(object(value).requestId) || text(object(value).id);
export const supportPayload = (value: unknown) => object(value).data ?? value;
const attachments = (value: unknown): TicketAttachment[] => Array.isArray(value) ? value.flatMap((item) => {
  const entry = object(item);
  const url = text(item) || text(entry.url) || text(entry.fileUrl) || text(entry.imageUrl);
  return /^https?:\/\//i.test(url) ? [{ url, name: text(entry.originalName) || text(entry.name) || "Attachment" }] : [];
}) : [];
const message = (value: unknown, index: number): TicketMessage => {
  const entry = object(value);
  const sender = object(entry.sender ?? entry.senderId ?? entry.admin ?? entry.customer);
  const name = text(sender.fullName) || [text(sender.firstName), text(sender.lastName)].filter(Boolean).join(" ") || text(sender.name) || text(entry.senderType) || text(entry.senderRole) || "Support conversation";
  return { id: id(entry) || `message-${index}`, message: text(entry.message) || text(entry.content), sender: name, senderRole: text(entry.senderRole) || text(entry.senderType) || text(sender.role), createdAt: text(entry.createdAt), attachments: attachments(entry.attachments) };
};
export const normalizeTicket = (value: unknown): SupportTicket => {
  const outer = object(value);
  const entry = object(outer.request ?? outer.ticket ?? value);
  const ticketId = id(entry);
  if (!ticketId) throw new Error("The support response did not include a request ID.");
  const messages = entry.messages ?? outer.messages;
  const status = text(entry.status);
  const queueTime = formatQueueTime(entry);
  return { id: ticketId, ticketCode: text(entry.ticketCode) || text(entry.code) || ticketId, subject: text(entry.subject) || "Support request", description: text(entry.description), category: text(entry.category), priority: text(entry.priority), status,
    displayStatus: text(entry.displayStatus) || (status === "resolved" ? "resolved" : entry.isOverdue === true ? "overdue" : "pending"), createdAt: text(entry.createdAt), resolution: text(entry.resolution) || text(object(entry.resolution).message) || text(object(entry.resolution).content),
    messages: Array.isArray(messages) ? messages.map(message) : [], attachments: attachments(entry.attachments), linkedType: text(entry.linkedType), linkedRecordId: id(entry.linkedRecordId), jobId: id(entry.jobId), milestoneId: id(entry.milestoneId), invoiceId: id(entry.invoiceId), queueTime: queueTime.value, queueTimeLabel: queueTime.label, };
};
export const normalizeTicketList = (value: unknown): TicketList => {
  const payload = object(supportPayload(value));
  if (!Array.isArray(payload.requests)) throw new Error("The support response did not include a ticket list.");
  const pagination = object(payload.pagination);
  return { requests: payload.requests.map(normalizeTicket), page: Number(pagination.page) || 1, pages: Math.max(0, Number(pagination.pages) || 0), total: Math.max(0, Number(pagination.total) || 0) };
};
