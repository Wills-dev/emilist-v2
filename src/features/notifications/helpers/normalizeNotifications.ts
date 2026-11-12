import type { NotificationData } from "../types";

export interface NotificationPage {
  notifications: NotificationData[];
  totalNotifications?: number;
  totalPages?: number;
  hasMore: boolean;
}

const record = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
const string = (value: unknown) => typeof value === "string" ? value : "";
const count = (value: unknown) => typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : undefined;

export const normalizeNotifications = (response: unknown, page: number, limit: number): NotificationPage => {
  const data = record(response).data ?? response;
  const metadata = record(data);
  const items = Array.isArray(data) ? data : metadata.notifications;
  if (!Array.isArray(items)) throw new Error("The notifications response did not include a valid list.");
  const notifications = items.map((value): NotificationData => {
    const item = record(value);
    const id = string(item._id) || string(item.id) || string(item.notificationId);
    if (!id) throw new Error("A notification is missing its ID.");
    const actionUrl = string(item.actionUrl) || string(item.link);
    return {
      id,
      title: string(item.title) || "Notification",
      message: string(item.message) || string(item.body) || string(item.description),
      createdAt: string(item.createdAt),
      isRead: typeof item.isRead === "boolean" ? item.isRead : typeof item.read === "boolean" ? item.read : undefined,
      actionLabel: string(item.actionLabel) || "View",
      // Notification actions use app routes; ignore unsupported destinations.
      actionUrl: actionUrl.startsWith("/") && !actionUrl.startsWith("//") && !actionUrl.includes("\\") ? actionUrl : "",
    };
  });
  const totalNotifications = count(metadata.totalNotifications) ?? count(metadata.total);
  const totalPages = count(metadata.totalPages) ?? (totalNotifications === undefined ? undefined : Math.ceil(totalNotifications / limit));
  return {
    notifications: [...new Map(notifications.map((item) => [item.id, item])).values()],
    totalNotifications,
    totalPages,
    hasMore: totalPages !== undefined ? page < totalPages : items.length === limit,
  };
};
