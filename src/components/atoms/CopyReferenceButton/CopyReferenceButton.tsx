"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyReferenceButton({ value, label, compact = false }: {
  value?: string | null; label: string; compact?: boolean;
}) {
  const reference = value?.trim();
  const copy = async () => {
    if (!reference) return;
    try {
      await navigator.clipboard.writeText(reference);
      toast.success(`${label.replace(/^Copy /i, "")} copied.`);
    } catch {
      toast.error("Unable to copy. Please try again.");
    }
  };

  return (
    <button type="button" onClick={() => void copy()} disabled={!reference} aria-label={label}
      className="inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-[6.75px] bg-[#F6F7F9] px-[8.75px] text-xs font-medium text-[#6667FF] transition-colors hover:bg-[#E1E4E2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C269] disabled:cursor-not-allowed disabled:opacity-40">
      <Copy size={13} aria-hidden="true" />{compact ? "Copy" : label}
    </button>
  );
}
