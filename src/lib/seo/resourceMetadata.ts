import "server-only";
import { isPublicResource } from "./resourceVisibility";
import { createPageMetadata } from "./metadata";
import { fetchPublicData, publicImage, record, text } from "./publicData";

export async function jobMetadata(id: string, path = `/marketplace/jobs/${encodeURIComponent(id)}`) {
  const payload = await fetchPublicData("/jobs/fetch-job-by-id", { id, reviewsPage: 1, reviewsLimit: 1 });
  const job = record(record(payload).job ?? payload);
  if (job._id !== id || !isPublicResource("jobs", job)) return createPageMetadata({ title: "Job Details", path, index: false });
  return createPageMetadata({ title: text(job.title) || "Job Details", description: text(job.description), path });
}
export async function materialMetadata(id: string, reviews = false) {
  const basePath = `/marketplace/materials/${encodeURIComponent(id)}`;
  const payload = await fetchPublicData(`/material/fetch-product/${encodeURIComponent(id)}`);
  const product = record(record(payload).product ?? payload);
  if (product._id !== id || !isPublicResource("materials", product)) return createPageMetadata({ title: "Material Details", path: basePath, index: false });
  const name = text(product.name) || "Material";
  return createPageMetadata({ title: reviews ? `${name} Reviews` : name, description: text(product.description), path: `${basePath}${reviews ? "/reviews" : ""}`, image: publicImage(product.images) });
}
export async function expertMetadata(id: string, path = `/marketplace/experts/${encodeURIComponent(id)}`, reviews = false) {
  const payload = await fetchPublicData(`/business/fetch-single-business/${encodeURIComponent(id)}`);
  const business = record(record(payload).business ?? payload);
  if (business._id !== id || !isPublicResource("experts", business)) return createPageMetadata({ title: "Expert Profile", path, index: false });
  const name = text(business.businessName) || text(business.name) || "Expert";
  const description = text(business.description) || text(business.businessDescription) || `Explore ${name}'s services, experience and customer reviews on Emilist.`;
  return createPageMetadata({ title: reviews ? `${name} Reviews` : name, description, path, image: publicImage(business.displayImage) || publicImage(business.businessImages) });
}
export async function profileMetadata(kind: string, id: string, reviews = false) {
  const path = `/profiles/${encodeURIComponent(kind)}/${encodeURIComponent(id)}${reviews ? "/reviews" : ""}`;
  if (kind === "artisan") return expertMetadata(id, `/marketplace/experts/${encodeURIComponent(id)}${reviews ? "/reviews" : ""}`, reviews);
  // Employer/merchant views depend on a job/material query context and are not
  // independent public profiles. Do not index context-free or duplicate URLs.
  return createPageMetadata({ title: kind === "merchant" ? "Merchant Profile" : "Employer Profile", path, index: false });
}
