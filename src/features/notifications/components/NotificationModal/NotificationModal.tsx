"use client";

import { useMemo, useState } from "react";
import { Bell, ChevronDown, X } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import NotificationEmpty from "@/components/atoms/icons/NotificationEmpty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { NotificationData, NotificationSortOrder } from "../../types";
import NotificationItem from "../NotificationItem/NotificationItem";

const NotificationModal = ({
  open,
  onClose,
  initialNotifications,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  initialNotifications: NotificationData[];
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [sortOrder, setSortOrder] = useState<NotificationSortOrder>("latest");
  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort((first, second) => {
        const difference =
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime();
        return sortOrder === "latest" ? difference : -difference;
      }),
    [notifications, sortOrder],
  );
  const count = notifications.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl p-0 sm:max-w-xl"
      >
        <header className="flex items-center border-b border-[#ECECEC] px-6 py-5">
          <span className="mr-2 grid size-7 place-items-center rounded-md bg-[#F8F8F8] text-[#737774]">
            <Bell className="size-4 fill-current" />
          </span>
          <DialogTitle className="font-exo text-lg font-bold text-[#474C48]">
            Notifications
          </DialogTitle>
          <span className="ml-2 rounded-md bg-[#FFF0F2] px-2 py-1 text-xs text-[#FF5D7A]">
            {count}
          </span>
          <button
            type="button"
            onClick={() => onClose(false)}
            aria-label="Close notifications"
            className="ml-auto text-[#737774] transition-colors hover:text-[#303632]"
          >
            <X className="size-5" />
          </button>
          <DialogDescription className="sr-only">
            Review and manage your dashboard notifications.
          </DialogDescription>
        </header>

        <div className="flex items-center justify-between gap-4 px-6 py-4 text-sm text-[#667085]">
          <p>
            <span className="sm:hidden">{count} new notifications</span>
            <span className="hidden sm:inline">
              You have {count} new notifications to attend to
            </span>
          </p>
          <div className="relative shrink-0">
            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as NotificationSortOrder)
              }
              aria-label="Sort notifications"
              className="h-10 appearance-none rounded-xl border-0 bg-[#F8F8F8] py-2 pl-3 pr-9 text-xs text-[#737774] outline-none focus-visible:ring-2 focus-visible:ring-[#18A154]"
            >
              <option value="latest">Showing latest</option>
              <option value="oldest">Showing oldest</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#303632]" />
          </div>
        </div>

        {count === 0 ? (
          <div className="grid min-h-72 place-items-center px-6 pb-6">
            <NotificationEmpty />
          </div>
        ) : (
          <div className="mx-6 max-h-96 space-y-2 overflow-y-auto rounded-lg bg-[#F4F7F5] p-2">
            {sortedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAction={() => onClose(false)}
              />
            ))}
          </div>
        )}

        <footer className="flex gap-3 px-6 py-5">
          <Button
            variant="default"
            className="h-11 flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          {count > 0 && (
            <Button
              variant="primary"
              className="h-11 flex-1"
              onClick={() => setNotifications([])}
            >
              Clear Notifications
            </Button>
          )}
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
