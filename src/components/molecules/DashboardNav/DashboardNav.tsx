import Container from "@/components/atoms/Container/Container";
import JoinPro from "@/components/atoms/JoinPro/JoinPro";
import Logo from "@/components/atoms/Logo/Logo";
import UserInitial from "@/components/atoms/UserInitial/UserInitial";
import { routes } from "@/lib/helpers/routes";
import DashboardNavIconWrap from "../DashboardNavIconWrap/DashboardNavIconWrap";
import DashboardMobileNav from "../DashboardMobileNav/DashboardMobileNav";

const DashboardNav = () => {
  return (
    <div className="lg:bg-white bg-[#F4F7F5] fixed w-full lg:border-b border-[#E5E5E5] z-10">
      <Container>
        <header
          id="header"
          className="w-full flex justify-between items-center lg:gap-30 md:gap-20 h-20"
        >
          <DashboardMobileNav />
          <div className="max-lg:hidden">
            <Logo href={routes?.dashboard} />
          </div>
          <div className="flex items-center gap-16">
            <div className="max-lg:hidden">
              <JoinPro />
            </div>
            <DashboardNavIconWrap />
            <div className="max-lg:hidden">
              <UserInitial />
            </div>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default DashboardNav;
