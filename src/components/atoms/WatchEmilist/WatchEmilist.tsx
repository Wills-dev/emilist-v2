const WatchEmilist = () => {
  return (
    <a
      href="http://"
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-63.25 w-full whitespace-nowrap flex items-center bg-[#F4F7F5] py-1.5 pl-2 pr-2.5 rounded-[12px] gap-2"
    >
      <span className="bg-[#FF9933] w-8.75 h-8.5 rounded-[6px] flex justify-center items-center text-[#FBFFF8] text-[10px] font-exo font-bold">
        NEW
      </span>
      <span className="font-medium text-sm text-center text-[#1A201B]">
        Watch how Emilist works
      </span>
      <div className="h-5 w-5 rounded-full bg-white">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="10" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66106 5.25724C6.96002 5.08343 7.29373 5 7.66917 5C8.23927 5 8.8789 5.20162 9.56024 5.59096L13.8499 8.06604C14.9693 8.71261 15.588 9.53996 15.588 10.409C15.588 11.2781 14.9693 12.1054 13.8499 12.752L9.56024 15.2271C8.44089 15.8736 7.41193 15.9988 6.66106 15.5608C5.9102 15.1228 5.5 14.1772 5.5 12.8841V7.93394C5.5 6.64078 5.9102 5.68829 6.66106 5.25724Z"
            fill="#6667FF"
          />
        </svg>
      </div>
    </a>
  );
};

export default WatchEmilist;
