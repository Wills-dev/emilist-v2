import Container from "@/components/atoms/Container/Container";
import Binoculars from "@/components/atoms/icons/Binoculars";
import SearchGreen from "@/components/atoms/icons/SearchGreen";
import Streamline from "@/components/atoms/icons/Streamline";
import Truck from "@/components/atoms/icons/Truck";
import MarketIconWrap from "@/components/atoms/MarketIconWrap/MarketIconWrap";

import Image from "next/image";

const MarketplaceBanner = ({
  className = "bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32]",
  bgText,
  endText,
  src,
  type,
}: {
  className?: string;
  bgText: string;
  endText: string;
  src: string;
  type: "jobs" | "materials" | "experts";
}) => {
  return (
    <div className={`sm:min-h-74.5 h-fit  w-full ${className}`}>
      <Container>
        <div className="flex max-xl:flex-col items-center">
          <div className="max-w-231 w-full space-y-1 sm:py-20 pt-6 pb-4">
            <h2 className="font-exo font-semibold text-[clamp(0.8rem,5vw,3.375rem)] flex items-center sm:gap-6 gap-2 text-[#F2F4F0] flex-wrap">
              <span>Find</span>{" "}
              <MarketIconWrap
                icon={<SearchGreen />}
                className="sm:w-23 sm:h-15 w-10.5 h-8 sm:text-[35.32px] text-base"
              />{" "}
              <span>{bgText}</span>
            </h2>
            <h2 className="font-exo font-semibold text-[clamp(0.8rem,5vw,3.375rem)] flex items-center sm:gap-6 gap-2 text-[#F2F4F0]">
              {" "}
              <span className="flex items-center sm:gap-2 gap-1">
                <MarketIconWrap icon={<Binoculars />} />
                <MarketIconWrap icon={<Streamline />} />
                <MarketIconWrap icon={<Truck />} />
              </span>
              <span>{endText}</span>
            </h2>
          </div>
          <div className="">
            <div className="sm:w-87.5 w-50 sm:h-74.5 h-40 relative overflow-hidden">
              <div className="h-full w-full ">
                <Image
                  src={src}
                  alt={type}
                  width={350}
                  height={350}
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketplaceBanner;
