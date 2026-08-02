"use client";

import UserInitial from "@/components/atoms/UserInitial/UserInitial";
import { User } from "@/store/authStore";

const OverviewWelcomeHeader = ({ user }: { user: User | null }) => (
  <div className="flex min-h-18.75 items-center gap-4 bg-white p-4 ">
    <div className="sm:hidden">
      <UserInitial />
    </div>
    <div className="flex items-center flex-wrap sm:gap-4 gap-1 flex-1 w-full sm:justify-between">
      <h1 className="font-exo text-xl font-semibold sm:text-3xl tr">
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
  </div>
);

export default OverviewWelcomeHeader;
