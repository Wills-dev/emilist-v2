import clsx from "clsx";

const CustomCheckbox = ({ variant }: { variant: "active" | "inactive" }) => {
  const variants = {
    active: {
      parent: "border-[#25C269] border-2",
      child: "bg-[#25C269]",
    },
    inactive: {
      parent: "border-[#8A8D8B] border-2",
      child: "bg-inherit",
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={clsx(
        styles.parent,
        "w-6 h-6 p-[1.5px] overflow-hidden rounded-full",
      )}
    >
      <div className={clsx(styles.child, "w-full h-full rounded-full")} />
    </div>
  );
};

export default CustomCheckbox;
