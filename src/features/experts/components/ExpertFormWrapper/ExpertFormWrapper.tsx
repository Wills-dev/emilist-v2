"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Dot from "@/components/atoms/Dot/Dot";
import ExpertProfileForm from "@/components/molecules/forms/ExpertProfileForm/ExpertProfileForm";
import ExpertBusinessForm from "@/components/molecules/forms/ExpertBusinessForm/ExpertBusinessForm";
import ExpertiseForm from "@/components/molecules/forms/ExpertiseForm/ExpertiseForm";

import { expertTabs } from "../../constants";
import { useExpertTabs } from "../../hooks/useExpertTabs";
import FormTitleWrapper from "@/components/atoms/FormTitleWrapper/FormTitleWrapper";
import { useExpertStore } from "@/store/expert/expertStore";
import { useStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/helpers/routes";

const ExpertFormWrapper = ({ dashboard = false }: { dashboard?: boolean }) => {
  const { tab, switchTab } = useExpertTabs({ skipProfile: dashboard });
  const setTab = useExpertStore((state) => state.setTab);
  const setProfile = useExpertStore((state) => state.setProfile);
  const currentUser = useStore((state) => state.currentUser);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const router = useRouter();

  useEffect(() => {
    if (!dashboard) return;

    if (isAuthInitialized && !currentUser?.isProfileComplete) {
      router.replace(routes.completeProfile);
      return;
    }

    setTab("business-profile");
    if (!currentUser?.isProfileComplete) return;

    setProfile({
      firstName: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      countryCode: currentUser.countryCode ?? "+234",
      mobile: currentUser.mobile ?? "",
      languages: currentUser.languages ?? [],
      houseAddress: currentUser.houseAddress ?? "",
      state: currentUser.state ?? "",
      city: currentUser.city ?? "",
      country: currentUser.country ?? "",
      bio: currentUser.bio ?? "",
      image: null,
    });
  }, [currentUser, dashboard, isAuthInitialized, router, setProfile, setTab]);

  const activeTab = dashboard && tab === "profile" ? "business-profile" : tab;

  const currentTab = expertTabs.find((item) => {
    return item.id === activeTab;
  });

  return (
    <div className={`w-full pb-16 pt-10 sm:px-16 px-6 ${dashboard ? "mx-auto max-w-202" : ""}`}>
      <div className="max-w-170.25 w-full space-y-12">
        <div className="space-y-4 w-full border-b border-[#E5E5E5] sm:pb-4 pb-2">
          <FormTitleWrapper
            title={
              dashboard && activeTab === "business-profile"
                ? "Offer a service"
                : currentTab?.title || ""
            }
            iconUrl={currentTab?.iconUrl}
          />

          <div className="flex items-end justify-between gap-10">
            <p className="max-w-111.75 w-full text-[#737774] leading-6 max-sm:text-sm">
              {currentTab?.desc}
            </p>
            <div className="w-fit flex items-center gap-1.5 h-7.5 bg-[#F4F7F5] p-2.25 rounded-[9px]">
              {(dashboard ? expertTabs.slice(1) : expertTabs).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => switchTab(item.id)}
                  className="cursor-pointer"
                >
                  <Dot
                    className="w-3 h-3"
                    variant={item.id === activeTab ? "primary" : "default"}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {!dashboard && activeTab === "profile" && <ExpertProfileForm />}
          {activeTab === "business-profile" && (
            <ExpertBusinessForm dashboard={dashboard} />
          )}
          {activeTab === "experiences" && (
            <ExpertiseForm dashboard={dashboard} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpertFormWrapper;
