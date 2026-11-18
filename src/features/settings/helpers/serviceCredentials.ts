import type { UserExpertService } from "../types/expertService";

export type CredentialType = "certification" | "membership" | "insurance";
export const credentialKeys = { certification: "certifications", membership: "memberships", insurance: "insurances" } as const;
export interface CredentialCard { id: string; title: string; fields: Array<{ label: string; value: string }>; document?: string; }
const date = (value: string) => {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "—" : parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

export const serviceCredentials = (expert: UserExpertService): Array<{ type: CredentialType; title: string; items: CredentialCard[] }> => [
  { type: "certification", title: "Certifications", items: expert.certifications.map((item) => ({ id: item.id, title: item.issuingOrganisation || "Certification", document: item.certificate, fields: [
    { label: "Verification number", value: item.verificationNumber || "—" }, { label: "Issued", value: date(item.issuingDate) }, { label: "Expires", value: item.isCertificateExpire ? date(item.expiringDate) : "Doesn’t expire" },
  ] })) },
  { type: "membership", title: "Memberships", items: expert.memberships.map((item) => ({ id: item.id, title: item.organisation || "Membership", fields: [
    { label: "Position", value: item.positionHeld || "—" }, { label: "Start date", value: date(item.startDate) }, { label: "End date", value: item.isMembershipExpire ? date(item.endDate) : "Ongoing" },
  ] })) },
  { type: "insurance", title: "Insurance", items: expert.insurances.map((item) => ({ id: item.id, title: item.issuingOrganisation || "Insurance", fields: [
    { label: "Coverage", value: item.coverage || "—" }, { label: "Description", value: item.description || "—" },
  ] })) },
];
