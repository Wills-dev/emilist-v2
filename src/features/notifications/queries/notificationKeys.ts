export const notificationKeys = {
  all: ["notifications"] as const,
  list: (userId: string | undefined, page: number, limit: number) => [...notificationKeys.all, userId, page, limit] as const,
};
