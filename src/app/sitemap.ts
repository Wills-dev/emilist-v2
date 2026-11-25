import type { MetadataRoute } from "next";
import { PUBLIC_SITEMAP_PATHS, resourceSitemap } from "@/lib/seo/sitemapData";
import { PREVIEW_DEPLOYMENT, SITE_URL } from "@/lib/seo/site";

export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (PREVIEW_DEPLOYMENT) return [];
  const resources = await Promise.all([resourceSitemap("jobs"), resourceSitemap("materials"), resourceSitemap("experts")]);
  const entries: MetadataRoute.Sitemap = [
    ...PUBLIC_SITEMAP_PATHS.map((path) => ({ url: new URL(path, SITE_URL).href })),
    ...resources.flat(),
  ];
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}
