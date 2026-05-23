"use client";

import { useState } from "react";

import ShareIcon from "@/components/atoms/icons/ShareIcon";
import IconWrapper from "@/components/atoms/IconWrapper/IconWrapper";
import ShareModal from "../ShareModal/ShareModal";

const ShareButton = ({
  id,
  type,
  name,
}: {
  id: string;
  name: string;
  type: "user" | "expert" | "job" | "material";
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconWrapper onClick={() => setOpen(true)}>
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
