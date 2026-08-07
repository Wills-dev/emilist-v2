"use client";

import { motion, useReducedMotion } from "framer-motion";

import AppSection from "@/components/organisms/AppSection/AppSection";
import CustomerCommentSection from "@/components/organisms/CustomerCommentSection/CustomerCommentSection";
import CustomerServiceSection from "@/components/organisms/CustomerServiceSection/CustomerServiceSection";
import FaqSection from "@/components/organisms/FaqSection/FaqSection";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import HireExpertGuideSection from "@/components/organisms/HireExpertGuideSection/HireExpertGuideSection";
import ServiceSection from "@/components/organisms/ServiceSection/ServiceSection";
import TrustSection from "@/components/organisms/TrustSection/TrustSection";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  };
  const transition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const sections = [
    { key: "services", content: <ServiceSection /> },
    { key: "trust", content: <TrustSection /> },
    {
      key: "comments",
      content: <CustomerCommentSection />,
    },
    {
      key: "hire-guide",
      content: <HireExpertGuideSection />,
    },
    {
      key: "customer-service",
      content: <CustomerServiceSection />,
    },
    { key: "faq", content: <FaqSection /> },
    { key: "app", content: <AppSection /> },
  ];

  return (
    <MainLayout>
      <HeroSection />
      {sections.map((section) => (
        <motion.div
          key={section.key}
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 72,
                  scale: 0.96,
                  filter: "blur(10px)",
                }
          }
          whileInView={visible}
          viewport={{ once: true, amount: 0.18 }}
          transition={transition}
        >
          {section.content}
        </motion.div>
      ))}
    </MainLayout>
  );
}
