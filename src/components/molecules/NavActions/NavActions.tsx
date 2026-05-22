import ArrowUp from "@/components/atoms/icons/ArrowUp";
import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";

const NavActions = ({ className = "items-center" }: { className?: string }) => {
  const isUserLoggedIn = false;

  return (
    <div className={`flex  gap-4 ${className}`}>
      {isUserLoggedIn ? (
        <Button href={routes?.dashboard} variant="primary">
          Dashboard
        </Button>
      ) : (
        <>
          <Button href={routes?.login} variant="secondary">
            Login
          </Button>
          <Button href={routes?.signUp} variant="primary">
            <span className="block">Sign Up</span>
            <ArrowUp />
          </Button>
        </>
      )}
    </div>
  );
};

export default NavActions;
