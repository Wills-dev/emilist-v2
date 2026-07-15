import HandIcon from "../icons/HandIcon";

const ReviewCommentActions = ({
  variant,
  id,
}: {
  variant: "small" | "large";
  id: string;
}) => {
  const variants = {
    small: "text-xs",
    large: "sm:text-sm text-xs",
  };

  const styles = variants[variant];

  const handleHelpful = () => {
    console.log("id", id);
  };

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={handleHelpful}
        className="flex items-center gap-2 text-[#25C269]"
      >
        <span className="text-xl">
          <HandIcon />
        </span>
        <span className={`${styles}`}>Helpful</span>
      </button>
      <button
        type="button"
        onClick={handleHelpful}
        className="flex items-center gap-2 text-[#FF5D7A]"
      >
        <span className="text-xl rotate-180">
          <HandIcon />
        </span>
        <span className={`${styles}`}>Not Helpful</span>
      </button>
    </div>
  );
};

export default ReviewCommentActions;
