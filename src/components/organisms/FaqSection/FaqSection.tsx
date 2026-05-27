"use client";

import { useState } from "react";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import SeeMoreBtn from "@/components/atoms/SeeMoreBtn/SeeMoreBtn";
import FaqCard from "@/components/molecules/FaqCard/FaqCard";

import { faqQuestions } from "@/lib/constants/faqs";
import { routes } from "@/lib/helpers/routes";

const FaqSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="md:pb-20 md:pt-15 pb-10 pt-7.5 bg-[#F4F7F5]">
      <Container>
        <div className="sm:space-y-10 space-y-6">
          <div className="">
            <span className="bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] p-2 pt-1.5 rounded-[6px] text-[#FBFFF8] text-xs font-medium">
              General
            </span>
            <div className="flex items-center justify-between flex-wrap">
              <SectionTitle title="Frequently asked questions" />
              <div className="flex justify-end flex-1">
                <SeeMoreBtn href={routes?.faq} title="I have more questions" />
              </div>
            </div>
          </div>
          <div className="sm:px-6 px-2 grid md:grid-cols-2 grid-cols-1 gap-6">
            {faqQuestions?.map((faq, index) => (
              <FaqCard
                key={index}
                question={faq.quaestion}
                answer={faq.answer}
                id={faq.id}
                index={index}
                toggleFaq={toggleFaq}
                openId={openId}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FaqSection;
