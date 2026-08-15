import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import FormField from "@/components/molecules/FormField/FormField";
import { currencies } from "@/lib/constants/currencies";
import { selectOption } from "@/lib/types";

const JobBudgetField = ({
  amount,
  currency,
  error,
  label,
  onAmountChange,
  onCurrencyChange,
  period,
  periodOptions,
}: {
  amount: string;
  currency: string;
  error?: string;
  label: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  period?: string;
  periodOptions?: selectOption[];
}) => {
  const errorId = error ? "job-budget-description" : undefined;

  return (
    <FormField htmlFor="job-budget" label={label} error={error}>
      <div
        className={`grid gap-2.5 ${period && periodOptions ? "grid-cols-[minmax(78px,1fr)_minmax(0,2fr)_minmax(92px,1fr)]" : "grid-cols-[minmax(82px,1fr)_minmax(0,3fr)]"}`}
      >
        <Select
          id="job-currency"
          name="jobCurrency"
          value={currency}
          onChange={(event) => onCurrencyChange(event.target.value)}
          options={currencies}
          variant="tertiary"
          aria-label="Budget currency"
        />
        <Input
          id="job-budget"
          name="jobBudget"
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(event) => onAmountChange(event.target.value)}
          placeholder="Enter amount"
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        />
        {period && periodOptions && (
          <Select
            id="recurring-budget-period"
            name="recurringBudgetPeriod"
            value={period}
            options={periodOptions}
            disabled
            aria-label="Recurring budget period"
            className="capitalize"
          />
        )}
      </div>
    </FormField>
  );
};

export default JobBudgetField;
