const OverlaySquareWrapper = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`absolute ${className} flex flex-wrap justify-center `}>
      {children}
    </div>
  );
};

export default OverlaySquareWrapper;
