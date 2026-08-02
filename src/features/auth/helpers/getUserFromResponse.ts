import { User } from "@/store/authStore";

const isUser = (value: unknown): value is User => {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<User>;
  return typeof candidate._id === "string" && typeof candidate.email === "string";
};

export const getUserFromResponse = (response: unknown): User | null => {
  if (isUser(response)) return response;
  if (!response || typeof response !== "object") return null;

  const nestedResponse = response as {
    user?: unknown;
    userData?: unknown;
  };

  if (isUser(nestedResponse.userData)) return nestedResponse.userData;
  if (isUser(nestedResponse.user)) return nestedResponse.user;

  return null;
};

