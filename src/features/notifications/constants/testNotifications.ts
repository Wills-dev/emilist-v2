import { routes } from "@/lib/helpers/routes";
import { NotificationData } from "../types";

export const testNotifications: NotificationData[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `milestone-approval-${index + 1}`,
    title: "Notification title",
    message: `kennedy2323 sent a milestone approval request for Project ${index + 1}`,
    createdAt: new Date(Date.now() - (index + 1) * 23 * 60 * 1000).toISOString(),
    actionLabel: "Take action",
    actionUrl: routes.dashboardLinks.jobs,
  }),
);

export const emptyNotifications: NotificationData[] = [];

