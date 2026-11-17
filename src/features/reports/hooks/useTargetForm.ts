import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ReportTarget, SaveTargetInput } from "../types/api";
export type TargetNumbers = Pick<SaveTargetInput, "job" | "amount" | "referrals" | "invites">;
const numberText = (value: string) => value.replaceAll(",", "");
export const useTargetForm = (target: ReportTarget, onSave: (values: TargetNumbers) => void) => {
  const [values, setValues] = useState({
    job: target.configured ? String(target.goals.jobs) : "",
    amount: target.configured ? target.goals.amount.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "",
    referrals: target.configured ? String(target.goals.referrals) : "",
    invites: target.configured ? String(target.goals.invites) : "",
  });
  const [error, setError] = useState("");
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof typeof values;
    const raw = numberText(event.target.value);
    if (!(key in values) || !(key === "amount" ? /^\d*(\.\d{0,2})?$/ : /^\d*$/).test(raw)) return;
    const [whole, decimal] = raw.split(".");
    const value = key === "amount" && raw ? `${whole ? Number(whole).toLocaleString("en-US") : ""}${decimal !== undefined ? `.${decimal}` : ""}` : raw;
    setValues((current) => ({ ...current, [key]: value })); setError("");
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(numberText(value))])) as TargetNumbers;
    if (Object.values(values).some((value) => !value.trim()) || Object.values(payload).some((value) => !Number.isFinite(value) || value < 0) || [payload.job, payload.referrals, payload.invites].some((value) => !Number.isSafeInteger(value))) { setError("Enter valid non-negative targets in every field."); return; }
    onSave(payload);
  };
  return { values, error, change, submit };
};
