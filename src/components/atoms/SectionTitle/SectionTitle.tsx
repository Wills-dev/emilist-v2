import ArrowUp from "../icons/ArrowUp";

const SectionTitle = ({
  title,
  showIcon = true,
}: {
  title: string;
  showIcon?: boolean;
}) => {
  return (
    <h2 className="flex items-center font-exo font-semibold gap-2 text-[clamp(1.5rem,5vw,2.25rem)] leading-[clamp(1.8rem,6vw,4.5rem)]">
      {title}
      <span className="max-sm:hidden">{showIcon && <ArrowUp />}</span>
    </h2>
  );
};

export default SectionTitle;
