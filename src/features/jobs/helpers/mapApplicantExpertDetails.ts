import { mapBusinessExpertDetails } from "@/features/businesses/helpers/mapBusinessExpertDetails";
import type { BusinessProfile } from "@/features/businesses/types/profile";
import type { JobApplicant } from "../types/jobManagement";

export const mapApplicantExpertDetails = (applicant: JobApplicant, profile: BusinessProfile) => mapBusinessExpertDetails(profile, applicant);
