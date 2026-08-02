"use client";

import { useStore } from "@/store/authStore";

import Button from "@/components/atoms/Button/Button";
import WelcomeIcon from "@/components/atoms/icons/WelcomeIcon";

const ProfileWelcomeCard = () => {
  const openModal = useStore((state) => state.openModal);

  return (
    <section className="flex min-h-80 flex-col items-center justify-center bg-white px-4 py-10 text-center border border-[#F1F2F9] space-y-10">
      <div className="">
        <WelcomeIcon />
      </div>
      <div className="max-w-98.5 w-full">
        <h2 className="font-exo font-bold text-[#474C48]">
          Welcome to Emilist
        </h2>
        <p className="mt-2 text-xs text-[#8A8D8B]">
          Set up your profile to experience Emilist without limits
        </p>
        <Button
          variant="primary"
          className="mt-5 h-8 w-full max-w-md rounded-none text-xs font-semibold"
          onClick={() => openModal("complete-profile")}
        >
          Complete Profile
        </Button>
      </div>
    </section>
  );
};

export default ProfileWelcomeCard;
