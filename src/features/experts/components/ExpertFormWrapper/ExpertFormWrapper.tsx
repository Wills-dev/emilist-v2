"use client";

import { AnimatePresence } from "framer-motion";

import Dot from "@/components/atoms/Dot/Dot";
import ExpertProfileForm from "@/components/molecules/forms/ExpertProfileForm/ExpertProfileForm";
import ExpertBusinessForm from "@/components/molecules/forms/ExpertBusinessForm/ExpertBusinessForm";
import ExpertiseForm from "@/components/molecules/forms/ExpertiseForm/ExpertiseForm";

import { expertTabs } from "../../constants";
import { useExpertTabs } from "../../hooks/useExpertTabs";
import FormTitleWrapper from "@/components/atoms/FormTitleWrapper/FormTitleWrapper";

const ExpertFormWrapper = () => {
  const { tab, switchTab } = useExpertTabs();

  const currentTab = expertTabs.find((item) => {
    return item.id === tab;
  });

  return (
    <div className="pt-10 pb-16 sm:px-16 px-6 w-full">
      <div className="max-w-170.25 w-full space-y-12">
        <div className="space-y-4 w-full border-b border-[#E5E5E5] sm:pb-4 pb-2">
          <FormTitleWrapper
            title={currentTab?.title || ""}
            iconUrl={currentTab?.iconUrl}
          />

          <div className="flex items-end justify-between gap-10">
            <p className="max-w-111.75 w-full text-[#737774] leading-6 max-sm:text-sm">
              {currentTab?.desc}
            </p>
            <div className="w-fit flex items-center gap-1.5 h-7.5 bg-[#F4F7F5] p-2.25 rounded-[9px]">
              {expertTabs.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => switchTab(item.id)}
                  className="cursor-pointer"
                >
                  <Dot
                    className="w-3 h-3"
                    variant={item.id === tab ? "primary" : "default"}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {tab === "profile" && <ExpertProfileForm />}
          {tab === "business-profile" && <ExpertBusinessForm />}
          {tab === "experiences" && <ExpertiseForm />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpertFormWrapper;
