import CalendarIcon from "@/components/atoms/icons/CalendarIcon";

const DashboardDateCard = ({ compact = false }: { compact?: boolean }) => {
  const date = new Date();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const fullDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`flex flex-col justify-between bg-linear-to-b from-[#25C269] to-[#125C32] text-white ${
        compact ? "h-full min-h-24 p-2" : "min-h-36 p-4 sm:min-h-41.5"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex-col items-center gap-2.25 bg-white/15 border border-white/60 w-18.5 h-18.5 justify-center ${
            compact ? "hidden" : "flex"
          }`}
        >
          <span className="text-2xl">
            <CalendarIcon />
          </span>

          <span className="text-sm">Date</span>
        </div>
        <div className={`text-center text-xs ${compact ? "mx-auto" : ""}`}>
          <p>{month}</p>
          <p className="my-1 grid size-9.25 place-items-center rounded-full border-[0.65px] border-white text-xl bg-white/15">
            {day}
          </p>
          <p className="font-medium">{year}</p>
        </div>
      </div>
      {!compact && <p className="font-exo text-xl font-semibold">{fullDate}</p>}
    </div>
  );
};

export default DashboardDateCard;
