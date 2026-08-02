export interface NotificationData {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  actionLabel: string;
  actionUrl: string;
}

export type NotificationSortOrder = "latest" | "oldest";

