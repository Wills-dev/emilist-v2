import Dot from "@/components/atoms/Dot/Dot";

const FormStepIndicator = ({
  currentStep,
  onSelect,
}: {
  currentStep: 1 | 2;
  onSelect: (step: 1 | 2) => void;
}) => {
  return (
    <div
      className="flex h-7.5 w-fit items-center gap-1.5 rounded-[9px] bg-[#F4F7F5] p-2.25"
      aria-label={`Step ${currentStep} of 2`}
    >
      {([1, 2] as const).map((step) => (
        <button
          key={step}
          type="button"
          onClick={() => onSelect(step)}
          aria-label={`Go to step ${step}`}
          aria-current={currentStep === step ? "step" : undefined}
          className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25C269]"
        >
          <Dot
            className="size-3"
            variant={currentStep === step ? "primary" : "default"}
          />
        </button>
      ))}
    </div>
  );
};

export default FormStepIndicator;
