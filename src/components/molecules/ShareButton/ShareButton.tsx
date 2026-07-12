"use client";

import { useState } from "react";

import ShareIcon from "@/components/atoms/icons/ShareIcon";
import IconWrapper from "@/components/atoms/IconWrapper/IconWrapper";
import ShareModal from "../ShareModal/ShareModal";

const ShareButton = ({
  id,
  type,
  name,
  className = "text-sm px-2 py-1.5",
}: {
  id: string;
  name: string;
  type: "user" | "expert" | "job" | "material";
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconWrapper onClick={() => setOpen(true)} className={className}>
        <ShareIcon />
      </IconWrapper>
      <ShareModal
        isOpen={open}
        onClose={() => setOpen(false)}
        id={id}
        type={type}
        name={name}
      />
    </>
  );
};

export default ShareButton;
