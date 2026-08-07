"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Select from "@/components/atoms/Select/Select";
import { currencies } from "@/lib/constants/currencies";
import { rateUnits } from "@/lib/constants/rateUnits";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatNumbers";
import { UserExpertService } from "../../types/expertService";

interface Props { open: boolean; onClose: (open: boolean) => void; expert: UserExpertService; onSave: (expert: UserExpertService) => void; loading: boolean; }

const EditExpertServiceModal = ({ open, onClose, expert, onSave, loading }: Props) => {
  const [draft, setDraft] = useState(expert);
  const update = (field: keyof UserExpertService, value: string | string[]) => setDraft((current) => ({ ...current, [field]: value }));

  return (
    <ModalWrapper open={open} onClose={onClose} title="Edit Your Service" className="max-w-3xl!" headerClassName="border-b border-[#ECECEC] pb-4">
      <div className="grid grid-cols-2 gap-5 pt-5 max-sm:grid-cols-1">
        <div className="space-y-2"><Label htmlFor="expert-services" title="Services offered" /><Input id="expert-services" value={draft.services.join(", ")} onChange={(e) => update("services", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></div>
        <div className="space-y-2"><Label htmlFor="expert-coverage" title="Coverage areas" /><Input id="expert-coverage" value={draft.coverageArea.join(", ")} onChange={(e) => update("coverageArea", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></div>
        {([ ["businessName", "Business name"], ["yearFounded", "Year founded"], ["numberOfEmployee", "Number of employees"], ["businessAddress", "Business address"], ["businessState", "State"], ["businessCountry", "Country"] ] as const).map(([field, label]) => <div key={field} className={`space-y-2 ${field === "businessAddress" ? "col-span-2 max-sm:col-span-1" : ""}`}><Label htmlFor={`expert-${field}`} title={label} /><Input id={`expert-${field}`} value={draft[field]} onChange={(e) => update(field, e.target.value)} /></div>)}
        <div className="space-y-2">
          <Label htmlFor="expert-starting-price" title="Starting price" />
          <div className="grid grid-cols-[90px_1fr_130px] gap-2 max-sm:grid-cols-[80px_1fr]">
            <Select aria-label="Currency" value={draft.currency} onChange={(e) => update("currency", e.target.value)} options={currencies} />
            <Input id="expert-starting-price" value={formatInputTextNumberWithCommas(draft.startingPrice)} onChange={(e) => update("startingPrice", formatInputTextNumberWithCommas(e.target.value))} inputMode="decimal" placeholder="25,000" />
            <div className="max-sm:col-span-2"><Select aria-label="Rate unit" value={draft.rateUnit} onChange={(e) => update("rateUnit", e.target.value)} options={rateUnits} /></div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expert-notice-period" title="Notice period" />
          <Input id="expert-notice-period" value={draft.noticePeriod} onChange={(e) => update("noticePeriod", e.target.value)} placeholder="3 days" />
        </div>
      </div>
      <div className="mt-7 flex gap-3"><Button variant="default" className="h-11 flex-1" onClick={() => onClose(false)}>Cancel</Button><Button variant="primary" className="h-11 flex-1" loading={loading} onClick={() => onSave(draft)}>Save Changes</Button></div>
    </ModalWrapper>
  );
};
export default EditExpertServiceModal;
