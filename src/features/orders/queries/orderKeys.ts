export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (userId: string, query: object) =>
    [...orderKeys.lists(), userId, query] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (userId: string, orderId: string) =>
    [...orderKeys.details(), userId, orderId] as const,
  tracking: (userId: string, orderId: string) =>
    [...orderKeys.all, "tracking", userId, orderId] as const,
};
