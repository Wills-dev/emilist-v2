import React from "react";

const ExpertiseFormAction = ({
  title,
  isCollapse,
  toggleView,
  removeForm,
}: {
  title: string;
  isCollapse: boolean;
  toggleView: () => void;
  removeForm: () => void;
}) => {
  return (
    <div className="flex justify-between items-center gap-10">
      <h6 className="font-exo font-semibold max-sm:text-sm">{title}</h6>
      <div className="flex items-center gap-6">
        <button
          onClick={toggleView}
          type="button"
          className="flex items-center gap-2"
        >
          <span className="block text-[#737774]">
            {isCollapse ? "Hide" : "Show"}
          </span>
          <span
            className={`block transition-all duration-300 ${isCollapse ? "rotate-180" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
        <button onClick={removeForm} className="text-red-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExpertiseFormAction;
