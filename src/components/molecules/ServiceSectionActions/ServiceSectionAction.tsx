import Link from "next/link";

import NavLink from "@/components/atoms/NavLink/NavLink";

import { sectionServiceActions } from "@/lib/constants";

const ServiceSectionAction = ({
  currentService,
  setCurrentService,
}: {
  currentService: "jobs" | "materials" | "experts";
  setCurrentService: (value: "jobs" | "materials" | "experts") => void;
}) => {
  const isCurrentService = sectionServiceActions[currentService];

  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className="flex items-center gap-2 flex-1">
        <NavLink
          title={sectionServiceActions.experts.title}
          activeTab={currentService === "experts"}
          onClick={() => setCurrentService("experts")}
        />
        <NavLink
          title={sectionServiceActions.jobs.title}
          activeTab={currentService === "jobs"}
          onClick={() => setCurrentService("jobs")}
        />
        <NavLink
          title={sectionServiceActions.materials.title}
          activeTab={currentService === "materials"}
          onClick={() => setCurrentService("materials")}
        />
      </div>
      <div className="flex justify-end flex-1">
        <Link
          href={isCurrentService?.href}
          className="text-[#6667FF] hover:text-purple-600 duration-300 transition-all ease-out font-medium max-sm:text-xs underline whitespace-nowrap"
        >
          See all →
        </Link>
      </div>
    </div>
  );
};

export default ServiceSectionAction;
