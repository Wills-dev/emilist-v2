import Link from "next/link";
import { ArrowRight, CircleAlert } from "lucide-react";

import { NotificationData } from "../../types";

const formatRelativeTime = (createdAt: string) => {
  const elapsedMinutes = Math.max(
    1,
    Math.round((Date.now() - new Date(createdAt).getTime()) / 60_000),
  );

  if (elapsedMinutes < 60) return `${elapsedMinutes} mins ago`;

  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours} hrs ago`;

  const elapsedDays = Math.round(elapsedHours / 24);
  return `${elapsedDays} days ago`;
};

const NotificationItem = ({
  notification,
  onAction,
}: {
  notification: NotificationData;
  onAction: () => void;
}) => (
  <article className="rounded-lg bg-white p-3 text-[#667085]">
    <div className="flex items-start gap-3">
      <CircleAlert
        className="size-8 shrink-0 fill-[#F2F2F2] text-white"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1 sm:flex sm:items-stretch sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="font-exo text-sm font-semibold text-[#344054]">
            {notification.title}
          </h3>
          <p className="mt-1 text-xs leading-5">{notification.message}</p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4 text-xs sm:mt-0 sm:shrink-0 sm:flex-col sm:items-end">
          <time dateTime={notification.createdAt}>
            {formatRelativeTime(notification.createdAt)}
          </time>
          <Link
            href={notification.actionUrl}
            onClick={onAction}
            className="flex items-center gap-1 text-[#6667FF] underline underline-offset-2"
          >
            {notification.actionLabel} <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  </article>
);

export default NotificationItem;
