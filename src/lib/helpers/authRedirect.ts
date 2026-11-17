import { routes } from "./routes";

export const safeAuthDestination = (value?: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\s]/.test(value) || value.startsWith("/auth/")) return routes.dashboard;
  return value;
};

export const loginRedirectUrl = (path: string) =>
  `${routes.login}?redirect=${encodeURIComponent(safeAuthDestination(path))}`;
