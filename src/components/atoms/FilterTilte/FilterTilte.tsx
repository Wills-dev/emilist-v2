const FilterTitle = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactElement;
}) => {
  return (
    <div className="flex items-center gap-1.75 text-sm text-[#8A8D8B]">
      {icon && icon}
      <h6 className="font-exo uppercase font-semibold">{title}</h6>
    </div>
  );
};

export default FilterTitle;
