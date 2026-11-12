export interface NotificationData {
  id: string;
  isRead?: boolean;
  title: string;
  message: string;
  createdAt: string;
  actionLabel: string;
  actionUrl: string;
}

export type NotificationSortOrder = "latest" | "oldest";

