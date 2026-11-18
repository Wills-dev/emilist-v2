"use client";
import SettingsConfirmationModal from "@/features/settings/components/SettingsConfirmationModal/SettingsConfirmationModal";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import { useToggleBusinessMute } from "../../hooks/useToggleBusinessMute";

export default function BusinessFlagButton({ businessId, muted = false }: { businessId: string; muted?: boolean }) {
  const flag = useToggleBusinessMute(businessId, muted);
  return <>
    <FlagActionBtn onClick={flag.requestToggle} disabled={flag.busy} actionTitle={flag.muted ? "Unflag expert" : "Flag expert"} />
    <SettingsConfirmationModal open={flag.confirmOpen} onClose={flag.changeConfirmOpen} title={flag.muted ? "Unflag Expert" : "Flag Expert"} message={flag.muted ? "Unflag this expert? Their business can appear in your marketplace again." : "Flag this expert? Their business will be hidden from your marketplace until you unflag them."} onConfirm={flag.confirmToggle} loading={flag.busy} confirmLabel={flag.muted ? "Unflag expert" : "Flag expert"} confirmVariant={flag.muted ? "primary" : "danger"} />
  </>;
}
