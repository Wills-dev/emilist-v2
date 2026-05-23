import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";

const JobCardActions = ({ jobId }: { jobId: string }) => {
  return (
    <div className="flex items-center w-full gap-2.5">
      <Button
        variant="default"
        className="w-full flex-1 h-8 text-xs"
        href={routes?.marketplace.jobInfo(jobId)}
      >
        View More
      </Button>
      <Button variant="secondary" className="w-full flex-1 h-8 text-xs">
        Apply Now
      </Button>
    </div>
  );
};

export default JobCardActions;
