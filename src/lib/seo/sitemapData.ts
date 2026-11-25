import "server-only";
import type { MetadataRoute } from "next";
import { fetchPublicData, record, text } from "./publicData";
import { isPublicResource } from "./resourceVisibility";
import { SITE_URL } from "./site";

export const PUBLIC_SITEMAP_PATHS = ["/", "/marketplace/jobs", "/marketplace/materials", "/marketplace/experts", "/become-expert", "/download", "/faq", "/help-center"];
export type ResourceKind = "jobs" | "materials" | "experts";
const resources = {
  jobs: { endpoint: "/jobs/fetch-all-jobs", keys: ["jobs"] },
  materials: { endpoint: "/material/fetch-all-products", keys: ["products"] },
  experts: { endpoint: "/business/fetch-all-experts", keys: ["businesses", "experts"] },
};
export const sitemapPage = (kind: ResourceKind, payload: unknown, page: number) => {
  const data = record(payload);
  const config = resources[kind];
  const items = Array.isArray(payload) ? payload : config.keys.map((key) => data[key]).find(Array.isArray);
  if (!Array.isArray(items)) return { entries: [] as MetadataRoute.Sitemap, next: false };
  const entries: MetadataRoute.Sitemap = [];
  for (const raw of items) {
    const item = record(raw);
    const id = text(item._id);
    if (!id || !isPublicResource(kind, item)) continue;
    const modified = text(item.updatedAt);
    entries.push({ url: new URL(`/marketplace/${kind}/${encodeURIComponent(id)}`, SITE_URL).href, ...(modified && Number.isFinite(Date.parse(modified)) ? { lastModified: modified } : {}) });
  }
  const pagination = record(data.pagination);
  const totalPages = Number(pagination.totalPages ?? data.totalPages);
  return { entries, next: Number.isFinite(totalPages) ? page < totalPages : !Array.isArray(payload) && items.length === 100 };
};
export const resourceSitemap = async (kind: ResourceKind) => {
  const entries: MetadataRoute.Sitemap = [];
  // Keep the combined sitemap below the protocol's 50,000 URL limit and bound
  // backend work. Public listing links also expose entries beyond this limit.
  for (let page = 1; page <= 150; page++) {
    const payload = await fetchPublicData(resources[kind].endpoint, { page, limit: 100 });
    if (!payload) break;
    const result = sitemapPage(kind, payload, page);
    entries.push(...result.entries.slice(0, 15000 - entries.length));
    if (entries.length >= 15000 || !result.next) break;
  }
  return entries;
};
