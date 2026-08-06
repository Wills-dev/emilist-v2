"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DashboardNavCard from "@/components/atoms/DashboardNavCard/DashboardNavCard";
import Logo from "@/components/atoms/Logo/Logo";
import BriefcaseIcon from "@/components/atoms/icons/BriefcaseIcon";
import Logout from "@/components/atoms/icons/Logout";
import MessageIcon2 from "@/components/atoms/icons/MessageIcon2";
import WarningIcon from "@/components/atoms/icons/WarningIcon";
import JoinPro from "@/components/atoms/JoinPro/JoinPro";
import UserIdentity from "../UserIdentity/UserIdentity";

import { dashboardMainLinks } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";
import { useLogout } from "@/features/auth/hooks/useLogout";

const DashboardMobileNav = () => {
  const [open, setOpen] = useState(false);
  const { logout, isLoggingOut } = useLogout();
  const closeDrawer = () => setOpen(false);
  const handleLogout = () => {
    if (isLoggingOut) return;
    logout();
    closeDrawer();
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button type="button" aria-label="Open dashboard menu">
            <Menu className="size-6" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[min(307px,calc(100vw-56px))] max-w-none gap-0 border-0 p-0"
        >
          <div className="absolute left-4 top-5">
            <Logo
              href={routes.dashboard}
              width={120}
              height={28}
              className="w-30"
            />
          </div>
          <SheetHeader className="sr-only">
            <SheetTitle>Dashboard menu</SheetTitle>
            <SheetDescription>
              Navigate your Emilist dashboard.
            </SheetDescription>
          </SheetHeader>

          <div className="flex h-full flex-col px-4 pb-8 pt-20">
            <nav aria-label="Dashboard navigation">
              <div className="space-y-4">
                {dashboardMainLinks.map((link) => (
                  <DashboardNavCard
                    key={link.label}
                    href={link.href}
                    activePath={link.activePath}
                    label={link.label}
                    icon={link.icon}
                    onClick={closeDrawer}
                    className="w-full"
                  />
                ))}
              </div>

              <div className="my-4 border-t border-[#D9D9D9]" />

              <div className="space-y-4">
                <DashboardNavCard
                  href={routes.dashboardLinks.offerService}
                  label="Services"
                  icon={<BriefcaseIcon className="size-[1em]" />}
                  onClick={closeDrawer}
                  className="w-full"
                />
                <DashboardNavCard
                  href={routes.dashboardLinks.messages}
                  label="Messages"
                  icon={<MessageIcon2 />}
                  onClick={closeDrawer}
                  className="w-full"
                />
                <DashboardNavCard
                  href={routes.dashboardLinks.support}
                  label="Support"
                  icon={<WarningIcon />}
                  onClick={closeDrawer}
                  className="w-full"
                />
                <DashboardNavCard
                  onClick={handleLogout}
                  label={isLoggingOut ? "Logging out..." : "Logout"}
                  icon={<Logout />}
                  className="w-full"
                  variant="sidebar"
                />
              </div>

              <div className="my-4 border-t border-[#D9D9D9]" />
              <JoinPro />
            </nav>

            <div className="mt-auto border-t border-[#D9D9D9] pt-7">
              <UserIdentity onClick={closeDrawer} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardMobileNav;
