import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";

const JobCardActions = ({
  jobId,
  detailsHref,
}: {
  jobId: string;
  detailsHref?: string;
}) => {
  return (
    <div className="flex items-center w-full gap-2.5">
      <div className="flex-1 w-full">
        {" "}
        <Button
          variant="default"
          className="w-full h-8 text-xs"
          href={detailsHref ?? routes.marketplace.jobInfo(jobId)}
        >
          View More
        </Button>
      </div>
      <div className="flex-1 w-full">
        <Button variant="secondary" className="w-full h-8 text-xs">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCardActions;
