const CounterButton = ({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactElement;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`sm:w-6.75 w-5 sm:h-6.75 h-5 rounded-full sm:text-sm cursor-pointer flex justify-center items-center border ${disabled ? "border-gray-300 text-gray-300" : "border-[#767998] text-[#5D6771]"}`}
    >
      {icon}
    </button>
  );
};

export default CounterButton;
