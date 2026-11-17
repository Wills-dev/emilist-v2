export const messageKeys = {
  all: ["messaging"] as const,
  user: (userId: string) => [...messageKeys.all, userId] as const,
  inboxes: (userId: string) => [...messageKeys.user(userId), "inbox"] as const,
  inbox: (userId: string, search: string) => [...messageKeys.inboxes(userId), search] as const,
  history: (userId: string, otherUserId: string) => [...messageKeys.user(userId), "history", otherUserId] as const,
};
