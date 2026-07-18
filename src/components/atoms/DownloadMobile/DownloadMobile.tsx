import ArrowUp from "../icons/ArrowUp";

const DownloadMobile = () => {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#ECECEC66] rounded-[5.96px] sm:px-3 px-2 h-11 w-full flex items-center justify-between"
    >
      <div className="flex items-center sm:gap-3 gap-2">
        <span className="sm:text-xl">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0013 15.0013H10.0096M5.83464 1.66797H14.168C15.0884 1.66797 15.8346 2.41416 15.8346 3.33464V16.668C15.8346 17.5884 15.0884 18.3346 14.168 18.3346H5.83464C4.91416 18.3346 4.16797 17.5884 4.16797 16.668V3.33464C4.16797 2.41416 4.91416 1.66797 5.83464 1.66797Z"
              stroke="#474C48"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-exo text-[#474C48] text-sm">
          Download Mobile App
        </span>
      </div>
      <div className="">
        <ArrowUp />
      </div>
    </a>
  );
};

export default DownloadMobile;
