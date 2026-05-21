import NavLink from "@/components/atoms/NavLink/NavLink";

import { navbarLinks } from "@/lib/constants";

const NavMenu = ({ className = "items-center" }: { className?: string }) => {
  return (
    <nav className={`flex lg:gap-10 gap-6 ${className}`}>
      {navbarLinks?.map((navItem, i) => (
        <NavLink
          key={i}
          href={navItem?.href}
          title={navItem?.title}
          icon={navItem?.icon}
          variant="header"
        />
      ))}
    </nav>
  );
};

export default NavMenu;
