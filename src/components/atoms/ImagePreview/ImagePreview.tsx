"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { motion } from "framer-motion";

const ImagePreview = ({
  onCancel,
  imageUrl,
  alt,
}: {
  onCancel: () => void;
  imageUrl: string;
  alt: string;
}) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} preview`}
      className="fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center bg-black/80 p-4"
      onClick={onCancel}
    >
      <div
        className="max-h-[90dvh] w-full max-w-4xl overflow-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt={alt}
          className="w-full h-auto rounded-lg"
          width={800}
          height={700}
        />
      </div>
    </motion.div>,
    document.body,
  );
};

export default ImagePreview;
