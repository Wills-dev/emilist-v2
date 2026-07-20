import clsx from "clsx";

const FilterSectionWrapper = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}) => {
  const variants = {
    primary: "bg-[#F6F7F9] p-6 space-y-3.75 w-full",
    secondary:
      "border border-[#F1F2F9] pt-5 px-4 pb-4 bg-[#FCFCFC] rounded-[12.75px] space-y-5.25",
    tertiary: "bg-white p-6 space-y-3.75 w-full",
  };

  const styles = variants[variant];

  return <div className={clsx(styles)}>{children}</div>;
};

export default FilterSectionWrapper;
