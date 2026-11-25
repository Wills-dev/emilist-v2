import type { MetadataRoute } from "next";
import { PREVIEW_DEPLOYMENT, SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  if (PREVIEW_DEPLOYMENT) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    // Private HTML uses noindex metadata/headers. Allow crawlers to read those
    // directives; authentication independently protects dashboard content.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).href,
    host: SITE_URL,
  };
}
