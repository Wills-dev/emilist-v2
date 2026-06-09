const Checkbox = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (e: boolean) => void;
}) => {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />

      <div className="flex h-5 w-5 items-center justify-center rounded border border-[#474C48] peer-checked:border-[#25C269] peer-checked:bg-[#25C269]">
        <svg
          className="h-4 w-4 text-white block"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </label>
  );
};

export default Checkbox;
