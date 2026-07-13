import Image from "next/image";

import FileName from "@/components/atoms/FileName/FileName";
import PaginationControls from "@/components/atoms/PaginationControls/PaginationControls";

const JobImageSliderWrapper = () => {
  return (
    <div className="space-y-4 pb-4 border-b border-[#ECECEC]">
      <div className="max-w-168.75 w-full sm:h-81.25 h-40 rounded-[16px] sm:p-2 p-1 bg-[#EDEEF0]">
        <Image
          src={"/assets/images/default-job-image.svg"}
          alt="job"
          height={309}
          width={659}
          className="object-cover h-full w-full rounded-[12px]"
        />
      </div>
      <div className="flex items-center justify-between">
        <PaginationControls
          disableNext={false}
          disablePrev={true}
          prev={() => {}}
          next={() => {}}
        />
        <p className="text-[#707471] italic text-xs">1 of 7</p>
      </div>
      <div className="flex items-center overflow-x-auto w-full gap-2 pb-1 no-scrollbar">
        <FileName fileName="chairs.jpg" />
        <FileName fileName="chairs.jpg" />
        <FileName fileName="table_1.docx" />
        <FileName fileName="desc3.pdf" />
      </div>
    </div>
  );
};

export default JobImageSliderWrapper;
