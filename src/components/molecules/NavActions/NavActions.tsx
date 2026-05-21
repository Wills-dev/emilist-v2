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
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1em] h-[1em]"
            >
              <path
                d="M4.44531 10.7935L10.7945 4.44434M10.7945 10.7935V4.44434H4.44531"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </>
      )}
    </div>
  );
};

export default NavActions;
