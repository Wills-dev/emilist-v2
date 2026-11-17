export const businessKeys = {
  all: ["businesses"] as const,
  profile: (businessId: string, userId?: string) => [...businessKeys.all, "profile", businessId, userId] as const,
};
