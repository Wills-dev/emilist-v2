import "server-only";

export const record = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
export const text = (value: unknown) => typeof value === "string" ? value : "";

// Metadata never forwards a visitor's cookies or bearer token to the API.
export const fetchPublicData = async (endpoint: string, params?: Record<string, string | number>) => {
  const base = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  if (!base) return null;
  try {
    const url = new URL(`${base.replace(/\/+$/, "")}${endpoint}`);
    for (const [key, value] of Object.entries(params ?? {})) url.searchParams.set(key, String(value));
    const response = await fetch(url, { headers: { Accept: "application/json" }, credentials: "omit", next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    return record(payload).data ?? payload;
  } catch { return null; }
};
export const publicImage = (value: unknown): string | undefined => {
  const candidates = Array.isArray(value) ? value : [value];
  for (const entry of candidates) {
    const item = record(entry);
    const source = typeof entry === "string" ? entry : text(item.imageUrl) || text(item.secure_url) || text(item.secureUrl) || text(item.url);
    try { const url = new URL(source); if (url.protocol === "https:" && !url.username && !url.password) return url.href; } catch { /* Use the default image for unsupported image values. */ }
  }
};
