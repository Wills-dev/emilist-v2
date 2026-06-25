import Link from "next/link";

import { routes } from "@/lib/helpers/routes";

import ArrowBack from "../icons/ArrowBack";

const BackHomeBtn = () => {
  return (
    <div className="flex justify-center col-span-2">
      <Link
        href={routes.home}
        className="flex items-center gap-2 text-[#18A154] font-exo font-semibold hover:underline duration-300 transition-all"
      >
        <span className="text-sm">
          <ArrowBack />
        </span>
        <span>Back to Homepage</span>
      </Link>
    </div>
  );
};

export default BackHomeBtn;
