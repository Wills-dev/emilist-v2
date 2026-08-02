"use client";

import UserInitial from "@/components/atoms/UserInitial/UserInitial";
import { User } from "@/store/authStore";

const OverviewWelcomeHeader = ({ user }: { user: User | null }) => (
  <div className="flex min-h-18.75 items-center gap-4 bg-white p-4 sm:justify-between">
    <div className="sm:hidden">
      <UserInitial />
    </div>
    <h1 className="font-exo text-xl font-semibold sm:text-3xl">
      Hello, {user?.firstName || "there"}
    </h1>
    <div className="text-sm sm:flex sm:items-center sm:gap-2">
      <span className="max-sm:hidden sm:text-[15px] text-sm font-semibold">
        User ID:
      </span>
      <span className="rounded-md bg-[#F9F9F9] px-2 py-1 text-[#18A154] sm:text-sm text-xs">
        {user?.uniqueId || "—"}
      </span>
    </div>
  </div>
);

export default OverviewWelcomeHeader;
