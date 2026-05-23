import OverlaySquareWrapper from "@/components/atoms/OverlaySquareWrapper/OverlaySquareWrapper";
import SquareTab from "@/components/atoms/SquareTab/SquareTab";
import Image from "next/image";

const TrustCard = ({
  id,
  title,
  desc,
  imgUrl,
  imgStyle,
}: {
  id: string;
  title: string;
  desc: string;
  imgUrl: string;
  imgStyle: string;
}) => {
  return (
    <div className="max-w-155 w-full md:min-w-145 min-w-72.5 bg-[#FBFBFB] relative overflow-hidden rounded-[24px]">
      <OverlaySquareWrapper className="left-[-34.62px] top-[16.08px] max-w-[109.66px] w-full h-[115.84px] items-center opacity-5">
        <SquareTab color="gray" />
        <SquareTab color="white" />
        <SquareTab color="gray" />
        <SquareTab color="gray" />
      </OverlaySquareWrapper>
      <OverlaySquareWrapper className="left-[456.3px] top-[39.2px] max-w-[130.67px] w-full h-35 items-center opacity-10">
        <SquareTab color="gray" />
        <SquareTab color="white" />
        <SquareTab color="gray" />
        <SquareTab color="gray" />
      </OverlaySquareWrapper>
      <div className="relative sm:p-10 p-4 flex items-center justify-between gap-6 w-full h-full">
        <div className="space-y-6 max-w-83.25 w-full">
          <p className="bg-white rounded-[36px] px-2 py-0.75 font-medium sm:text-sm text-xs tracking-[-2%] w-fit">
            {id}
          </p>
          <h6 className="font-exo sm:text-[24px] text-lg font-bold text-[#18A154]">
            {title}
          </h6>
          <p className="max-sm:text-sm font-medium tracking-[-3%]">{desc}</p>
        </div>
        <div className={`sm:min-h-21.5 h-16 ${imgStyle}`}>
          <Image
            src={imgUrl}
            alt={title}
            width={95}
            height={85}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TrustCard;
