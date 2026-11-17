"use client";

import { LoaderCircle, Mic, Square, X } from "lucide-react";
import MessageAudioPreview from "../MessageAudioPreview/MessageAudioPreview";
import EmojiIcon from "@/components/atoms/icons/EmojiIcon/EmojiIcon";
import SelectFileIcon from "@/components/atoms/icons/SelectFileIcon/SelectFileIcon";
import UploadImageIcon from "@/components/atoms/icons/UploadImageIcon/UploadImageIcon";
import SendIcon from "@/components/atoms/icons/SendIcon/SendIcon";
import EmojiPicker from "@/components/molecules/EmojiPicker/EmojiPicker";
import { useMessageComposer, type ComposerOptions } from "../../hooks/useMessageComposer";

const MessageComposer = (props: ComposerOptions) => {
  const {
    message, files, error, voice, isEmojiPickerOpen, composerRef, fileInputRef, imageInputRef, chooseImages,
    handleSubmit, handleFiles, handleChange, addEmoji, toggleEmoji,
    chooseFiles, removeFile, onStopTyping,
  } = useMessageComposer(props);

  return (
    <form ref={composerRef} onSubmit={handleSubmit} className="relative space-y-2">
      {files.length > 0 && (
        <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="max-w-full">
            <button
              type="button"
              data-index={index}
              onClick={removeFile}
              disabled={props.sending || voice.recording || voice.starting}
              aria-label={`Remove ${file.name}`}
              className="flex max-w-full items-center gap-2 rounded-lg bg-[#EAFBF1] px-2 py-1 text-xs text-[#39704F]"
            >
              <span className="truncate">{file.name}</span>
              <X className="size-3 shrink-0" />
            </button>
            {file.type.startsWith("audio/") && <MessageAudioPreview file={file} />}
            </div>
          ))}
        </div>
      )}
      {error && <p role="alert" className="text-xs text-[#FF5D7A]">{error}</p>}
      <div className="flex items-center gap-2 rounded-full border border-[#F1F2F9] bg-[#F9F9F9] px-3 py-2">
        <input
          ref={fileInputRef} type="file" multiple onChange={handleFiles}
          disabled={props.sending || voice.recording || voice.starting} className="sr-only" aria-label="Message attachments"
        />
        <button type="button" onClick={chooseFiles} disabled={props.sending || voice.recording || voice.starting} aria-label="Attach images, audio or files" className="shrink-0 disabled:opacity-50">
          <SelectFileIcon />
        </button>
        <input ref={imageInputRef} type="file" multiple accept="image/*" onChange={handleFiles} disabled={props.sending || voice.recording || voice.starting} className="sr-only" aria-label="Image attachments" />
        <button type="button" onClick={chooseImages} disabled={props.sending || voice.recording || voice.starting} aria-label="Upload an image" className="shrink-0"><UploadImageIcon /></button>
        <button type="button" onClick={toggleEmoji} disabled={props.sending || voice.recording || voice.starting} aria-label="Choose an emoji" aria-expanded={isEmojiPickerOpen} className="shrink-0">
          <EmojiIcon />
        </button>
        {isEmojiPickerOpen && <EmojiPicker onSelect={addEmoji} />}
        <input
          value={message} onChange={handleChange} onBlur={onStopTyping}
          disabled={props.sending || voice.recording || voice.starting} maxLength={5000}
          placeholder="Type your message" aria-label="Message"
          className="min-w-0 flex-1 border-l border-[#D9D9D9] bg-transparent px-3 py-1 text-sm outline-none placeholder:text-[#737774]"
        />
        {voice.recording ? <button type="button" onClick={voice.stop} aria-label="Stop recording" className="shrink-0 text-[#FF5D7A]"><Square className="size-4 fill-current" /></button> : <button type="button" onClick={voice.start} disabled={props.sending || voice.starting || files.length >= 10} aria-label={voice.starting ? "Starting microphone" : "Record voice message"} className="shrink-0 text-[#737774] disabled:opacity-50">{voice.starting ? <LoaderCircle className="size-4 animate-spin" /> : <Mic className="size-4" />}</button>}
        <button
          type="submit"
          disabled={props.sending || voice.recording || voice.starting || (!message.trim() && !files.length)}
          aria-label="Send message"
          className="flex size-8 shrink-0 items-center justify-center disabled:opacity-50"
        >
          <SendIcon />
        </button>
      </div>
      {voice.recording && <div role="status" className="flex items-center gap-3 text-xs text-[#FF5D7A]"><span className="size-2 animate-pulse rounded-full bg-[#FF5D7A]" />Recording… <button type="button" onClick={voice.cancel} className="ml-auto underline">Cancel recording</button></div>}
    </form>
  );
};

export default MessageComposer;
