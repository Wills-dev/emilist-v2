import type { StoredWalletFunding } from "../types/fundWallet";

const key = "walletFunding";
const changedEvent = "wallet-funding-changed";

export const storeWalletFunding = (funding: StoredWalletFunding) => {
  sessionStorage.setItem(key, JSON.stringify(funding));
  window.dispatchEvent(new Event(changedEvent));
};
export const getStoredWalletFundingSnapshot = () => {
  try { return sessionStorage.getItem(key); } catch { return null; }
};
export const parseStoredWalletFunding = (raw: string | null, userId?: string): StoredWalletFunding | null => {
  try {
    const value = raw ? JSON.parse(raw) : null;
    if (!value || !userId || value.userId !== userId) return null;
    return [value.walletId, value.transactionId, value.reference].every((item) => typeof item === "string" && item.length > 0) ? value : null;
  } catch { return null; }
};
export const clearStoredWalletFunding = (userId: string, reference: string) => {
  const stored = parseStoredWalletFunding(getStoredWalletFundingSnapshot(), userId);
  if (stored?.reference !== reference) return;
  sessionStorage.removeItem(key);
  window.dispatchEvent(new Event(changedEvent));
};
export const subscribeWalletFundingStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(changedEvent, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(changedEvent, callback); };
};
