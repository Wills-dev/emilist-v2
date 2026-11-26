import type { UserExpertService } from "../types/expertService";

export type CredentialType = "certification" | "membership" | "insurance";
export const credentialKeys = { certification: "certifications", membership: "memberships", insurance: "insurances" } as const;
export interface CredentialCard { id: string; title: string; fields: Array<{ label: string; value: string }>; document?: string; }
const date = (value: string) => {
  if (!value) return "N/A";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "N/A" : parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

export const serviceCredentials = (expert: UserExpertService): Array<{ type: CredentialType; title: string; items: CredentialCard[] }> => [
  { type: "certification", title: "Certifications", items: expert.certifications.map((item) => ({ id: item.id, title: item.issuingOrganisation || "Certification", document: item.certificate, fields: [
    { label: "Verification number", value: item.verificationNumber || "N/A" }, { label: "Issued", value: date(item.issuingDate) }, { label: "Expires", value: item.isCertificateExpire ? "Doesn’t expire" : date(item.expiringDate) },
  ] })) },
  { type: "membership", title: "Memberships", items: expert.memberships.map((item) => ({ id: item.id, title: item.organisation || "Membership", fields: [
    { label: "Position", value: item.positionHeld || "N/A" }, { label: "Start date", value: date(item.startDate) }, { label: "End date", value: item.isMembershipExpire ? "Ongoing" : date(item.endDate) },
  ] })) },
  { type: "insurance", title: "Insurance", items: expert.insurances.map((item) => ({ id: item.id, title: item.issuingOrganisation || "Insurance", fields: [
    { label: "Coverage", value: item.coverage || "N/A" }, { label: "Description", value: item.description || "N/A" },
  ] })) },
];
