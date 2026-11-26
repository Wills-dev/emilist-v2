import type { Certification, Membership, Insurance } from "../types";
import { isEmptyCertification } from "./validateCertifications";
import { isEmptyMembership } from "./validateMemberships";
import { isEmptyInsurance } from "./validateInsurances";

export const getExperienceError = (certifications: Certification[], memberships: Membership[], insurances: Insurance[]) => {
  for (const [index, item] of certifications.entries()) {
    if (isEmptyCertification(item)) continue;
    for (const [field, label] of [["issuingOrganisation", "Issuing organisation"], ["verificationNumber", "Verification number"], ["issuingDate", "Issuing date"], ["expiringDate", "Expiry date"]] as const) {
      if (field === "expiringDate" && item.isCertificateExpire) continue;
      if (!item[field].trim()) return { kind: "certificate" as const, index, field: `certificate-${index}-${field}`, message: `Certificate ${index + 1}: ${label} is required.` };
    }
  }
  for (const [index, item] of memberships.entries()) {
    if (isEmptyMembership(item)) continue;
    for (const [field, label] of [["organisation", "Organisation"], ["positionHeld", "Position held"], ["startDate", "Start date"], ["endDate", "End date"]] as const) {
      if (field === "endDate" && item.isMembershipExpire) continue;
      if (!item[field].trim()) return { kind: "membership" as const, index, field: `membership-${index}-${field}`, message: `Membership ${index + 1}: ${label} is required.` };
    }
  }
  for (const [index, item] of insurances.entries()) {
    if (isEmptyInsurance(item)) continue;
    for (const [field, label] of [["issuingOrganisation", "Issuing organisation"], ["coverage", "Type of coverage"], ["description", "Description"]] as const) {
      if (!item[field].trim()) return { kind: "insurance" as const, index, field: `insurance-${index}-${field}`, message: `Insurance ${index + 1}: ${label} is required.` };
    }
  }
};
