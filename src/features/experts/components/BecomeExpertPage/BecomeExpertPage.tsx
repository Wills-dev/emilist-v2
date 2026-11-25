"use client";

import ExpertFormWrapper from "@/features/experts/components/ExpertFormWrapper/ExpertFormWrapper";
import NewExeprtLayout from "@/features/experts/components/NewExeprtLayout/NewExeprtLayout";

import { expertTabs } from "@/features/experts/constants";
import { useExpertTabs } from "@/features/experts/hooks/useExpertTabs";

const BecomeExpertPage = () => {
  const { tab } = useExpertTabs();

  const currentTab = expertTabs.find((item) => {
    return item.id === tab;
  });

  return (
    <NewExeprtLayout imgUrl={currentTab?.bgImg}>
      <ExpertFormWrapper />
    </NewExeprtLayout>
  );
};

export default BecomeExpertPage;
