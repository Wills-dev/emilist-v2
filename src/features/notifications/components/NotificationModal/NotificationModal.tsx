"use client";

import { useMemo, useState } from "react";
import { Bell, X } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import NotificationEmpty from "@/components/atoms/icons/NotificationEmpty/NotificationEmpty";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog/dialog";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useNotifications } from "../../hooks/useNotifications";
import { useNotificationActions } from "../../hooks/useNotificationActions";
import type { NotificationSortOrder } from "../../types";
import NotificationItem from "../NotificationItem/NotificationItem";

const PAGE_LIMIT = 10;

const NotificationModal = ({ open, onClose }: { open: boolean; onClose: (open: boolean) => void }) => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<NotificationSortOrder>("latest");
  const query = useNotifications(page, PAGE_LIMIT, open);
  const actions = useNotificationActions();
  const sortedNotifications = useMemo(() => [...(query.data?.notifications ?? [])].sort((first, second) => {
    const difference = (Date.parse(second.createdAt) || 0) - (Date.parse(first.createdAt) || 0);
    return sortOrder === "latest" ? difference : -difference;
  }), [query.data?.notifications, sortOrder]);
  const count = query.data?.totalNotifications;
  const listCount = sortedNotifications.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden rounded-xl p-0 sm:max-w-xl">
        <header className="flex shrink-0 items-center border-b border-[#ECECEC] px-6 py-5">
          <span className="mr-2 grid size-7 place-items-center rounded-md bg-[#F8F8F8] text-[#737774]"><Bell className="size-4 fill-current" /></span>
          <DialogTitle className="font-exo text-lg font-bold text-[#474C48]">Notifications</DialogTitle>
          {count !== undefined && !query.isError && <span className="ml-2 rounded-md bg-[#FFF0F2] px-2 py-1 text-xs text-[#FF5D7A]">{count.toLocaleString()}</span>}
          <button type="button" onClick={() => onClose(false)} aria-label="Close notifications" className="ml-auto text-[#737774] hover:text-[#303632]"><X className="size-5" /></button>
          <DialogDescription className="sr-only">Review and manage your dashboard notifications.</DialogDescription>
        </header>
        {!query.isPending && !query.isError && listCount > 0 && (
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm text-[#667085]">
            <p>{listCount.toLocaleString()} on this page</p>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as NotificationSortOrder)} aria-label="Sort notifications on this page" className="h-10 rounded-xl bg-[#F8F8F8] px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#18A154]">
              <option value="latest">Newest on page</option><option value="oldest">Oldest on page</option>
            </select>
          </div>
        )}
        {query.isPending ? (
          <div role="status" aria-label="Loading notifications" className="min-h-0 space-y-3 overflow-y-auto p-6">
            {[0, 1, 2].map((item) => <div key={item} aria-hidden="true" className="space-y-2 rounded-lg bg-[#F4F7F5] p-4"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-24" /></div>)}
          </div>
        ) : query.isError ? (
          <div role="alert" className="space-y-3 p-6 text-sm text-[#737774]"><p>Unable to load notifications.</p><button type="button" onClick={() => void query.refetch()} className="text-[#18A154] underline">Retry</button></div>
        ) : listCount === 0 ? (
          <div className="grid min-h-48 place-items-center gap-3 overflow-y-auto p-6"><NotificationEmpty /><p className="text-sm text-[#737774]">{page > 1 ? "No notifications on this page." : "You’re all caught up."}</p></div>
        ) : (
          <div className="mx-6 min-h-0 max-h-96 space-y-2 overflow-y-auto overscroll-contain rounded-lg bg-[#F4F7F5] p-2" aria-busy={actions.isPending}>
            {sortedNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} disabled={actions.isPending}
                onMarkRead={() => { if (!actions.isPending) actions.markRead.mutate(notification.id); }}
                onDelete={() => { if (!actions.isPending) actions.remove.mutate(notification.id, { onSuccess: () => { if (listCount === 1 && page > 1) setPage(page - 1); } }); }}
                onAction={() => { if (notification.isRead !== true && !actions.isPending) actions.markRead.mutate(notification.id); onClose(false); }}
              />
            ))}
          </div>
        )}
        {!query.isPending && !query.isError && (page > 1 || query.data?.hasMore) && (
          <div className="shrink-0 px-6 pt-4"><PaginationPanel variant="inline" page={page} totalPages={query.data?.totalPages} hasMore={query.data?.hasMore} onPrev={() => { if (!actions.isPending) setPage((current) => Math.max(1, current - 1)); }} onNext={() => { if (!actions.isPending && query.data?.hasMore) setPage((current) => current + 1); }} /></div>
        )}
        <footer className="shrink-0 px-6 py-5"><Button variant="default" className="h-11 w-full" onClick={() => onClose(false)}>Close</Button></footer>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
