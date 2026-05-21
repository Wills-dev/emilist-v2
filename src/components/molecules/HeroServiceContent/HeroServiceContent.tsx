import HeroSeviceItem from "@/components/atoms/HeroSeviceItem/HeroSeviceItem";

import { heroSeviceContent } from "@/lib/constants";

const HeroServiceContent = () => {
  return (
    <div className="flex justify-center items-center flex-wrap md:gap-10 sm:gap-8 gap-6 pt-[56px]">
      {heroSeviceContent?.map((item, index) => (
        <HeroSeviceItem
          key={index}
          title={item.title}
          imgUrl={item?.imgUrl}
          desc={item?.desc}
          icon={item?.icon}
          href={item?.href}
        />
      ))}
    </div>
  );
};

export default HeroServiceContent;
