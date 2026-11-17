"use client";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea/Textarea";
import { useCloseContract } from "../../hooks/useCloseContract";
import type { JobDetailsViewModel } from "../../types/jobDetails";
import ContractRating from "./ContractRating";

export default function CloseContract({ job }: { job: JobDetailsViewModel }) {
  const form = useCloseContract(job);
  if (!form.eligible && !form.open) return null;
  return (
    <>
      {form.eligible && <Button variant="primary" className="h-11 w-full" onClick={form.handleOpen}>Close Contract</Button>}
      <ModalWrapper open={form.open} onClose={form.handleOpenChange} title="Close Contract" description={`Leave a review for the expert who completed “${job.title}”. Submitting this review closes the contract.`} className="sm:max-w-lg" showCloseButton={!form.busy}>
        <form onSubmit={form.handleSubmit} className="space-y-5 pt-3">
          <fieldset disabled={form.busy} className="space-y-5">
            <ContractRating label="Quality of work" name="rating" value={form.rating} onChange={form.handleRating} />
            <ContractRating label="Communication" name="rateCommunication" value={form.rateCommunication} onChange={form.handleRating} />
            <label className="block space-y-2 text-sm font-semibold text-[#303632]">
              Your review
              <Textarea required value={form.note} onChange={form.handleNote} rows={4} placeholder="Share your experience with this expert" />
            </label>
            <label className="flex items-center gap-3 text-sm text-[#303632]">
              <input type="checkbox" checked={form.isRecommendVendor} onChange={form.handleRecommendation} className="size-4 accent-[#25C269]" />
              I recommend this expert
            </label>
          </fieldset>
          <div className="flex flex-col-reverse gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
            <Button type="button" variant="default" className="h-11 w-full sm:flex-1" disabled={form.busy} onClick={form.handleCancel}>Cancel</Button>
            <Button type="submit" variant="primary" className="h-11 w-full sm:flex-1" loading={form.busy} disabled={form.busy || !form.eligible || !form.rating || !form.rateCommunication || !form.note.trim()}>Close Contract</Button>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
}
