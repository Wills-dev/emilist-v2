"use client";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import FormNav from "@/components/molecules/FormNav/FormNav";

const NewExeprtLayout = ({
  children,
  imgUrl = "/assets/images/profile-preview.svg",
}: {
  children: React.ReactNode;
  imgUrl?: string;
}) => {
  return (
    <div className="min-h-screen h-screen w-full flex flex-col relative">
      <div className="w-full border-b border-[#E5E5E5] bg-white absolute top-0 z-50 left-0 right-0 ">
        <FormNav />
      </div>
      <Container variant="large">
        <div className="h-screen w-full overflow-hidden">
          <div className="flex h-full">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-156.25 w-full h-full min-h-full bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] flex justify-center items-center max-xl:hidden"
              >
                <Image
                  src={imgUrl}
                  alt="preview"
                  width={625}
                  height={860}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="h-full flex-1 w-full overflow-y-auto">
              <div className="h-20 w-full" />
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewExeprtLayout;
