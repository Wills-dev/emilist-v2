"use client";

import { useState } from "react";

import FaqCard from "@/components/molecules/FaqCard/FaqCard";
import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";

import {
  SupportFaqCategory,
  supportFaqCategories,
  supportFaqs,
} from "../../constants/supportFaqs";

const SupportFaqPanel = () => {
  const [category, setCategory] = useState<SupportFaqCategory>("general");
  const [openId, setOpenId] = useState<number | null>(null);

  const handleCategoryChange = (nextCategory: SupportFaqCategory) => {
    setCategory(nextCategory);
    setOpenId(null);
  };

  return (
    <aside className="flex h-full min-h-0 flex-col bg-white px-4 py-5" aria-labelledby="support-faq-title">
      <div className="border-b border-[#E7EAE8] pb-4">
        <h2 id="support-faq-title" className="font-exo text-xl font-semibold text-[#1F2923]">
          FAQs
        </h2>
      </div>

      <div className="py-4">
        <SegmentedTabs
          options={supportFaqCategories}
          value={category}
          onChange={handleCategoryChange}
          ariaLabel="FAQ categories"
          responsive={false}
          size="compact"
        />
      </div>

      <div className="space-y-3 overflow-y-auto pr-1 xl:min-h-0 xl:flex-1">
        {supportFaqs[category].map((faq, index) => (
          <FaqCard
            key={faq.id}
            id={faq.id}
            index={index}
            question={faq.question}
            answer={faq.answer}
            openId={openId}
            toggleFaq={(id) =>
              setOpenId((current) => (current === id ? null : id))
            }
            variant="compact"
          />
        ))}
      </div>
    </aside>
  );
};

export default SupportFaqPanel;
