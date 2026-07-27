import clsx from "clsx";

const InfoItem = ({
  variant = "xs",
  className = "text-[#737774]",
  icon,
  value,
  label,
  labelClass,
  iconClass,
}: {
  variant?: "xs" | "sm" | "base";
  className?: string;
  icon?: React.ReactElement;
  value: string;
  label?: string;
  labelClass?: string;
  iconClass?: string;
}) => {
  const variants = {
    xs: {
      parentStyle: "flex items-center gap-1 whitespace-nowrap",
      iconStyle: "text-xs",
      valueStyle: "sm:text-xs text-[10px] truncate tracking-[-3%]",
      labelStyle: "sm:text-xs text-[10px] tracking-[-3%]",
    },
    sm: {
      parentStyle: "flex items-center gap-1 whitespace-nowrap",
      iconStyle: "text-sm",
      valueStyle: "text-sm truncate tracking-[-3%]",
      labelStyle: "text-sm tracking-[-3%]",
    },
    base: {
      parentStyle: "flex items-center gap-1 whitespace-nowrap",
      iconStyle: "text-base",
      valueStyle: "text-base truncate tracking-[-3%]",
      labelStyle: "text-base tracking-[-3%]",
    },
  };

  const styles = variants[variant];

  return (
    <div className={clsx(className, styles?.parentStyle)}>
      {icon && (
        <span className={clsx(styles?.iconStyle, iconClass)}>{icon}</span>
      )}
      <p className={clsx(styles?.labelStyle, labelClass)}>{label}</p>
      <p className={clsx(styles?.valueStyle)}>{value}</p>
    </div>
  );
};

export default InfoItem;
