import type { UserExpertService } from "../types/expertService";

export const credentialDateInput = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
};

export const credentialFormDraft = (expert: UserExpertService): UserExpertService => ({
  ...expert,
  certifications: expert.certifications.map((item) => ({ ...item, issuingDate: credentialDateInput(item.issuingDate), expiringDate: credentialDateInput(item.expiringDate) })),
  memberships: expert.memberships.map((item) => ({ ...item, startDate: credentialDateInput(item.startDate), endDate: credentialDateInput(item.endDate) })),
});

export const credentialDocumentUrl = (value?: string) => {
  try { const url = new URL(value ?? ""); return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined; }
  catch { return undefined; }
};
