export const businessKeys = {
  all: ["businesses"] as const,
  compared: (userId?: string) => [...businessKeys.all, "compared", userId] as const,
  profile: (businessId: string, userId?: string) => [...businessKeys.all, "profile", businessId, userId] as const,
};
