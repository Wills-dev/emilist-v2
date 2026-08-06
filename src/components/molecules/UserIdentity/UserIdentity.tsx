"use client";

import UserInitial from "@/components/atoms/UserInitial/UserInitial";
import { useStore } from "@/store/authStore";
import Link from "next/link";
import { routes } from "@/lib/helpers/routes";

const UserIdentity = ({ onClick }: { onClick?: () => void }) => {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div className="flex items-center gap-3">
      <UserInitial onClick={onClick} />
      <Link
        href={routes.dashboardLinks.settings}
        onClick={onClick}
        className="min-w-0 space-y-0.5 transition-colors hover:text-[#18A154]"
      >
        <h6 className="capitalize font-exo text-sm font-medium truncate">
          {currentUser?.firstName} {currentUser?.lastName}
        </h6>
        <p className="text-xs text-[#5E625F] truncate"> {currentUser?.email}</p>
      </Link>
    </div>
  );
};

export default UserIdentity;
