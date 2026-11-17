"use client";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useTargetModal } from "../../hooks/useTargetModal";
import type { ReportTarget, ReportCurrency } from "../../types/api";
import TargetForm from "../TargetForm/TargetForm";
const TargetModal = ({ mode, target, year, month, currency, onClose }: {
  mode: "set" | "review"; target: ReportTarget; year: number; month: number; currency: ReportCurrency; onClose: (open: boolean) => void;
}) => {
  const modal = useTargetModal(target, year, month, currency, onClose);
  return <ModalWrapper open onClose={modal.close} title={mode === "set" ? "Set Targets" : "Review Targets"} className="max-w-125! rounded-2xl p-6" headerClassName="border-b border-[#E7EAE8] pb-5" titleClassName="text-[#474C48]">
    <div className="space-y-5 pt-5">
      <fieldset disabled={modal.saving} className="border-b border-[#E7EAE8] pb-5"><legend className="mb-3 text-sm text-[#555B57]">Target Duration</legend>
        <OptionToggle name="target-duration" ariaLabel="Target duration" value={modal.duration} onChange={modal.changeDuration} options={[{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Annual" }]} />
      </fieldset>
      <p className="text-xs text-[#737774]">{modal.duration === "yearly" ? year : `${new Date(year, month - 1).toLocaleString("en-US", { month: "long" })} ${year}`} · {currency}</p>
      {modal.query.isPending ? <div role="status" aria-label="Loading targets" className="grid gap-5 sm:grid-cols-2">{[0, 1, 2, 3].map((value) => <div key={value} className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-11 w-full" /></div>)}</div> : modal.query.isError ? <div role="alert" className="text-sm text-[#737774]">Unable to load targets. <button type="button" onClick={modal.retry} className="text-[#18A154]">Try again</button></div> : <TargetForm key={`${modal.duration}-${year}-${month}-${currency}`} target={modal.query.data} onSave={modal.save} saving={modal.saving} />}
    </div>
  </ModalWrapper>;
};
export default TargetModal;
