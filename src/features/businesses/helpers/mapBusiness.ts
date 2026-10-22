import type { UserExpertService } from "@/features/settings/types/expertService";
import type { BusinessDto } from "../types";

export const mapBusiness = (business: BusinessDto): UserExpertService => ({
  id: business._id,
  service: business.service ?? business.services?.[0] ?? "Business",
  services: business.services ?? [],
  coverageArea: business.coverageArea ?? [],
  businessName: business.businessName ?? "Unnamed business",
  yearFounded: String(business.yearFounded ?? ""),
  numberOfEmployee: String(business.numberOfEmployee ?? ""),
  businessAddress: business.businessAddress ?? "",
  businessState: business.businessState ?? "",
  businessCountry: business.businessCountry ?? "",
  startingPrice: String(business.startingPrice ?? ""),
  currency: business.currency ?? "NGN",
  rateUnit: business.rateUnit ?? "",
  noticePeriod: String(business.noticePeriod ?? ""),
  businessDescription: business.businessDescription ?? "",
  image: business.displayImage ?? business.image ?? "",
  businessImages: (business.businessImages ?? [])
    .map((image) => typeof image === "string" ? image : image.imageUrl)
    .filter(Boolean),
  rating: business.rating ?? 0,
  reviews: Array.isArray(business.reviews) ? business.reviews.length : business.reviews ?? 0,
  level: business.level ?? "",
  isVerified: business.isVerified ?? false,
  certifications: business.certifications ?? business.certification ?? [],
  memberships: business.memberships ?? business.membership ?? [],
  insurances: business.insurances ?? business.insurance ?? [],
});
