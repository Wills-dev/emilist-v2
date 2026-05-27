import VerifyIcon from "../icons/VerifyIcon";

const ItemName = ({
  title,
  isVerified,
}: {
  title: string;
  isVerified?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <h6 className="font-exo font-semibold w-full truncate">{title}</h6>
      {isVerified && (
        <span className="sm:text-[20px] text-base block">
          <VerifyIcon />
        </span>
      )}
    </div>
  );
};

export default ItemName;
