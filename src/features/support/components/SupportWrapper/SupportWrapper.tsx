"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";

import SupportContact from "../SupportContact/SupportContact";
import SupportFaqPanel from "../SupportFaqPanel/SupportFaqPanel";

const supportContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const supportSectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" as const },
  },
};

const SupportWrapper = () => (
  <Container variant="small">
    <motion.main
      variants={supportContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative grid items-stretch gap-4 py-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]"
    >
      <div className="flex min-w-0 flex-col gap-4">
        <motion.div variants={supportSectionVariants}>
          <SupportContact />
        </motion.div>

        <motion.div
          variants={supportSectionVariants}
          className="group relative h-[clamp(320px,55vw,616px)] max-h-154 flex-none overflow-hidden rounded-lg bg-[#D8D8D8]"
        >
          <Image
            src="/assets/images/support-img.svg"
            alt="Emilist customer support representatives ready to help"
            fill
            priority
            sizes="(min-width: 1280px) 70vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </motion.div>
      </div>

      <motion.div variants={supportSectionVariants} className="min-h-0">
        <SupportFaqPanel />
      </motion.div>

      <motion.a
        variants={supportSectionVariants}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        href="mailto:help@emilist.com.ng"
        aria-label="Chat with Emilist support"
        className="fixed bottom-5 right-5 z-10 flex size-14 items-center justify-center rounded-full bg-[#25C269] text-white shadow-lg xl:absolute xl:bottom-9 xl:right-7"
      >
        <MessageCircle className="size-7" strokeWidth={1.8} />
      </motion.a>
    </motion.main>
  </Container>
);

export default SupportWrapper;
