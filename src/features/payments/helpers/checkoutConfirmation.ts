import type { PaymentCheckoutResponse } from "@/lib/helpers/paymentRedirect";

export type CheckoutKind = "job" | "subscription";
export interface CheckoutConfirmation {
  userId: string;
  kind: CheckoutKind;
  reference: string;
  transactionId: string;
  returnPath: string;
}
const key = (kind: CheckoutKind) => `paymentConfirmation:${kind}`;
const event = "checkout-confirmation-changed";
export const getCheckoutSnapshot = (kind: CheckoutKind) => {
  try { return sessionStorage.getItem(key(kind)); } catch { return null; }
};
export const parseCheckoutConfirmation = (raw: string | null, kind: CheckoutKind, userId?: string): CheckoutConfirmation | null => {
  try {
    const value = raw ? JSON.parse(raw) : null;
    if (!value || !userId || value.userId !== userId || value.kind !== kind) return null;
    if (typeof value.reference !== "string" || typeof value.transactionId !== "string" || typeof value.returnPath !== "string") return null;
    if (!value.returnPath.startsWith("/dashboard/") || value.returnPath.includes("\\")) return null;
    return value;
  } catch { return null; }
};
export const saveCheckoutConfirmation = (response: PaymentCheckoutResponse, context: Pick<CheckoutConfirmation, "userId" | "kind" | "returnPath">) => {
  const data = response.data;
  const confirmation: CheckoutConfirmation = {
    ...context,
    reference: data?.transaction?.reference || data?.reference || "",
    transactionId: data?.transaction?._id || data?.transaction?.transactionId || data?.transactionId || "",
  };
  sessionStorage.setItem(key(context.kind), JSON.stringify(confirmation));
  window.dispatchEvent(new Event(event));
};
export const clearCheckoutConfirmation = (context: CheckoutConfirmation) => {
  const saved = parseCheckoutConfirmation(getCheckoutSnapshot(context.kind), context.kind, context.userId);
  if (saved?.reference !== context.reference || saved?.transactionId !== context.transactionId) return;
  sessionStorage.removeItem(key(context.kind));
  window.dispatchEvent(new Event(event));
};
export const subscribeCheckoutConfirmation = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(event, callback); };
};
export const currentCheckoutReturnPath = () => {
  const params = new URLSearchParams(window.location.search);
  params.delete("reference");
  params.delete("trxref");
  return `${window.location.pathname}${params.size ? `?${params}` : ""}`;
};
