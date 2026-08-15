import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import FormField from "@/components/molecules/FormField/FormField";
import { selectOption } from "@/lib/types";

const JobDurationField = ({
  error,
  label,
  onUnitChange,
  onValueChange,
  unit,
  unitOptions,
  value,
}: {
  error?: string;
  label: string;
  onUnitChange: (value: string) => void;
  onValueChange: (value: string) => void;
  unit: string;
  unitOptions: selectOption[];
  value: string;
}) => {
  const errorId = error ? "job-duration-description" : undefined;

  return (
    <FormField htmlFor="job-duration" label={label} error={error}>
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(112px,1fr)] gap-2.5">
        <Input
          id="job-duration"
          name="jobDuration"
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Enter duration"
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        />
        <Select
          id="job-duration-unit"
          name="jobDurationUnit"
          value={unit}
          onChange={(event) => onUnitChange(event.target.value)}
          options={unitOptions}
          aria-label="Job duration unit"
        />
      </div>
    </FormField>
  );
};

export default JobDurationField;
