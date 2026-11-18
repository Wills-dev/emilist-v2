export const supportCategories = ["account", "job", "payment", "financial", "dispute", "technical", "moderation", "operations", "marketplace", "report", "other"];
export const supportPriorities = ["low", "normal", "medium", "high", "critical", "urgent"];
export const supportStatuses = ["open", "in_progress", "pending_customer", "pending_resolution", "resolved"];
export const linkedTypes = ["job", "customer", "listing", "payment", "order"];
export const supportLabel = (value: string) => value.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
export const supportDate = (value: string) => value && Number.isFinite(new Date(value).getTime()) ? new Date(value).toLocaleString("en-GB") : "—";
export const ticketHref = (id: string) => `/dashboard/support/${encodeURIComponent(id)}`;
export const ticketTone = (status: string) => status === "resolved" ? "success" as const : status === "overdue" ? "danger" as const : "warning" as const;
export const validateSupportFiles = (files: File[]) => {
  if (files.length > 10) throw new Error("Attach up to 10 images.");
  if (files.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) throw new Error("Use JPG, PNG, or WEBP images.");
  if (files.some((file) => file.size > 10 * 1024 * 1024)) throw new Error("Each image must be 10 MB or smaller.");
};
