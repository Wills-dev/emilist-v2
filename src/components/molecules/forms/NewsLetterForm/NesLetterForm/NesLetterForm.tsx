"use client";

import { useSubscribeNewsLetter } from "@/lib/hooks/useSubscribeNewsLetter";

const NesLetterForm = () => {
  const { isPending, handleSubmit, email, setEmail } = useSubscribeNewsLetter();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-150.25 w-full min-w-72.5 sm:h-13.5 h-12"
    >
      <div className="flex items-center justify-between w-full h-full  rounded-lg bg-white overflow-hidden">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 w-full h-full outline-none bg-inherit placeholder:font-exo placeholder:text-[#B8B9B8] border border-[#B8B9B8] text-gray-700 focus:border-[#25C269] px-2 placeholder:max-sm:text-sm max-sm:text-sm font-exo rounded-l-lg "
          placeholder="Enter Email Address"
        />
        <button className="bg-[#25C269] h-full px-2 sm:max-w-35.5 w-full max-w-25 text-[#FBFFF8] text-center max-sm:text-xs">
          {isPending ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
};

export default NesLetterForm;
