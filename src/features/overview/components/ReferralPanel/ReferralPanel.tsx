"use client";

import { useRef, useState } from "react";
import { ArrowRight, Share2, UserRoundPlus } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import { User } from "@/store/authStore";

const ReferralPanel = ({ user }: { user: User | null }) => {
  const sharingRef = useRef(false);
  const [isSharing, setIsSharing] = useState(false);
  const webUrl = (
    process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const downloadUrl = `${webUrl}/download`;
  const referralUrl = `${
    webUrl
  }/auth/register?ref=${encodeURIComponent(user?.uniqueId || "")}`;

  const shareReferral = async () => {
    if (sharingRef.current) return;

    sharingRef.current = true;
    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({ title: "Join Emilist", url: referralUrl });
        return;
      }

      await navigator.clipboard.writeText(referralUrl);
      toast.success("Referral link copied.");
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
      </div>
      <div className="flex min-h-64 flex-col items-center justify-center border border-[#E5E5E5] bg-[#F4F7F5] p-5 text-center space-y-6">
        <p className="text-sm text-[#667085]">Scan the QR code below</p>
        <a
          href={downloadUrl}
          aria-label="Download the Emilist mobile app"
          className="grid size-44 place-items-center bg-white"
        >
          <QRCodeSVG
            value={downloadUrl}
            size={176}
            level="H"
            fgColor="#168442"
            bgColor="#FFFFFF"
            aria-label="QR code to download the Emilist mobile app"
          />
        </a>
        <div className="mt-4 flex gap-10 text-sm text-[#18A154]">
          <a href={downloadUrl} className="underline">
            Download <ArrowRight className="inline size-4" />
          </a>
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
