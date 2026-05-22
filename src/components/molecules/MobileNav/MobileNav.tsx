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

import NavMenu from "../NavMenu/NavMenu";
import NavActions from "../NavActions/NavActions";
import Logo from "@/components/atoms/Logo/Logo";
import Container from "@/components/atoms/Container/Container";

const MobileNav = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="max-w-75 w-full">
          <SheetHeader>
            <SheetTitle>
              <Logo
                className="max-w-30 w-full min-w-25"
                height={24}
                width={140}
              />
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Container>
            <div className="mt-8 flex flex-col gap-20">
              <NavMenu className="flex-col" />
              <NavActions className="flex-col" />
            </div>
          </Container>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
