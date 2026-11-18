"use client";

import { Trash2 } from "lucide-react";
import { useDeleteBusiness } from "../../hooks/useDeleteBusiness";
import SettingsConfirmationModal from "../SettingsConfirmationModal/SettingsConfirmationModal";

export default function DeleteBusinessButton({ businessId, businessName }: { businessId: string; businessName: string }) {
  const deletion = useDeleteBusiness(businessId);
  return (
    <>
      <button type="button" aria-label={`Delete ${businessName}`} onClick={deletion.requestDelete} className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#FFF0F3] text-[#FF5D7A] hover:bg-[#FFE1E8] focus-visible:outline-2 focus-visible:outline-[#FF5D7A]">
        <Trash2 className="size-4" />
      </button>
      <SettingsConfirmationModal open={deletion.open} onClose={deletion.changeOpen} title="Delete Business" message={`Delete “${businessName}”? This will permanently remove this business or service and cannot be undone.`} onConfirm={deletion.confirmDelete} loading={deletion.busy} confirmLabel="Delete" confirmVariant="danger" />
    </>
  );
}
