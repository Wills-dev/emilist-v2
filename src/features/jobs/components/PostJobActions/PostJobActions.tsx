import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import { routes } from "@/lib/helpers/routes";

const PostJobActions = ({
  currentStep,
  isPending,
  onBack,
  submitLabel = "Post your job",
  cancelHref = routes.dashboard,
  cancelLabel = "Go to Dashboard",
}: {
  currentStep: 1 | 2;
  isPending: boolean;
  onBack: () => void;
  submitLabel?: string;
  cancelHref?: string;
  cancelLabel?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-6">
      <Button
        variant="primary"
        type="submit"
        className="h-11 w-full"
        loading={isPending}
      >
        {currentStep === 1 ? "Proceed" : submitLabel}
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
        href={cancelHref}
        className="hidden items-center gap-1 font-exo text-sm font-semibold text-[#18A154] hover:underline sm:flex"
      >
        {cancelLabel} <ArrowRight className="size-4" />
      </Link>
      <Link
        href={cancelHref}
        className="flex h-11 w-full items-center justify-center gap-1 rounded-[10px] border border-[#25C269] font-exo text-sm font-semibold text-[#18A154] sm:hidden"
      >
        <ArrowLeft className="size-4" /> {cancelLabel}
      </Link>
    </div>
  );
};

export default PostJobActions;
