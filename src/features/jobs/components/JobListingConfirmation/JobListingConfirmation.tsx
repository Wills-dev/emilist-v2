import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { jobListingLabels, type JobListingAction } from "../../helpers/jobListingActions";

export default function JobListingConfirmation({ action, title, busy, onConfirm, onClose }: { action: JobListingAction; title: string; busy: boolean; onConfirm: () => void; onClose: () => void }) {
  const description = action === "delete" ? `Permanently delete “${title}” and its applications? This cannot be undone.` : action === "delist" ? `Hide “${title}” from public search? This won’t pause or cancel the job. You can list it again later.` : `Make “${title}” visible in public job search again?`;
  return <ModalWrapper open title={jobListingLabels[action]} description={description} onClose={(open) => { if (!open && !busy) onClose(); }} showCloseButton={!busy} className="max-w-md!">
    <div className="flex gap-3 pt-5">
      <Button variant="default" className="h-11 flex-1" disabled={busy} onClick={onClose}>Cancel</Button>
      <Button variant={action === "delete" ? "danger" : "primary"} className="h-11 flex-1" loading={busy} onClick={onConfirm}>{jobListingLabels[action]}</Button>
    </div>
  </ModalWrapper>;
}
