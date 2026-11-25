"use client";

import { useStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/helpers/routes";
import { useState } from "react";

const UserInitial = ({ onClick }: { onClick?: () => void }) => {
  const currentUser = useStore((state) => state.currentUser);
  const image = currentUser?.image || currentUser?.displayImage;
  const [failedOptimizedImage, setFailedOptimizedImage] = useState("");
  const [failedOriginalImage, setFailedOriginalImage] = useState("");
  const useOriginal = Boolean(image && failedOptimizedImage === image);

  const initials = `${currentUser?.firstName?.charAt(0) ?? ""}${
    currentUser?.lastName?.charAt(0) ?? ""
  }`.toUpperCase();

  return (
    <Link
      href={routes.dashboardLinks.settings}
      aria-label="Open user settings"
      onClick={onClick}
      className="relative flex md:h-12 h-10 md:w-12 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#6B7280] text-white md:text-lg"
    >
      {image && failedOriginalImage !== image ? (
        <Image
          key={`${image}:${useOriginal}`}
          src={image}
          alt="Profile"
          fill
          sizes="(min-width: 768px) 48px, 40px"
          className="object-cover"
          unoptimized={useOriginal}
          onError={() => useOriginal ? setFailedOriginalImage(image) : setFailedOptimizedImage(image)}
        />
      ) : (
        initials || "E"
      )}
    </Link>
  );
};

export default UserInitial;
