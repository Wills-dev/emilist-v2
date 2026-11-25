import type { Metadata } from "next";
import { DEFAULT_SHARE_IMAGE, PREVIEW_DEPLOYMENT, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site";

export const plainDescription = (value: string, fallback = SITE_DESCRIPTION) => {
  const text = value.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  return text ? text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text : fallback;
};
export const createPageMetadata = ({ title, description = SITE_DESCRIPTION, path, index = true, image }: {
  title?: string; description?: string; path?: string; index?: boolean; image?: string;
}): Metadata => {
  const fullTitle = title ? `${title} | Emilist` : SITE_TITLE;
  const summary = plainDescription(description);
  const indexable = index && !PREVIEW_DEPLOYMENT;
  const url = path && index ? new URL(path, SITE_URL).href : undefined;
  const shareImage = image ? { url: image, alt: title || DEFAULT_SHARE_IMAGE.alt } : DEFAULT_SHARE_IMAGE;
  return {
    title: { absolute: fullTitle }, description: summary,
    alternates: { canonical: url ?? null },
    robots: { index: indexable, follow: index, googleBot: { index: indexable, follow: index, "max-image-preview": "large" } },
    openGraph: { title: fullTitle, description: summary, siteName: "Emilist", locale: "en_NG", type: "website", ...(url ? { url } : {}), images: [shareImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description: summary, images: [{ url: shareImage.url, alt: shareImage.alt }] },
  };
};
