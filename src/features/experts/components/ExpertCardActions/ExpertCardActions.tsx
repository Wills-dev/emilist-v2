import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";

const ExpertCardActions = ({
  expertId,
  profileHref,
}: {
  expertId: string;
  profileHref?: string;
}) => {
  return (
    <div className="flex items-center w-full gap-2.5">
      <div className="flex-1">
        <Button
          variant="default"
          className="w-full  h-8 text-xs"
          href={profileHref ?? routes.marketplace.expertInfo(expertId)}
        >
          View Profile
        </Button>
      </div>
      <div className="flex-1">
        <Button variant="secondary" className="w-full flex-1 h-8 text-xs">
          Hire Expert
        </Button>
      </div>
    </div>
  );
};

export default ExpertCardActions;
