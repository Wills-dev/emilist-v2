import PostJobIcon from "@/components/atoms/icons/PostJobIcon";
import FormStepIndicator from "@/components/molecules/FormStepIndicator/FormStepIndicator";

const PostJobHeader = ({
  currentStep,
  onSelectStep,
}: {
  currentStep: 1 | 2;
  onSelectStep: (step: 1 | 2) => void;
}) => {
  return (
    <header className="w-full space-y-4 border-b border-[#E5E5E5] pb-4">
      <div className="flex items-center gap-4">
        <span className="flex size-8.5 items-center justify-center rounded-[9px] bg-[#F4F7F5] text-base text-[#474C48]">
          <PostJobIcon />
        </span>
        <h1 className="font-exo text-2xl font-bold leading-9 sm:text-[30px]">
          Post a job
        </h1>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="text-sm leading-6 text-[#737774] sm:text-base">
          Tell us more about your project
        </p>
        <FormStepIndicator
          currentStep={currentStep}
          onSelect={onSelectStep}
        />
      </div>
    </header>
  );
};

export default PostJobHeader;
