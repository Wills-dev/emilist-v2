import { formatNoticePeriod } from "@/features/settings/helpers/formatNoticePeriod";
import type { CompareExpertItem } from "@/features/experts/types";
import type { BusinessListItem } from "../types/list";
import { mapExpertListItem } from "./expertList";

const languageName = (code: string) => {
  try { return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code; }
  catch { return code; }
};

export const mapComparedBusiness = (business: BusinessListItem): CompareExpertItem => {
  const expert = mapExpertListItem(business);
  return {
    id: expert.id, name: expert.businessName, image: expert.imgUrl,
    price: expert.price, currency: expert.currency, period: expert.period,
    rating: expert.rating, reviewCount: expert.noOfReviews,
    credentials: business.credentials ?? [],
    about: business.businessDescription?.replace(/<[^>]*>/g, " ") ?? "",
    experience: business.experienceLevelLabel || expert.level,
    serviceCategory: expert.serviceType, jobsCompleted: expert.noOfCompletedJobs,
    noticePeriod: formatNoticePeriod(String(business.noticePeriod ?? "")),
    location: expert.location,
    languages: business.languages?.map(languageName).join(", ") || "—",
    insurance: (business.insurances ?? business.insurance)?.map((insurance) => [insurance.issuingOrganisation, insurance.coverage].filter(Boolean).join(" — ")).join("; ") || "—",
  };
};
