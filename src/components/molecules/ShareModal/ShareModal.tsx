"use client";

import { useShareActions } from "@/features/reports/hooks/useShareActions";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import SocialIconBtn from "@/components/atoms/SocialIconBtn/SocialIconBtn";

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
  const { title, link, copied, copyLink, nativeShare, whatsapp, shareX, facebook } = useShareActions(id, type, name);

  return (
    <ModalWrapper title={title} open={isOpen} onClose={onClose}>
      <p className="text-sm text-gray-400 uppercase tracking-wider mb-3">
        Share via
      </p>
      <div className="grid grid-cols-3 gap-2 mb-5">
        <SocialIconBtn
          onClick={whatsapp}
          imgUrl="/assets/images/wa-whatsapp-icon.svg"
          type="whatsapp"
        />
        <SocialIconBtn
          onClick={shareX}
          imgUrl="/assets/images/x-social-media-logo-icon.svg"
          type="X"
        />
        <SocialIconBtn
          onClick={facebook}
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
            {link}
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
