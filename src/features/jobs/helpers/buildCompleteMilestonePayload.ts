import { removeNumberCommas } from "@/lib/helpers/formatNumbers";
import type { CompleteMilestonePayload } from "../types/updateMilestoneStatus";

export const buildCompleteMilestonePayload = (note: string, additionalAmount: string): CompleteMilestonePayload => {
  const payload: CompleteMilestonePayload = { status: "completed" };
  const trimmedNote = note.trim();
  if (trimmedNote) payload.note = trimmedNote;
  const amountText = removeNumberCommas(additionalAmount).trim();
  if (amountText) {
    if (!/^\d+(?:\.\d{1,2})?$/.test(amountText)) throw new Error("Enter a valid additional cost with up to two decimal places.");
    const amount = Number(amountText);
    if (!Number.isFinite(amount) || amount < 0 || !Number.isSafeInteger(Math.round(amount * 100))) {
      throw new Error("Enter a valid additional cost.");
    }
    payload.additionalAmount = amount;
  }
  return payload;
};
