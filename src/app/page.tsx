"use client";

import PopOver from "@/components/atoms/PopOver/PopOver";
import QuestionBtn from "@/components/atoms/QuestionBtn/QuestionBtn";
import AppSection from "@/components/organisms/AppSection/AppSection";
import CustomerCommentSection from "@/components/organisms/CustomerCommentSection/CustomerCommentSection";
import CustomerServiceSection from "@/components/organisms/CustomerServiceSection/CustomerServiceSection";
import FaqSection from "@/components/organisms/FaqSection/FaqSection";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import HireExpertGuideSection from "@/components/organisms/HireExpertGuideSection/HireExpertGuideSection";
import ServiceSection from "@/components/organisms/ServiceSection/ServiceSection";
import TrustSection from "@/components/organisms/TrustSection/TrustSection";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { photoTips } from "@/lib/constants";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <PopOver actionBtn={<QuestionBtn />}>
        <span className="flex flex-col gap-4">
          {photoTips?.map((tip) => (
            <span key={tip} className="text-sm">
              {tip}
            </span>
          ))}
        </span>
      </PopOver>
      <ServiceSection />
      <TrustSection />
      <CustomerCommentSection />
      <HireExpertGuideSection />
      <CustomerServiceSection />
      <FaqSection />
      <AppSection />
    </MainLayout>
  );
}
