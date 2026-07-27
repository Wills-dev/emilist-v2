const OrderActionBtn = ({
  title,
  onClick,
  className = "text-[#737774]",
}: {
  title: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 bg-[#F6F7F9] rounded-[6.75px] px-[8.75px] h-7 sm:text-xs text-[10px] font-medium ${className}`}
    >
      <span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_9584_208148)">
            <path
              d="M6.99935 3.5V8.16667L8.74935 6.41667L10.4993 8.16667V3.5M11.666 11.6667C11.9754 11.6667 12.2722 11.5438 12.491 11.325C12.7098 11.1062 12.8327 10.8094 12.8327 10.5V4.66667C12.8327 4.35725 12.7098 4.0605 12.491 3.84171C12.2722 3.62292 11.9754 3.5 11.666 3.5H7.05768C6.86257 3.50191 6.67008 3.45486 6.49786 3.36314C6.32563 3.27142 6.17916 3.13797 6.07185 2.975L5.59935 2.275C5.49312 2.11369 5.3485 1.98128 5.17847 1.88965C5.00845 1.79802 4.81833 1.75003 4.62518 1.75H2.33268C2.02326 1.75 1.72652 1.87292 1.50772 2.09171C1.28893 2.3105 1.16602 2.60725 1.16602 2.91667V10.5C1.16602 10.8094 1.28893 11.1062 1.50772 11.325C1.72652 11.5438 2.02326 11.6667 2.33268 11.6667H11.666Z"
              stroke="currentColor"
              strokeWidth="1.17"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_9584_208148">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      <span>{title}</span>
    </button>
  );
};

export default OrderActionBtn;
