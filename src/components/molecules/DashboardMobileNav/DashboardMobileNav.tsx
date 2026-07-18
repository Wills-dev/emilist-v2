"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/components/atoms/Logo/Logo";
import Container from "@/components/atoms/Container/Container";
import DashboardNavCard from "@/components/atoms/DashboardNavCard/DashboardNavCard";
import DownloadMobile from "@/components/atoms/DownloadMobile/DownloadMobile";
import WarningIcon from "@/components/atoms/icons/WarningIcon";
import Logout from "@/components/atoms/icons/Logout";
import UserIdentity from "../UserIdentity/UserIdentity";
import JoinPro from "@/components/atoms/JoinPro/JoinPro";

import { routes } from "@/lib/helpers/routes";
import { dashboardMainLinks } from "@/lib/constants";
import MessageIcon2 from "@/components/atoms/icons/MessageIcon2";

const DashboardMobileNav = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="max-w-75 w-full">
          <SheetHeader>
            <SheetTitle>
              <Logo
                className="max-w-30 w-full min-w-25"
                height={20}
                width={120}
                href={routes?.dashboard}
              />
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Container>
            <div className="mt-8 flex flex-col justify-between gap-20">
              {" "}
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
                <JoinPro />
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
          </Container>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardMobileNav;
