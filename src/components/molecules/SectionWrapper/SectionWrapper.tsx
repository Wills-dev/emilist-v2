"use client";

import { motion } from "framer-motion";

import clsx from "clsx";

import Container from "@/components/atoms/Container/Container";

const SectionWrapper = ({
  variant = "horizontal",
  containerVariant = "left",
  containerClassName = "",
  className = "",
  children,
}: {
  variant?: "horizontal" | "vertical";
  containerVariant?: "center" | "left" | "right" | "small";
  containerClassName?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const variants = {
    horizontal: "flex items-center max-sm:flex-col gap-6 overflow-x-auto",
    vertical: "flex flex-wrap gap-6",
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
      <Container variant={containerVariant} className={containerClassName}>
        <div className={clsx(className, styles)}>{children}</div>
      </Container>
    </motion.section>
  );
};

export default SectionWrapper;
