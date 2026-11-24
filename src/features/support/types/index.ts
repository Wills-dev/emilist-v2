export type TicketStatus = "open" | "in_progress" | "pending_customer" | "pending_resolution" | "resolved";
export interface TicketAttachment { url: string; name: string; }
export interface TicketMessage { id: string; message: string; sender: string; senderRole?: string; createdAt: string; attachments: TicketAttachment[]; }
export interface SupportTicket {
  id: string; ticketCode: string; subject: string; description: string; category: string;
  priority: string; status: string; displayStatus: string; createdAt: string; resolution: string;
  messages: TicketMessage[]; attachments: TicketAttachment[]; linkedType: string; linkedRecordId: string;
  jobId: string; milestoneId: string; invoiceId: string; queueTime: string; queueTimeLabel?: string;
}
export interface TicketListQuery { page: number; limit: number; status?: string; category?: string; }
export interface TicketList { requests: SupportTicket[]; page: number; pages: number; total: number; }
export interface CreateTicketPayload { subject: string; description: string; category: string; priority: string; linkedType?: string; linkedRecordId?: string; attachments?: File[]; }
export type DisputeType = "owner_unsatisfied_work" | "owner_additional_cost_reason" | "artisan_additional_cost_unpaid" | "artisan_invoice_unpaid_overdue";
export interface DisputePayload { jobId: string; milestoneId: string; invoiceId?: string; disputeType: DisputeType; subject?: string; reason: string; attachments: File[]; }
