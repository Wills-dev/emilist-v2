"use client";

import { useState } from "react";

const SavedFilterBtn = () => {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaved((prev) => !prev)}
      className="sm:w-[42.5px] w-[26.8px] sm:h-[42.5px] h-[26.8px] rounded-full bg-linear-to-b from-0% from-[#25C269] to-100% to-[#125C32] border-[0.44px] border-[#F1F2F9] flex justify-center items-center cursor-pointer"
    >
      <span
        className={`sm:text-sm text-xs sm:w-[26.5px] w-[16.8px] sm:h-[26.5px] h-[16.8px]  flex justify-center items-center rounded-full ${saved ? "bg-[#25C269]" : ""}`}
      >
        <svg
          className="w-[1em] h-[1em]"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 4.64013C0.750013 3.85536 0.969435 3.08905 1.37928 2.44241C1.78913 1.79578 2.37013 1.29924 3.04554 1.01838C3.72095 0.737513 4.45899 0.685541 5.16219 0.869322C5.8654 1.0531 6.50068 1.46399 6.98413 2.04772C7.01818 2.08723 7.05935 2.11872 7.10508 2.14025C7.15081 2.16178 7.20013 2.17289 7.24998 2.17289C7.29983 2.17289 7.34915 2.16178 7.39488 2.14025C7.44061 2.11872 7.48178 2.08723 7.51583 2.04772C7.99776 1.4602 8.63319 1.04586 9.33754 0.859842C10.0419 0.673828 10.7817 0.724964 11.4586 1.00645C12.1355 1.28793 12.7174 1.7864 13.1267 2.43553C13.536 3.08465 13.7534 3.85364 13.75 4.64013C13.75 6.2551 12.775 7.46103 11.8 8.51887L8.23018 12.2657C8.10906 12.4167 7.95973 12.5379 7.79211 12.6214C7.62449 12.7049 7.44241 12.7487 7.25797 12.75C7.07353 12.7512 6.89095 12.7099 6.72237 12.6287C6.55378 12.5475 6.40305 12.4284 6.28018 12.2791L2.69999 8.51887C1.725 7.46103 0.75 6.26215 0.75 4.64013Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

export default SavedFilterBtn;
