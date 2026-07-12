const FlagActionBtn = ({
  onClick,
  actionTitle,
}: {
  onClick: () => void;
  actionTitle: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 underline font-medium text-[#474C48] cursor-pointer max-sm:text-sm"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33203 18.3337V3.33366C3.33203 3.20429 3.36215 3.07669 3.42001 2.96098C3.47786 2.84527 3.56187 2.74461 3.66536 2.66699C4.53085 2.01788 5.58351 1.66699 6.66536 1.66699C9.16536 1.66699 10.832 3.33366 12.7762 3.33366C13.8873 3.33366 14.7393 3.11144 15.332 2.66699C15.4558 2.57414 15.6031 2.51759 15.7572 2.50369C15.9113 2.48979 16.0663 2.51909 16.2047 2.5883C16.3431 2.65751 16.4595 2.7639 16.5409 2.89555C16.6223 3.0272 16.6654 3.1789 16.6654 3.33366V11.667C16.6654 11.7964 16.6352 11.924 16.5774 12.0397C16.5195 12.1554 16.4355 12.256 16.332 12.3337C15.4666 12.9828 14.4139 13.3337 13.332 13.3337C10.832 13.3337 9.16536 11.667 6.66536 11.667C5.43546 11.667 4.24872 12.1204 3.33203 12.9403"
          stroke="#FF5D7A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{actionTitle}</span>
    </button>
  );
};

export default FlagActionBtn;
