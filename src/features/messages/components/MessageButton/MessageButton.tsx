"use client";

import IconWrapper from "@/components/atoms/IconWrapper/IconWrapper";
import MessageIcon from "@/components/atoms/icons/MessageIcon/MessageIcon";
import { useMessageDialog } from "../../hooks/useMessageDialog";
import type { MessageRecipient } from "../../types/recipient";
import MessageModal from "../MessageModal/MessageModal";

const MessageButton = ({ recipient, className = "inline-flex size-9 items-center justify-center rounded-md bg-[#EDEEF0] text-[#737774] hover:bg-[#E1E4E2]", label, showLabel = false, compact = false, disabled: externallyDisabled = false }: {
  recipient?: MessageRecipient;
  className?: string;
  label?: string;
  showLabel?: boolean;
  disabled?: boolean;
  compact?: boolean;
}) => {
  const { open, setOpen, show, disabled } = useMessageDialog(recipient);
  return <>
    {compact ? <IconWrapper onClick={show} disabled={disabled || externallyDisabled} ariaLabel={label ?? `Message ${recipient?.name ?? "expert"}`}><MessageIcon /></IconWrapper> : <button type="button" onClick={show} disabled={disabled || externallyDisabled}
      aria-label={label ?? (recipient ? `Message ${recipient.name}` : "Open messages")}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C269]`}
    ><MessageIcon />{showLabel && <span className="ml-1 text-xs">{label}</span>}</button>}
    {open && <MessageModal open={open} onOpenChange={setOpen} recipient={recipient} />}
  </>;
};

export default MessageButton;
