import Image from "next/image";
import InputWrapper from "@/components/molecules/InputWrapper/InputWrapper";
import SelectWrapper from "@/components/molecules/SelectWrapper/SelectWrapper";
import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/Textarea/Textarea";
import { insuranceCoverageTypes } from "@/features/experts/constants";
import { credentialDocumentUrl } from "../../helpers/credentialForm";
import type { ExpertCertification, ExpertMembership, ExpertInsurance } from "../../types/expertService";

export type CredentialTab = "certifications" | "memberships" | "insurances";
export default function CredentialFields({ tab, item, index, onChange }: {
  tab: CredentialTab; item: ExpertCertification | ExpertMembership | ExpertInsurance; index: number;
  onChange: (field: string, value: string | boolean) => void;
}) {
  const name = (field: string) => `${tab}-${index}-${field}`;
  const text = (field: string, title: string, value: string, type = "text") => <InputWrapper title={title} name={name(field)} value={value ?? ""} type={type} onChange={(event) => onChange(field, event.target.value)} />;
  if (tab === "certifications") {
    const cert = item as ExpertCertification;
    const document = credentialDocumentUrl(cert.certificate);
    return <>
      {text("issuingOrganisation", "Issuing organisation", cert.issuingOrganisation)}
      {text("verificationNumber", "Verification number", cert.verificationNumber)}
      {text("issuingDate", "Issued date", cert.issuingDate, "date")}
      <div className="space-y-2"><Label htmlFor={name("expiringDate")} title="Expiry date" /><Input id={name("expiringDate")} type="date" value={cert.expiringDate} disabled={cert.isCertificateExpire} onChange={(event) => onChange("expiringDate", event.target.value)} /></div>
      <label className="col-span-full flex items-center gap-2 text-sm text-[#474C48]"><input type="checkbox" checked={cert.isCertificateExpire} onChange={(event) => onChange("isCertificateExpire", event.target.checked)} className="size-4 accent-[#25C269]" />This certificate doesn’t expire</label>
      <div className="col-span-full space-y-2">
        <p className="text-sm text-[#474C48]">Certificate</p>
        {document ? <a href={document} target="_blank" rel="noopener noreferrer" className="block space-y-2 text-sm text-[#6667FF]">
          {/\.(png|jpe?g|webp|gif|avif)(?:[?#]|$)/i.test(document) && <div className="relative h-48 overflow-hidden rounded-lg border border-[#E4E7EC] bg-[#F9F9F9]"><Image src={document} alt={`Certificate from ${cert.issuingOrganisation || "issuing organisation"}`} fill sizes="(max-width: 640px) 100vw, 640px" className="object-contain" unoptimized /></div>}
          <span className="underline">View certificate</span>
        </a> : <p className="text-sm text-[#737774]">No certificate uploaded.</p>}
      </div>
    </>;
  }
  if (tab === "memberships") {
    const membership = item as ExpertMembership;
    return <>
      {text("organisation", "Organisation", membership.organisation)}
      {text("positionHeld", "Position held", membership.positionHeld)}
      {text("startDate", "Start date", membership.startDate, "date")}
      <div className="space-y-2"><Label htmlFor={name("endDate")} title="End date" /><Input id={name("endDate")} type="date" value={membership.endDate} disabled={membership.isMembershipExpire} onChange={(event) => onChange("endDate", event.target.value)} /></div>
      <label className="col-span-full flex items-center gap-2 text-sm text-[#474C48]"><input type="checkbox" checked={membership.isMembershipExpire} onChange={(event) => onChange("isMembershipExpire", event.target.checked)} className="size-4 accent-[#25C269]" />This membership doesn’t end</label>
    </>;
  }
  const insurance = item as ExpertInsurance;
  const coverageOptions = insurance.coverage && !insuranceCoverageTypes.some((option) => option.value === insurance.coverage) ? [...insuranceCoverageTypes, { label: insurance.coverage, value: insurance.coverage }] : insuranceCoverageTypes;
  return <>
    {text("issuingOrganisation", "Issuing organisation", insurance.issuingOrganisation)}
    <SelectWrapper title="Type of coverage" name={name("coverage")} value={insurance.coverage} options={coverageOptions} onChange={(event) => onChange("coverage", event.target.value)} />
    <div className="col-span-full space-y-2"><Label htmlFor={name("description")} title="Short description of what is covered" /><Textarea id={name("description")} rows={5} value={insurance.description} onChange={(event) => onChange("description", event.target.value)} /></div>
  </>;
}
