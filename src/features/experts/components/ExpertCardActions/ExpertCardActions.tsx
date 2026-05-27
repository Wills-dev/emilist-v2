import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";

const ExpertCardActions = ({ expertId }: { expertId: string }) => {
  return (
    <div className="flex items-center w-full gap-2.5">
      <Button
        variant="default"
        className="w-full flex-1 h-8 text-xs"
        href={routes?.marketplace.expertInfo(expertId)}
      >
        View Profile
      </Button>
      <Button variant="secondary" className="w-full flex-1 h-8 text-xs">
        Hire Expert
      </Button>
    </div>
  );
};

export default ExpertCardActions;
