"use client";

import { useShallow } from "zustand/react/shallow";

import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import FormField from "@/components/molecules/FormField/FormField";
import JobBudgetField from "../JobBudgetField/JobBudgetField";
import JobDurationField from "../JobDurationField/JobDurationField";
import {
  POST_JOB_DURATION_OPTIONS,
  POST_JOB_FREQUENCY_OPTIONS,
} from "../../constants/postJob";
import { getLocalDateInputValue } from "../../helpers/postJobDates";
import { PostJobDetailsErrors } from "../../helpers/validatePostJob";
import { JobDurationUnit, JobFrequency } from "../../types/postJob";
import {
  formatInputTextNumber,
  formatInputTextNumberWithCommas,
} from "@/lib/helpers/formatNumbers";
import { usePostJobStore } from "@/store/job/postJobStore";

const JobUrgencyFields = ({
  errors,
}: {
  errors: PostJobDetailsErrors;
}) => {
  const {
    budget,
    endDate,
    jobDuration,
    jobFrequency,
    jobSchedule,
    jobUrgency,
    setBudgetField,
    setDurationField,
    setField,
    setScheduleField,
    startDate,
  } = usePostJobStore(
    useShallow((state) => ({
      budget: state.budget,
      endDate: state.endDate,
      jobDuration: state.jobDuration,
      jobFrequency: state.jobFrequency,
      jobSchedule: state.jobSchedule,
      jobUrgency: state.jobUrgency,
      setBudgetField: state.setBudgetField,
      setDurationField: state.setDurationField,
      setField: state.setField,
      setScheduleField: state.setScheduleField,
      startDate: state.startDate,
    })),
  );
  const today = getLocalDateInputValue();

  const budgetField = (
    <JobBudgetField
      amount={budget.amount}
      currency={budget.currency}
      error={errors.budget}
      label={
        jobUrgency === "right_now"
          ? "Set total budget"
          : jobUrgency === "in_future"
            ? "Set estimated budget"
            : "Set recurring budget"
      }
      onAmountChange={(value) =>
        setBudgetField("amount", formatInputTextNumberWithCommas(value))
      }
      onCurrencyChange={(value) => setBudgetField("currency", value)}
      period={jobUrgency === "regularly" ? jobFrequency : undefined}
      periodOptions={
        jobUrgency === "regularly"
          ? POST_JOB_FREQUENCY_OPTIONS
          : undefined
      }
    />
  );

  if (jobUrgency === "right_now") {
    return (
      <div className="space-y-6">
        <JobDurationField
          label="How long will the job take?"
          value={jobDuration.value}
          unit={jobDuration.unit}
          unitOptions={POST_JOB_DURATION_OPTIONS}
          error={errors.jobDuration}
          onValueChange={(value) =>
            setDurationField("value", formatInputTextNumber(value))
          }
          onUnitChange={(value) =>
            setDurationField("unit", value as JobDurationUnit)
          }
        />
        {budgetField}
      </div>
    );
  }

  if (jobUrgency === "in_future") {
    return (
      <div className="space-y-6">
        <FormField
          htmlFor="job-schedule-start"
          label="Set job schedule"
          error={errors.jobSchedule}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <Input
              id="job-schedule-start"
              name="jobScheduleStart"
              type="date"
              value={jobSchedule.startDate}
              min={today}
              max={jobSchedule.endDate || undefined}
              placeholder="Start date"
              onChange={(event) =>
                setScheduleField("startDate", event.target.value)
              }
              aria-invalid={Boolean(errors.jobSchedule)}
              aria-describedby={
                errors.jobSchedule
                  ? "job-schedule-start-description"
                  : undefined
              }
            />
            <Input
              id="job-schedule-end"
              name="jobScheduleEnd"
              type="date"
              value={jobSchedule.endDate}
              min={jobSchedule.startDate || today}
              placeholder="End date"
              onChange={(event) =>
                setScheduleField("endDate", event.target.value)
              }
              aria-invalid={Boolean(errors.jobSchedule)}
              aria-describedby={
                errors.jobSchedule
                  ? "job-schedule-start-description"
                  : undefined
              }
            />
          </div>
        </FormField>
        {budgetField}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FormField
        htmlFor="job-frequency"
        label="Job frequency"
        error={errors.jobFrequency}
      >
        <Select
          id="job-frequency"
          name="jobFrequency"
          value={jobFrequency}
          options={POST_JOB_FREQUENCY_OPTIONS}
          onChange={(event) =>
            setField("jobFrequency", event.target.value as JobFrequency)
          }
          aria-invalid={Boolean(errors.jobFrequency)}
          aria-describedby={
            errors.jobFrequency ? "job-frequency-description" : undefined
          }
        />
      </FormField>
      <FormField
        htmlFor="recurring-start-date"
        label="Set recurring schedule"
        error={errors.recurringDates}
        helperText="The end date is optional. Leave it empty for an ongoing job."
      >
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            id="recurring-start-date"
            name="startDate"
            type="date"
            value={startDate}
            min={today}
            max={endDate || undefined}
            placeholder="Start date"
            onChange={(event) => setField("startDate", event.target.value)}
            aria-invalid={Boolean(errors.recurringDates)}
            aria-describedby="recurring-start-date-description"
          />
          <Input
            id="recurring-end-date"
            name="endDate"
            type="date"
            value={endDate}
            min={startDate || today}
            placeholder="End date (optional)"
            onChange={(event) => setField("endDate", event.target.value)}
            aria-invalid={Boolean(errors.recurringDates)}
            aria-describedby="recurring-start-date-description"
          />
        </div>
      </FormField>
      {budgetField}
    </div>
  );
};

export default JobUrgencyFields;
