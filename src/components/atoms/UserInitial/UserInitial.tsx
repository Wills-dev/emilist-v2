"use client";

import { useStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/helpers/routes";

const UserInitial = ({ onClick }: { onClick?: () => void }) => {
  const currentUser = useStore((state) => state.currentUser);

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
      {currentUser?.image ? (
        <Image src={currentUser.image} alt="Profile" fill className="object-cover" />
      ) : (
        initials || "E"
      )}
    </Link>
  );
};

export default UserInitial;
