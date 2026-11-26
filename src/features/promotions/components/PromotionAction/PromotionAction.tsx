"use client";
import { useState } from "react";
import { useStore } from "@/store/authStore";
import PromoteBtn from "@/components/atoms/PromoteBtn/PromoteBtn";
import { canPromote, type PromotionType } from "../../helpers/promotion";
import PromoteListingModal from "../PromoteListingModal/PromoteListingModal";

export default function PromotionAction({ id, type, ownerId, label }: { id: string; type: PromotionType; ownerId?: string; label?: string }) {
  const userId = useStore((state) => state.currentUser?._id);
  const [open, setOpen] = useState(false);
  if (!id || !canPromote(userId, ownerId)) return null;
  return <>
    <PromoteBtn label={label} onClick={() => setOpen(true)} />
    {open && <PromoteListingModal id={id} type={type} ownerId={ownerId!} onClose={() => setOpen(false)} />}
  </>;
}
