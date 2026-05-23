"use client";

import { useState } from "react";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import SocialIconBtn from "@/components/atoms/SocialIconBtn/SocialIconBtn";

import { routes } from "@/lib/helpers/routes";
import { openShare } from "@/lib/helpers/shareInfo";
import { Copy, Share2 } from "lucide-react";

const ShareModal = ({
  isOpen,
  onClose,
  id,
  type,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  type: "user" | "expert" | "job" | "material";
  name: string;
}) => {
  const [copied, setCopied] = useState(false);

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL;

  const shareTemplates = {
    job: {
      title: "Job Opportunity on Emilist",
      link: `${webUrl}${routes?.marketplace?.jobInfo(id)}`,
      shareText: `Check out this job: "${name}" on Emilist. Explore and apply now before it's closed.`,
    },
    material: {
      title: "Learning Material on Emilist",
      link: `${webUrl}${routes?.marketplace?.materialInfo(id)}`,
      shareText: `I found this material "${name}" on Emilist. You might find it useful too.`,
    },
    expert: {
      title: "Expert Profile on Emilist",
      link: `${webUrl}${routes?.marketplace?.expertInfo(id)}`,
      shareText: `Discover ${name} on Emilist. Connect and explore their services and experience.`,
    },
    user: {
      title: "Profile on Emilist",
      link: `${webUrl}${routes?.profile?.(id)}`,
      shareText: `Check out ${name}'s profile on Emilist. You might want to connect or collaborate.`,
    },
  };

  const shareConfig = shareTemplates[type];

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareConfig.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: shareConfig.title,
        text: shareConfig.shareText,
        url: shareConfig.link,
      });
    } else {
      await copyLink();
    }
  };

  return (
    <ModalWrapper title={shareConfig?.title} open={isOpen} onClose={onClose}>
      <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
        Share via
      </p>
      <div className="grid grid-cols-3 gap-2 mb-5">
        <SocialIconBtn
          onClick={() =>
            openShare("whatsapp", shareConfig.link, shareConfig?.shareText)
          }
          imgUrl="/assets/images/wa-whatsapp-icon.svg"
          type="whatsapp"
        />
        <SocialIconBtn
          onClick={() =>
            openShare("X", shareConfig.link, shareConfig?.shareText)
          }
          imgUrl="/assets/images/x-social-media-logo-icon.svg"
          type="X"
        />
        <SocialIconBtn
          onClick={() =>
            openShare("facebook", shareConfig.link, shareConfig?.shareText)
          }
          imgUrl="/assets/images/facebook-square-icon.svg"
          type="facebook"
        />
      </div>
      <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">
        Or copy link
      </p>
      <div className="mb-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-wrap">
          <span className="flex-1 text-xs text-gray-400 truncate">
            {shareConfig.link}
          </span>
          <button
            onClick={copyLink}
            className="flex items-center gap-1 text-xs text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-white transition-colors"
          >
            <Copy size={12} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {copied && (
          <p className="text-[10px] text-green-600">
            Link copied succussfully. Paste to share
          </p>
        )}
      </div>
      <button
        onClick={nativeShare}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Share2 size={16} />
        More options
      </button>
    </ModalWrapper>
  );
};

export default ShareModal;
