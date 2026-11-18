import { Paperclip, ChevronRight } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import type { useTicketDetail } from "../../hooks/useTicketDetail";

export default function TicketReplyComposer({ detail }: { detail: ReturnType<typeof useTicketDetail> }) {
  return <form onSubmit={detail.submit} className="space-y-3 border-t border-[#EDF1F6] p-4 sm:p-6">
    <fieldset disabled={detail.busy} className="flex items-end gap-2 sm:gap-3">
      <label className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-[#FAFBFD] text-[#A1A5FF] hover:bg-[#F0F1FF] sm:size-12"><span className="sr-only">Attach images</span><Paperclip className="size-5" /><input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={detail.uploads.select} className="sr-only" disabled={detail.busy} /></label>
      <textarea name="message" required rows={2} aria-label="Your reply" placeholder="Type a reply…" className="min-h-12 min-w-0 flex-1 resize-y rounded-xl border border-[#E7ECF3] bg-[#FAFBFC] px-4 py-3 text-base text-[#172033] outline-none placeholder:text-[#99A1B1] focus:border-[#8ADDBA] focus:ring-2 focus:ring-[#EAFBF1] sm:text-sm" />
      <Button type="submit" variant="primary" className="size-11 shrink-0 rounded-xl! p-0! sm:size-12" loading={detail.busy} disabled={detail.busy}><ChevronRight className="size-5" /><span className="sr-only">Send reply</span></Button>
    </fieldset>
    <p className="text-xs leading-5 text-[#8B9BB8]">Supported attachments: JPG, PNG, or WEBP. Up to 10 images, 10 MB per image.</p>
    {detail.uploads.files.map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-lg bg-[#F7F8FA] px-3 py-2 text-xs"><span className="min-w-0 truncate text-[#7B859D]">{file.name}</span><button type="button" data-index={index} onClick={detail.uploads.remove} disabled={detail.busy} className="text-[#FF547D] underline">Remove<span className="sr-only"> {file.name}</span></button></div>)}
  </form>;
}
