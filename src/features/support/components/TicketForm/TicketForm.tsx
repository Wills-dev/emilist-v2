"use client";
import BackButton from "@/components/atoms/BackButton/BackButton";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/Textarea/Textarea";
import { useTicketForm } from "../../hooks/useTicketForm";
import SupportFilesInput from "../TicketDetail/SupportFilesInput";
import { supportCategories, supportPriorities, linkedTypes, supportLabel } from "../../helpers/supportOptions";

const selectStyle = "block h-11 w-full rounded-lg border border-[#ECECEC] bg-white px-3 pr-9";
export default function TicketForm() {
  const form = useTicketForm();
  return <main className="space-y-5"><BackButton href="/dashboard/support" isDashboard /><div className="rounded-lg bg-white p-4 sm:p-6"><h1 className="mb-2 font-exo text-2xl font-semibold">New support ticket</h1><p className="mb-6 text-sm text-[#737774]">Tell us what happened so we can help. For invoice disputes, open the invoice and select Raise Dispute.</p><form onSubmit={form.submit} className="space-y-5"><fieldset disabled={form.busy} className="space-y-5">
    <label className="block space-y-2 text-sm">Subject<Input name="subject" required placeholder="What do you need help with?" /></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm">Category<select name="category" defaultValue="other" className={selectStyle}>{supportCategories.map((value) => <option key={value} value={value}>{supportLabel(value)}</option>)}</select></label><label className="space-y-2 text-sm">Priority<select name="priority" defaultValue="normal" className={selectStyle}>{supportPriorities.map((value) => <option key={value} value={value}>{supportLabel(value)}</option>)}</select></label></div>
    <label className="block space-y-2 text-sm">Description<Textarea name="description" required rows={6} placeholder="Describe the issue and any steps you have already tried." /></label>
    <div className="rounded-lg bg-[#F4F7F5] p-4"><p className="mb-3 text-sm">Related record (optional)</p><div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-xs">Record type<select name="linkedType" className={selectStyle}><option value="">None</option>{linkedTypes.map((value) => <option key={value} value={value}>{supportLabel(value)}</option>)}</select></label><label className="space-y-2 text-xs">Record ID<Input name="linkedRecordId" placeholder="Enter the related record ID" /></label></div></div>
    <SupportFilesInput uploads={form.uploads} disabled={form.busy} />
    </fieldset><Button type="submit" variant="primary" className="h-11 w-full sm:w-auto" loading={form.busy} disabled={form.busy}>Create ticket</Button></form></div></main>;
}
