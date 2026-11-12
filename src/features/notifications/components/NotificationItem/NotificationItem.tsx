import Link from "next/link";
import { ArrowRight, CheckCheck, CircleAlert, Trash2 } from "lucide-react";
import type { NotificationData } from "../../types";

const formatRelativeTime = (createdAt: string) => {
  const time = new Date(createdAt).getTime();
  if (!Number.isFinite(time)) return "";
  const elapsedMinutes = Math.max(1, Math.round((Date.now() - time) / 60_000));
  if (elapsedMinutes < 60) return `${elapsedMinutes} min ago`;
  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours} hr ago`;
  return `${Math.round(elapsedHours / 24)} days ago`;
};

const NotificationItem = ({ notification, onAction, onMarkRead, onDelete, disabled = false }: {
  notification: NotificationData;
  onAction: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
  disabled?: boolean;
}) => {
  const relativeTime = formatRelativeTime(notification.createdAt);
  return (
    <article className={`rounded-lg border bg-white p-3 text-[#667085] ${notification.isRead === false ? "border-[#CDEDD9]" : "border-transparent"}`}>
      <div className="flex items-start gap-3">
        <CircleAlert className="size-8 shrink-0 fill-[#F2F2F2] text-white" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-exo text-sm font-semibold text-[#344054] wrap-anywhere">{notification.title}</h3>
            {notification.isRead === false && <span className="mt-1 size-2 shrink-0 rounded-full bg-[#18A154]" aria-label="Unread" />}
          </div>
          <p className="mt-1 text-xs leading-5 wrap-anywhere">{notification.message}</p>
          {relativeTime && <time dateTime={notification.createdAt} className="mt-2 block text-xs text-[#8A8D8B]">{relativeTime}</time>}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            {notification.actionUrl && <Link href={notification.actionUrl} onClick={onAction} className="flex items-center gap-1 text-[#6667FF] underline underline-offset-2">{notification.actionLabel}<ArrowRight className="size-3" /></Link>}
            {notification.isRead !== true && <button type="button" disabled={disabled} onClick={onMarkRead} className="inline-flex items-center gap-1 text-[#18A154] disabled:opacity-40"><CheckCheck className="size-3.5" />Mark as read</button>}
            <button type="button" disabled={disabled} onClick={onDelete} aria-label={`Delete notification: ${notification.title}`} className="ml-auto inline-flex items-center gap-1 text-[#737774] hover:text-[#E84F6A] disabled:opacity-40"><Trash2 className="size-3.5" />Delete</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NotificationItem;
