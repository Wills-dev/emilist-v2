const InfoRow = ({
  showDot,
  title,
  value,
}: {
  showDot: boolean;
  title: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      {showDot && (
        <div className="w-1.5 h-1.5 min-w-1.5 bg-[#8A8D8B] rounded-full" />
      )}
      <p className="w-fit text-sm text-[#5E625F]">{title}</p>
      <p className="w-fit text-sm font-medium">{value}</p>
    </div>
  );
};

export default InfoRow;
