import InfoItem from "@/components/atoms/InfoItem/InfoItem";

const CompareInfo = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  value: string;
}) => (
  <div className="flex h-10 items-center gap-2 text-[#737774]">
    <span className="[&_svg]:size-4">{icon}</span>
    <div className="min-w-0 flex-1 rounded-md bg-[#FBFBFB] px-2 py-2">
      <InfoItem label={label} value={value} variant="xs" className="min-w-0" />
    </div>
  </div>
);

export default CompareInfo;
