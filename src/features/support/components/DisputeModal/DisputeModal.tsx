"use client";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/Textarea/Textarea";
import { useDisputeForm, type DisputeFormProps } from "../../hooks/useDisputeForm";
import SupportFilesInput from "../TicketDetail/SupportFilesInput";

export default function DisputeModal(props: DisputeFormProps) {
  const form = useDisputeForm(props);
  return <ModalWrapper open onClose={form.changeOpen} title="Raise Invoice Dispute" description="Our support team will review the invoice and your evidence." className="sm:max-w-xl" showCloseButton={!form.busy}>
    {!form.options.length ? <div className="space-y-4 py-5 text-sm"><p>{form.blockedMessage || "No dispute reason is currently available. Unpaid invoices can be disputed after 7 days. Additional-cost disputes require an unpaid additional cost after the original amount has been paid."}</p>{form.existingHref && <Button variant="primary" href={form.existingHref} className="h-11 w-full">View dispute</Button>}<Button variant="default" onClick={form.cancel} className="h-11 w-full">Close</Button></div> : <form onSubmit={form.submit} className="space-y-5 pt-5"><p className="rounded-lg bg-[#F4F7F5] p-3 text-sm">{props.invoice.milestone}</p><fieldset disabled={form.busy} className="space-y-4"><label className="block space-y-2 text-sm">Dispute reason<select name="disputeType" required className="h-11 w-full rounded-lg border border-[#ECECEC] bg-white px-3 pr-9">{form.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><label className="block space-y-2 text-sm">Subject (optional)<Input name="subject" placeholder="Briefly summarise the issue" /></label><label className="block space-y-2 text-sm">What happened?<Textarea name="reason" required rows={5} placeholder="Explain why you are disputing this invoice." /></label><SupportFilesInput uploads={form.uploads} disabled={form.busy} /></fieldset><div className="flex flex-col-reverse gap-3 sm:flex-row"><Button type="button" variant="default" className="h-11 w-full sm:flex-1" onClick={form.cancel} disabled={form.busy}>Cancel</Button><Button type="submit" variant="danger" className="h-11 w-full sm:flex-1" loading={form.busy} disabled={form.busy}>Submit dispute</Button></div></form>}
  </ModalWrapper>;
}
