import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Button from "@/components/atoms/Button/Button";
import type { useComparisonModal } from "../hooks/useComparisonModal";
import type { ComparisonItem, ComparisonType } from "../types";

export default function ComparisonModal({ type, item, modal }: { type: ComparisonType; item: ComparisonItem; modal: ReturnType<typeof useComparisonModal> }) {
  const plural = type === "material" ? "materials" : type === "expert" ? "experts" : "jobs";
  return <ModalWrapper open={modal.open} onClose={modal.changeOpen} title={`Compare ${plural}`} className="sm:max-w-md" description="Add this item to compare, or view your comparison list." showCloseButton={!modal.busy}>
    <div className="space-y-5 pt-4">
      <p className="break-words rounded-lg bg-[#F4F7F5] p-4 font-medium text-[#303632]">{item.name}</p>
      {modal.checkFailed && <p role="alert" className="text-sm text-[#FF5D7A]">Unable to check your comparison list. <button type="button" onClick={modal.retry} className="underline">Try again</button></p>}
      {modal.selected && <p role="status" className="text-sm text-[#07883E]">Added to your comparison.</p>}
      <div className="flex flex-col gap-3">
        <Button variant="primary" className="h-11 w-full" onClick={modal.addItem} disabled={(modal.selected && !modal.canRemove) || modal.busy || modal.checkFailed} loading={modal.busy}>{modal.selected ? modal.canRemove ? "Remove from comparison" : "Added to comparison" : "Add to comparison"}</Button>
        <Button variant="default" className="h-11 w-full" onClick={modal.viewComparison} disabled={modal.busy}>View compared {plural}</Button>
      </div>
    </div>
  </ModalWrapper>;
}
