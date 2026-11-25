import { safeAuthDestination } from "@/lib/helpers/authRedirect";

export { GOOGLE_AUTH_CONTEXT_KEY } from "@/lib/helpers/authSession";

export const googleAuthStartUrl = (baseUrl?: string) => {
  if (!baseUrl?.trim()) throw new Error("Google sign-in is not configured. Please contact support.");
  const url = new URL(baseUrl.trim());
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/auth/google`;
  url.search = "";
  url.hash = "";
  const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !localHttp) throw new Error("Google sign-in requires a secure API URL.");
  return url.href;
};

export const googleAuthDestination = (queryRedirect: string | null, savedRedirect: string | null, currentPath: string, isModalFlow: boolean) =>
  safeAuthDestination(queryRedirect || savedRedirect || (isModalFlow ? currentPath : null));
