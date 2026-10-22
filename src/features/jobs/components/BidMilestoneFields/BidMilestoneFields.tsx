import { formatInputTextNumberWithCommas, removeNumberCommas } from "@/lib/helpers/formatNumbers";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";

import type { BidMilestoneDraft } from "../../helpers/jobApplication";

const BidMilestoneFields = ({ milestones, currency, onChange }: {
  milestones: BidMilestoneDraft[];
  currency: string;
  onChange: (index: number, field: "amount" | "achievement", value: string) => void;
}) => (
  <div className="space-y-4">
    {milestones.map((milestone, index) => (
      <fieldset key={milestone.milestoneId} className="space-y-3 rounded-lg border border-[#ECECEC] p-4">
        <legend className="px-1 font-medium">Milestone {index + 1}</legend>
        <Label htmlFor={`bid-amount-${index}`} title={`Your price (${currency})`} />
        <Input id={`bid-amount-${index}`} type="text" inputMode="decimal" required readOnly={index === milestones.length - 1} aria-describedby={index === milestones.length - 1 ? "bid-allocation-note" : undefined} value={formatInputTextNumberWithCommas(milestone.amount)} onChange={(e) => onChange(index, "amount", removeNumberCommas(formatInputTextNumberWithCommas(e.target.value)))} />
        {index === milestones.length - 1 && <p className="text-xs text-[#707471]">Automatically calculated from your remaining bid amount.</p>}
        <Label htmlFor={`bid-achievement-${index}`} title="Achievement" />
        <textarea id={`bid-achievement-${index}`} required value={milestone.achievement} onChange={(e) => onChange(index, "achievement", e.target.value)} className="min-h-24 w-full rounded-[10px] bg-[#ECECEC] p-3 outline-none focus:ring-1 focus:ring-[#25C269]" />
      </fieldset>
    ))}
  </div>
);

export default BidMilestoneFields;
