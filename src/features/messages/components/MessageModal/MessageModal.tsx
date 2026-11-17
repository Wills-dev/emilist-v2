"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog/dialog";
import type { MessageRecipient } from "../../types/recipient";
import MessageModalBody from "./MessageModalBody";

const MessageModal = ({ open, onOpenChange, recipient }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient?: MessageRecipient;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="flex h-[80vh] max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden bg-white p-0 sm:max-w-xl">
      <DialogHeader className="shrink-0 border-b border-[#E6EAE7] px-4 py-3 pr-12">
        <DialogTitle className="font-exo text-base text-[#303632]">Messages</DialogTitle>
        <DialogDescription className="sr-only">{recipient ? `Conversation with ${recipient.name}` : "Your inbox and conversations"}</DialogDescription>
      </DialogHeader>
      <div className="min-h-0 flex-1">
        {open && <MessageModalBody key={recipient?.userId ?? "inbox"} recipient={recipient} />}
      </div>
    </DialogContent>
  </Dialog>
);

export default MessageModal;
