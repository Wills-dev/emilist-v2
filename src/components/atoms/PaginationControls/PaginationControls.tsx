import ArrowBack from "../icons/ArrowBack/ArrowBack";

const PaginationControls = ({
  disablePrev,
  disableNext,
  next,
  prev,
}: {
  disablePrev: boolean;
  disableNext: boolean;
  next: () => void;
  prev: () => void;
}) => {
  return (
    <div className="flex items-center gap-4 text-[#707471]">
      <button
        type="button"
        aria-label="Previous page"
        disabled={disablePrev}
        onClick={prev}
        className="disabled:opacity-45 cursor-pointer"
      >
        <ArrowBack />
      </button>
      <button
        type="button"
        aria-label="Next page"
        disabled={disableNext}
        onClick={next}
        className="rotate-180 disabled:opacity-45 cursor-pointer"
      >
        <ArrowBack />
      </button>
    </div>
  );
};

export default PaginationControls;
