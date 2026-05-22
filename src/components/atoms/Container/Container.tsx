import clsx from "clsx";

const Container = ({
  children,
  className = "",
  variant = "center",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "center" | "left" | "right";
}) => {
  const variants = {
    center: "2xl:max-w-360 w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-20",
    left: "2xl:container 2xl:mx-auto w-full pl-4 sm:pl-6 md:pl-10 lg:pl-20",
    right: "2xl:container 2xl:mx-auto w-full pr-4 sm:pr-6 md:pr-10 lg:pr-20",
  };

  const styles = variants[variant];
  return <div className={clsx(styles, className)}>{children}</div>;
};

export default Container;
