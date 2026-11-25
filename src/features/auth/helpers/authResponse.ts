import { getUserFromResponse } from "./getUserFromResponse";

export const readAuthResponse = (response: unknown, requireVerified = false) => {
  const envelope = response && typeof response === "object" ? response as Record<string, unknown> : {};
  const payload = envelope.data && typeof envelope.data === "object" ? envelope.data as Record<string, unknown> : envelope;
  const user = getUserFromResponse(payload);
  const token = typeof payload.token === "string" ? payload.token.trim() : "";
  if (!user || !token) throw new Error("Unable to verify the authentication response. Please try again.");
  if (requireVerified && !user.emailVerified) throw new Error("Your email has not been verified. Please try again.");
  return { user, token };
};
