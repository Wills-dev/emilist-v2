export const supportKeys = {
  all: ["support"] as const,
  list: (userId: string | undefined, filters: object) => ["support", userId, "list", filters] as const,
  detail: (userId: string | undefined, requestId: string) => ["support", userId, "detail", requestId] as const,
};
