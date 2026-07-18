import ProIcon from "../icons/ProIcon";

const JoinPro = () => {
  return (
    <>
      <button className="bg-[#F0FDF5] border border-[#F1F2F9] flex items-center gap-2 py-2 px-3 rounded-[24px] text-[#176439]">
        <span>
          <ProIcon />
        </span>{" "}
        <span className="max-sm:text-sm">Join the Pro Plan</span>
        <svg
          className="w-[1em] h-[1em]"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.18182 11.022L5.01136 9.86293L8.51705 6.35724H0V4.66406H8.51705L5.01136 1.16406L6.18182 -0.000710487L11.6932 5.51065L6.18182 11.022Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </>
  );
};

export default JoinPro;
