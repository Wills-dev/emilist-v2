import { trackReportEvent } from "@/features/reports/api/recordReportEvent";
import { useState } from "react";
import { useStore } from "@/store/authStore";
import { readCookie } from "@/lib/helpers/cookie";
import type { MessageRecipient } from "../types/recipient";

export const useMessageDialog = (recipient?: MessageRecipient, onOpen?: () => void) => {
  const [open, setOpen] = useState(false);
  const userId = useStore((state) => state.currentUser?._id);
  const openAuth = useStore((state) => state.openModal);
  const disabled = Boolean(recipient && (!recipient.userId || recipient.userId === userId));
  const show = () => {
    if (disabled) return;
    if (!readCookie("emilistToken")) { openAuth("login"); return; }
    if (recipient) trackReportEvent("contact", recipient.businessId ? { resourceType: "business", resourceId: recipient.businessId } : { resourceType: "profile", subjectUserId: recipient.userId });
    onOpen?.();
    setOpen(true);
  };
  const preventDrawerFocusRestore = (event: Event) => { if (open) event.preventDefault(); };
  return { open, setOpen, show, disabled, preventDrawerFocusRestore };
};
