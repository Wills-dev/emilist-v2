import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { SendMessageInput } from "../types/messaging";
import { useVoiceRecorder } from "./useVoiceRecorder";
import { validateMessage } from "../helpers/validateMessage";

export interface ComposerOptions {
  onSend: (input: SendMessageInput) => Promise<boolean>;
  onTyping: () => void; onStopTyping: () => void; sending: boolean;
}
export const useMessageComposer = ({ onSend, onTyping, onStopTyping, sending }: ComposerOptions) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const composerRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const inFlight = useRef(false);
  const addRecording = (file: File) => {
    const validation = validateMessage({ content: message, files: [...files, file] });
    if (validation) { setError(validation); return; }
    setFiles((current) => [...current, file]); setError("");
  };
  const voice = useVoiceRecorder(addRecording);
  useEffect(() => {
    if (!isEmojiPickerOpen) return;
    const close = (event: PointerEvent) => {
      if (!composerRef.current?.contains(event.target as Node)) setIsEmojiPickerOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsEmojiPickerOpen(false); };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [isEmojiPickerOpen]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || sending || voice.recording || voice.starting) return;
    const validation = validateMessage({ content: message, files });
    if (validation) { setError(validation); return; }
    inFlight.current = true; setError("");
    try {
      if (await onSend({ content: message, files })) { setMessage(""); setFiles([]); setIsEmojiPickerOpen(false); }
    } catch { setError("Your message could not be sent. Please try again."); }
    finally { inFlight.current = false; }
  };
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const next = [...files, ...Array.from(event.target.files ?? [])];
    event.target.value = "";
    const validation = validateMessage({ content: message, files: next });
    if (validation) { setError(validation); return; }
    setFiles(next); setError("");
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { setMessage(event.target.value); onTyping(); };
  const addEmoji = (emoji: string) => { setMessage((current) => `${current}${emoji}`.slice(0, 5000)); onTyping(); };
  const toggleEmoji = () => setIsEmojiPickerOpen((current) => !current);
  const chooseImages = () => imageInputRef.current?.click();
  const chooseFiles = () => fileInputRef.current?.click();
  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };
  return { message, files, error: error || voice.error, voice, isEmojiPickerOpen, composerRef, fileInputRef, imageInputRef, chooseImages,
    handleSubmit, handleFiles, handleChange, addEmoji, toggleEmoji, chooseFiles, removeFile, onStopTyping };
};
