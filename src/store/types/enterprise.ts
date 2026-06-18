import { ScheduledFormType } from "@/lib/types/enterprise";

export interface ScheduledSlice {
  scheduledForm: ScheduledFormType;

  scheduleImages: File[];
  schedulePreviews: string[];

  updateScheduleForm: (key: keyof ScheduledFormType, value: unknown) => void;
  toggleService: (value: string) => void;
  toggleLocation: (value: string) => void;

  addScheduleImages: (files: File[], preview: string[]) => void;
  removeScheduleImage: (index: number) => void;
  resetSchedule: () => void;
}
