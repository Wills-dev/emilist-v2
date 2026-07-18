"use client";

import DashboardNavCard from "@/components/atoms/DashboardNavCard/DashboardNavCard";
import DownloadMobile from "@/components/atoms/DownloadMobile/DownloadMobile";
import Logout from "@/components/atoms/icons/Logout";
import MessageIcon2 from "@/components/atoms/icons/MessageIcon2";
import WarningIcon from "@/components/atoms/icons/WarningIcon";
import UserIdentity from "@/components/molecules/UserIdentity/UserIdentity";
import { dashboardMainLinks } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";

const DashboardSidebar = () => {
  return (
    <aside className="fixed bg-white max-w-78 w-full h-screen pt-20 max-lg:hidden">
      <div className="py-10 px-4 h-full flex flex-col justify-between gap-10">
        <div className="space-y-4">
          {dashboardMainLinks?.map((link) => (
            <DashboardNavCard
              key={link?.label}
              href={link?.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>
        <div className="space-y-4 pb-10">
          <DownloadMobile />
          <div className="py-2 space-y-2 w-full border-y border-[#D9D9D9]">
            <DashboardNavCard
              href={routes?.dashboardLinks?.messages}
              label="Messages"
              icon={<MessageIcon2 />}
              className="w-full"
            />
            <DashboardNavCard
              href={routes?.dashboardLinks?.support}
              label="Support"
              icon={<WarningIcon />}
              className="w-full"
            />
            <DashboardNavCard
              onClick={() => {}}
              label="Logout"
              icon={<Logout />}
              className="w-full"
              variant="sidebar"
            />
          </div>
          <UserIdentity />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
