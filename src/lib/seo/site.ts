export const DEFAULT_SITE_URL = "https://emilist-v2.vercel.app";
export const SITE_TITLE = "Emilist – Jobs, Experts, Materials & Project Management";
export const SITE_DESCRIPTION = "Find jobs, hire skilled experts, buy materials and manage projects with Emilist. Connect with the people and resources you need to get work done.";
export const resolveSiteUrl = (configured?: string, vercelProductionHost?: string) => {
  const value = configured?.trim() || vercelProductionHost?.trim() || DEFAULT_SITE_URL;
  const url = new URL(value.includes("://") ? value : `https://${value}`);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("SITE_URL must be a public HTTP(S) site address.");
  return url.origin;
};
export const SITE_URL = resolveSiteUrl(process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL);
export const PREVIEW_DEPLOYMENT = process.env.VERCEL_ENV === "preview";
export const DEFAULT_SHARE_IMAGE = { url: new URL("/og-image.png", SITE_URL).href, width: 1321, height: 630, type: "image/png", alt: "Emilist – jobs, experts, materials and project management" };

export const resolveShareOrigin = (browserOrigin: string, configured?: string) => {
  if (configured) return resolveSiteUrl(configured);
  const url = new URL(browserOrigin);
  if (url.protocol !== "https:" || ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) return DEFAULT_SITE_URL;
  return url.origin;
};
