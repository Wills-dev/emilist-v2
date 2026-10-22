import type { User } from "@/store/authStore";

type UserResponse = Partial<User> & Pick<User, "_id" | "email">;

const isUser = (value: unknown): value is UserResponse => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<User>;
  return typeof candidate._id === "string" && typeof candidate.email === "string";
};

const normalizeUser = (user: UserResponse): User => ({
  ...user,
  uniqueId: user.uniqueId ?? "",
  image: user.displayImage ?? user.image,
  emailVerified: user.isEmailVerified ?? user.emailVerified ?? false,
  isProfileComplete: user.isProfileComplete ?? false,
  role: "user",
});

export const getUserFromResponse = (response: unknown): User | null => {
  if (isUser(response)) return normalizeUser(response);
  if (!response || typeof response !== "object") return null;
  const nested = response as { user?: unknown; userData?: unknown; data?: unknown };
  if (isUser(nested.userData)) return normalizeUser(nested.userData);
  if (isUser(nested.user)) return normalizeUser(nested.user);
  if (nested.data && nested.data !== response) return getUserFromResponse(nested.data);
  return null;
};
