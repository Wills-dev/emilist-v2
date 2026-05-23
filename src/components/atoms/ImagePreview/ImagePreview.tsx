"use client";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div className="max-w-4xl w-full max-h-[90vh]  overflow-auto">
        <Image
          src={imageUrl}
          alt={alt}
          className="w-full h-auto rounded-lg"
          width={800}
          height={700}
        />
      </div>
    </motion.div>
  );
};

export default ImagePreview;
