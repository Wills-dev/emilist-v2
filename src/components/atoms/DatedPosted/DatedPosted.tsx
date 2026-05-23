import { formatCreatedAt } from "@/lib/helpers/formatDate";

const DatedPosted = ({ date }: { date: string }) => {
  const formattedDate = formatCreatedAt(date);

  return (
    <p className="italic text-xs text-[#707471] w-fit">
      Posted {formattedDate}
    </p>
  );
};

export default DatedPosted;
