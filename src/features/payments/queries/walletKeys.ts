export const walletKeys = {
  all: ["wallets"] as const,
  list: (userId?: string) => [...walletKeys.all, userId] as const,
};
