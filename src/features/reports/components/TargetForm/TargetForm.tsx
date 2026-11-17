import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { useTargetForm, type TargetNumbers } from "../../hooks/useTargetForm";
import type { ReportTarget } from "../../types/api";
const fields = [{ name: "referrals", label: "Referrals Made" }, { name: "invites", label: "Friends Invited" }, { name: "job", label: "Jobs Done" }, { name: "amount", label: "Amount Earned" }] as const;
const TargetForm = ({ target, onSave, saving }: { target: ReportTarget; onSave: (values: TargetNumbers) => void; saving: boolean }) => {
  const form = useTargetForm(target, onSave);
  return <form onSubmit={form.submit} className="space-y-6">
    <fieldset disabled={saving} className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => <label key={field.name} className="space-y-2 text-sm text-[#555B57]"><span>{field.label}</span>
        <Input name={field.name} type="text" inputMode={field.name === "amount" ? "decimal" : "numeric"} required value={form.values[field.name]} onChange={form.change} placeholder={field.name === "amount" ? "Enter amount" : "Enter number"} />
      </label>)}
    </fieldset>
    {form.error && <p role="alert" className="text-xs text-[#FF5D7A]">{form.error}</p>}
    <Button type="submit" variant="primary" disabled={saving} loading={saving} className="h-11 w-full">{target.configured ? "Make Changes" : "Submit"}</Button>
  </form>;
};
export default TargetForm;
