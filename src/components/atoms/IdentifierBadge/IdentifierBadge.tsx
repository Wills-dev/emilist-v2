"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type IdentifierBadgeProps = {
  label?: string;
  value: string;
  maxWidth?: string;
};

const IdentifierBadge = ({
  label = "ID",
  value,
  maxWidth = "max-w-sm",
}: IdentifierBadgeProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-[32px] bg-white px-2 py-px ${maxWidth}`}
    >
      <p className="shrink-0 text-sm italic text-[#737774]">{label}:</p>

      <p
        title={value}
        className="min-w-0 flex-1 truncate text-sm font-semibold text-[#474C48]"
      >
        {value}
      </p>

      <button
        onClick={handleCopy}
        className="ml-1 flex shrink-0 items-center gap-1 text-[#25C269] transition-opacity hover:opacity-80"
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <>
            <Check size={14} />
            <span className="text-xs font-medium">Copied</span>
          </>
        ) : (
          <Copy size={10} />
        )}
      </button>
    </div>
  );
};

export default IdentifierBadge;
