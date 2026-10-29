"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea/Textarea";
import { useCompleteMilestoneForm, type CompleteMilestoneFormParams } from "../../hooks/useCompleteMilestoneForm";

const CompleteMilestoneModal = (props: CompleteMilestoneFormParams) => {
  const form = useCompleteMilestoneForm(props);

  return (
    <ModalWrapper open onClose={form.handleOpenChange} title="Complete Milestone" className="max-w-2xl!" headerClassName="border-b border-[#ECECEC] pb-5" showCloseButton={!form.isSubmitting}>
      <form onSubmit={form.handleSubmit} className="min-w-0 space-y-6 pt-5">
        <p className="border-b border-[#ECECEC] pb-6 text-base leading-7 text-[#707C93]">
          Send your completed milestones and extra incurred costs, if any to the employer for review and approval
        </p>
        <fieldset disabled={form.isSubmitting} className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="milestone-additional-amount" title="Enter additional costs you incurred" />
            <span className="text-sm text-[#707C93]">Optional</span>
          </div>
          <div className="flex min-w-0 items-stretch gap-3">
            <span className="flex w-24 shrink-0 items-center justify-center rounded-[10px] border-4 border-[#ECECEC] bg-white text-[#737774]">{props.currency}</span>
            <div className="min-w-0 flex-1">
              <Input id="milestone-additional-amount" name="additionalAmount" inputMode="decimal" value={form.additionalAmount} onChange={form.handleAmountChange} placeholder="Enter amount" />
            </div>
          </div>
          <Textarea name="note" aria-label="Reason for the extra costs" value={form.note} onChange={form.handleNoteChange} placeholder="Give a reason for the extra costs" className="block min-h-44 min-w-0 max-w-full resize-y box-border border-0! p-5! placeholder:text-[#474C48]" />
        </fieldset>
        <div className="grid grid-cols-2 gap-4 border-t border-[#ECECEC] pt-6">
          <Button type="button" variant="default" className="h-11 w-full" disabled={form.isSubmitting} onClick={form.handleCancel}>Cancel</Button>
          <Button type="submit" variant="primary" className="h-11 w-full" loading={form.isSubmitting} disabled={form.isSubmitting}>Submit</Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default CompleteMilestoneModal;
