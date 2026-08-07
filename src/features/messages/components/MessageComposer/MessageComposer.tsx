"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import EmojiIcon from "@/components/atoms/icons/EmojiIcon";
import SelectFileIcon from "@/components/atoms/icons/SelectFileIcon";
import SendIcon from "@/components/atoms/icons/SendIcon";
import UploadImageIcon from "@/components/atoms/icons/UploadImageIcon";
import EmojiPicker from "@/components/molecules/EmojiPicker/EmojiPicker";

const DOCUMENT_FILE_TYPES =
  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/csv,application/zip";

const MessageComposer = ({ onSend }: { onSend: (message: string) => void }) => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const composerRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEmojiPickerOpen) return;

    const closePicker = (event: PointerEvent) => {
      if (!composerRef.current?.contains(event.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };

    const closePickerWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsEmojiPickerOpen(false);
    };

    document.addEventListener("pointerdown", closePicker);
    document.addEventListener("keydown", closePickerWithEscape);

    return () => {
      document.removeEventListener("pointerdown", closePicker);
      document.removeEventListener("keydown", closePickerWithEscape);
    };
  }, [isEmojiPickerOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <form
      ref={composerRef}
      onSubmit={handleSubmit}
      className="relative flex items-center gap-2 rounded-full border border-[#F1F2F9] bg-[#F9F9F9] px-3 py-2"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={DOCUMENT_FILE_TYPES}
        className="sr-only"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        aria-label="Select a file"
        className="shrink-0"
      >
        <SelectFileIcon />
      </button>
      <button
        type="button"
        onClick={() => imageInputRef.current?.click()}
        aria-label="Upload an image"
        className="shrink-0"
      >
        <UploadImageIcon />
      </button>
      <button
        type="button"
        onClick={() => setIsEmojiPickerOpen((current) => !current)}
        aria-label="Choose an emoji"
        aria-expanded={isEmojiPickerOpen}
        className="shrink-0"
      >
        <EmojiIcon />
      </button>

      {isEmojiPickerOpen && (
        <EmojiPicker
          onSelect={(emoji) => {
            setMessage((current) => `${current}${emoji}`);
          }}
        />
      )}

      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type your message"
        aria-label="Message"
        className="min-w-0 flex-1 border-l border-[#D9D9D9] bg-transparent px-3 py-1 text-sm outline-none placeholder:text-[#737774]"
      />

      <button type="submit" aria-label="Send message" className="shrink-0">
        <SendIcon />
      </button>
    </form>
  );
};

export default MessageComposer;
