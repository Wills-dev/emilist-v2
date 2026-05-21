import Container from "@/components/atoms/Container/Container";
import Logo from "@/components/atoms/Logo/Logo";
import MobileNav from "@/components/molecules/MobileNav/MobileNav";
import NavActions from "@/components/molecules/NavActions/NavActions";
import NavMenu from "@/components/molecules/NavMenu/NavMenu";

const Navbar = () => {
  return (
    <div className="w-full bg-[#FBFFF8]">
      <Container>
        <header className="w-full flex justify-between items-center lg:gap-30 md:gap-20 lg:h-26.25 h-24">
          <Logo />
          <div className="flex items-center flex-1 w-full justify-between gap-10 max-lg:hidden">
            <NavMenu />
            <NavActions />
          </div>
          <MobileNav />
        </header>
      </Container>
    </div>
  );
};

export default Navbar;
