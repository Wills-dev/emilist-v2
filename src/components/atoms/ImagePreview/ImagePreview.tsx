"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogClose } from "@/components/ui/dialog/dialog";
import { useImagePreview } from "@/lib/hooks/useImagePreview";

const ImagePreview = ({ onCancel, imageUrl, alt, unoptimized = false }: {
  onCancel: () => void; imageUrl: string; alt: string; unoptimized?: boolean;
}) => {
  const { close } = useImagePreview(onCancel);
  return (
    <Dialog open onOpenChange={close}>
      <DialogPortal>
        <DialogOverlay className="z-[9998] bg-black/80" />
        <DialogPrimitive.Content asChild aria-describedby={undefined}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-[9999] w-[calc(100vw-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 outline-none">
            <DialogTitle className="sr-only">{alt} preview</DialogTitle>
            <div className="max-h-[calc(100dvh-2rem)] overflow-auto rounded-lg">
              <Image src={imageUrl} alt={alt} unoptimized={unoptimized} width={800} height={700} className="h-auto max-h-[calc(100dvh-2rem)] w-full rounded-lg object-contain" />
            </div>
            <DialogClose className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-black/70 text-white focus-visible:ring-2 focus-visible:ring-white" aria-label="Close image preview"><X className="size-5" /></DialogClose>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default ImagePreview;
