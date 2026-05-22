"use client";

import { motion } from "framer-motion";

import clsx from "clsx";

import Container from "@/components/atoms/Container/Container";

const SectionWrapper = ({
  variant = "horizontal",
  containerVariant = "left",
  className = "",
  children,
}: {
  variant?: "horizontal" | "vertical";
  containerVariant?: "center" | "left" | "right";
  className?: string;
  children: React.ReactNode;
}) => {
  const variants = {
    horizontal: "flex items-center gap-6 overflow-x-auto",
    vertical: "flex ",
  };

  const styles = variants[variant];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <Container variant={containerVariant}>
        <div className={clsx(className, styles)}>{children}</div>
      </Container>
    </motion.section>
  );
};

export default SectionWrapper;
