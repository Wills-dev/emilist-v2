import type { ChangeEvent } from "react";
export const useReportCard = (onPeriodChange?: (value: string) => void) => {
  const changePeriod = (event: ChangeEvent<HTMLSelectElement>) => onPeriodChange?.(event.target.value);
  return { changePeriod };
};
