const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={` 2xl:max-w-360 w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-20  ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
