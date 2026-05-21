import HeroDescription from "@/components/atoms/HeroDescription/HeroDescription";
import HeroTitle from "@/components/atoms/HeroTitle/HeroTitle";

const HeroContent = () => {
  return (
    <div className="max-w-260 w-full space-y-2 overflow-hidden pb-4">
      <HeroTitle />
      <HeroDescription />
    </div>
  );
};

export default HeroContent;
