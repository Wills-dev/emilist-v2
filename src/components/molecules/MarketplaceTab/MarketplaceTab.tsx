import Tab from "../../atoms/Tab/Tab";

const MarketplaceTab = ({
  tabContent,
}: {
  tabContent: { label: string; link: string }[];
}) => {
  return (
    <div className="w-full flex items-center justify-between sm:gap-2 bg-[#F6F7F9] p-0.5 rounded-[16px]">
      {tabContent?.map((item) => (
        <Tab key={item.label} label={item.label} link={item.link} />
      ))}
    </div>
  );
};

export default MarketplaceTab;
