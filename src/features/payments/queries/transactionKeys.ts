export const transactionKeys = {
  all: ["wallet-transactions"] as const,
  list: (userId: string | undefined, walletId: string) =>
    [...transactionKeys.all, "list", userId, walletId] as const,
  detail: (userId: string | undefined, transactionId: string) =>
    [...transactionKeys.all, "detail", userId, transactionId] as const,
  verification: (userId: string | undefined, reference: string) =>
    [...transactionKeys.all, "verify", userId, reference] as const,
};
