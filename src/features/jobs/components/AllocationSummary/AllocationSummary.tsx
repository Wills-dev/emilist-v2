import clsx from "clsx";

const AllocationSummary = ({
  title,
  parts,
  error,
  compact = false,
}: {
  title: string;
  parts: string[];
  error?: string;
  compact?: boolean;
}) => {
  const message = error ?? parts.join(" • ");

  return (
    <div
      className={clsx(
        "rounded-[10px] border text-xs leading-5",
        compact ? "px-2.5 py-2" : "px-3 py-2.5",
        error
          ? "border-[#FECACA] bg-[#FFF7F7] text-[#B42318]"
          : "border-[#DCEFE4] bg-[#F4FBF7] text-[#47574E]",
      )}
      role={error ? "alert" : "status"}
    >
      {compact ? (
        <p>
          <span className="font-semibold">{title}: </span>
          {message}
        </p>
      ) : (
        <>
          <p className="font-semibold">{title}</p>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default AllocationSummary;
