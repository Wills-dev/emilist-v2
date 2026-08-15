import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import { routes } from "@/lib/helpers/routes";

const PostJobActions = ({
  currentStep,
  isPending,
  onBack,
}: {
  currentStep: 1 | 2;
  isPending: boolean;
  onBack: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-6">
      <Button
        variant="primary"
        type="submit"
        className="h-11 w-full"
        loading={isPending}
      >
        {currentStep === 1 ? "Proceed" : "Post your job"}
      </Button>

      {currentStep === 2 && (
        <button
          type="button"
          onClick={onBack}
          disabled={isPending}
          className="inline-flex min-h-11 items-center justify-center gap-1 px-4 font-exo text-sm font-semibold text-[#18A154] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="size-4" /> Back to job details
        </button>
      )}

      <Link
        href={routes.dashboard}
        className="hidden items-center gap-1 font-exo text-sm font-semibold text-[#18A154] hover:underline sm:flex"
      >
        Go to Dashboard <ArrowRight className="size-4" />
      </Link>
      <Link
        href={routes.dashboard}
        className="flex h-11 w-full items-center justify-center gap-1 rounded-[10px] border border-[#25C269] font-exo text-sm font-semibold text-[#18A154] sm:hidden"
      >
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>
    </div>
  );
};

export default PostJobActions;
