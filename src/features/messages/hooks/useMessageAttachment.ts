import { useState } from "react";
import { toast } from "sonner";
import type { MessageAttachment } from "../types/messaging";
import { attachmentUrl } from "../helpers/attachmentUrl";

export const useMessageAttachment = (attachment: MessageAttachment) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const url = attachmentUrl(attachment.url);
  const openPreview = () => { if (url) setPreviewOpen(true); };
  const closePreview = () => setPreviewOpen(false);
  const download = async () => {
    if (!url || downloading) return;
    setDownloading(true);
    try {
      // Attachment hosts must never receive the application's bearer token.
      const response = await fetch(url, { credentials: "omit" });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = attachment.name?.split(/[\\/]/).pop() || "attachment";
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch { toast.error("Unable to download this file. Please try again."); }
    finally { setDownloading(false); }
  };
  return { url, previewOpen, openPreview, closePreview, download, downloading };
};
