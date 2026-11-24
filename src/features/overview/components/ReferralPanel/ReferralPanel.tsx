"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { ArrowRight, Share2, UserRoundPlus } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import type { DashboardOverview } from "../../types/api";
import { inviteFriend, recordReferralShare } from "../../api";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

const ReferralPanel = ({ userId, referral }: { userId: string; referral: DashboardOverview["referral"] }) => {
  const sharingRef = useRef(false);
  const invitingRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const client = useQueryClient();
  const refresh = () => client.invalidateQueries({ queryKey: ["dashboard-overview", userId] });
  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `emilist-referral-${referral.code}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };
  const invite = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invitingRef.current) return;
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (!email) return;
    invitingRef.current = true;
    setIsInviting(true);
    try { await inviteFriend(email); form.reset(); toast.success("Invitation sent."); await refresh(); }
    catch (error) { promiseErrorFunction(error); }
    finally { invitingRef.current = false; setIsInviting(false); }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(referral.link); toast.success("Referral link copied."); }
    catch { toast.error("Unable to copy the referral link."); }
  };

  const shareReferral = async () => {
    if (sharingRef.current) return;

    sharingRef.current = true;
    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({ title: "Join Emilist", text: referral.shareText, url: referral.link });
      } else {
        await navigator.clipboard.writeText(referral.link);
        toast.success("Referral link copied.");
      }
      try { await recordReferralShare(userId); await refresh(); }
      catch { toast.error("Link shared, but the share count could not be updated."); }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      toast.error("Unable to share the referral link. Please try again.");
    } finally {
      sharingRef.current = false;
      setIsSharing(false);
    }
  };

  return (
    <section className="grid bg-white sm:grid-cols-2 gap-4 p-4">
      <div className="bg-[#F9F9F9] px-4 pt-6 pb-8 space-y-6">
        <h2 className="flex items-center gap-3 border-b border-[#E5E5E5] pb-2 font-exo font-semibold">
          <span className="rounded border border-[#E5E5E5] px-2 py-1.5">
            <UserRoundPlus className="size-4" />
          </span>
          Invite your friends to Emilist
        </h2>
        <ul className="list-disc space-y-6 pl-5 text-xs leading-5 text-[#8A8D8B]">
          <li>
            Invite friends and earn amazing rewards like discounts, exclusive
            deals and so much more
          </li>
          <li>
            Tell your friends to scan your unique QR code to sign up and we’ll
            handle the rest
          </li>
          <li>
            You can download the code or share a referral link to your friends
            from your dashboard
          </li>
        </ul>
        <form onSubmit={invite} className="space-y-3">
          <label className="block text-sm">Invite by email<input name="email" type="email" required disabled={isInviting} placeholder="friend@example.com" className="mt-2 w-full rounded-lg border border-[#E5E5E5] bg-white p-3" /></label>
          <button type="submit" disabled={isInviting} className="text-sm text-[#18A154] underline disabled:opacity-50">{isInviting ? "Sending…" : "Send invitation"}</button>
        </form>
      </div>
      <div className="flex min-h-64 flex-col items-center justify-center border border-[#E5E5E5] bg-[#F4F7F5] p-5 text-center space-y-6">
        <p className="text-sm text-[#667085]">Scan the QR code below</p>
        <div className="grid size-44 place-items-center bg-white">
          <QRCodeCanvas
            ref={canvasRef}
            value={referral.qrValue}
            size={176}
            level="H"
            fgColor="#168442"
            bgColor="#FFFFFF"
            marginSize={4}
            aria-label="Your referral sign-up QR code"
          />
        </div>
        <p className="text-xs text-[#667085]">{referral.invitedCount} invited · {referral.sharedCount} shares</p>
        <button type="button" onClick={copy} className="text-sm text-[#18A154] underline">Copy referral link</button>
        <div className="mt-4 flex gap-10 text-sm text-[#18A154]">
          <button type="button" onClick={download} className="underline">
            Download <ArrowRight className="inline size-4" />
          </button>
          <button
            type="button"
            onClick={shareReferral}
            disabled={isSharing}
            aria-busy={isSharing}
            className="disabled:cursor-not-allowed disabled:opacity-60 underline "
          >
            Share <Share2 className="inline size-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReferralPanel;
