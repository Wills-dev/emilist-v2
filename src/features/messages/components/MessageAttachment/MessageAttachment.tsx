"use client";

import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import ImagePreview from "@/components/atoms/ImagePreview/ImagePreview";
import type { MessageAttachment as Attachment } from "../../types/messaging";
import { useMessageAttachment } from "../../hooks/useMessageAttachment";

const MessageAttachment = ({ attachment }: { attachment: Attachment }) => {
  const file = useMessageAttachment(attachment);
  return <div className="mt-2 min-w-0">
    {!file.url ? <p>Attachment unavailable</p> : attachment.type === "image" ? <>
      <button type="button" onClick={file.openPreview} aria-label={`View ${attachment.name || "image attachment"}`} className="block max-w-full rounded-lg focus-visible:ring-2 focus-visible:ring-[#25C269]">
        <Image unoptimized src={file.url} alt={attachment.name || "Image attachment"} width={400} height={300} className="h-auto max-h-72 w-auto max-w-full rounded-lg object-contain" />
      </button>
      <AnimatePresence>{file.previewOpen && <ImagePreview imageUrl={file.url} alt={attachment.name || "Image attachment"} onCancel={file.closePreview} unoptimized />}</AnimatePresence>
    </> : attachment.type === "audio" ? <audio src={file.url} controls preload="none" className="max-w-full" aria-label={attachment.name || "Audio attachment"} /> : (
      <button type="button" onClick={file.download} disabled={file.downloading} className="block max-w-full break-all rounded-lg border border-[#D9E5DD] bg-white/60 p-2 text-left underline disabled:opacity-50">{attachment.name || "Download attachment"}</button>
    )}
  </div>;
};

export default MessageAttachment;
