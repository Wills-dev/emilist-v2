"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

  const goBack = () => {
    if (onClose !== undefined) {
      onClose();
      return;
    }
    router.back();
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="cursor-pointer flex items-center gap-2 bg-[#F6F7F9] hover:shadow transition-all duration-300 h-8.5 px-2 rounded-[10px] text-[#737774] text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-[1em] h-[1em]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>

      <span>Back</span>
    </button>
  );
}
