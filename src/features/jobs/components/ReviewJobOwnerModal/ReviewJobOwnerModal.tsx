"use client";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea/Textarea";
import ContractRating from "../CloseContract/ContractRating";
import { useReviewJobOwner } from "../../hooks/useReviewJobOwner";
import type { JobDetailsViewModel } from "../../types/jobDetails";

export default function ReviewJobOwnerModal({ job, onClose }: { job: JobDetailsViewModel; onClose: () => void }) {
  const form = useReviewJobOwner(job, onClose);
  return <ModalWrapper open onClose={form.changeOpen} title="Rate Job Owner" description={`Share your experience working on “${job.title}”.`} className="sm:max-w-lg" showCloseButton={!form.busy}>
    <form onSubmit={form.submit} className="space-y-5 pt-3">
      <fieldset disabled={form.busy} className="space-y-5">
        <ContractRating label="Overall experience" name="rating" value={form.rating} onChange={form.changeRating} />
        <ContractRating label="Communication" name="rateCommunication" value={form.communication} onChange={form.changeRating} />
        <label className="block space-y-2 text-sm font-semibold text-[#303632]">Your review<Textarea required rows={4} value={form.comment} onChange={form.changeComment} placeholder="Share your experience with this job owner" /></label>
        <label className="flex items-center gap-3 text-sm text-[#303632]"><input type="checkbox" checked={form.recommend} onChange={form.changeRecommendation} className="size-4 accent-[#25C269]" />I recommend this job owner</label>
      </fieldset>
      <div className="flex flex-col-reverse gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
        <Button type="button" variant="default" className="h-11 w-full sm:flex-1" disabled={form.busy} onClick={form.cancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="h-11 w-full sm:flex-1" loading={form.busy} disabled={form.busy || !form.eligible || !form.rating || !form.communication || !form.comment.trim()}>Submit Review</Button>
      </div>
    </form>
  </ModalWrapper>;
}
