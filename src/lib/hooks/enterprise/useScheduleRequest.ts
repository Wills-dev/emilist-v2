import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { scheduleRequest } from "@/lib/api/enterprise";
import { validateImage } from "@/lib/helpers/imageValidation";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { validateScheduleRequest } from "@/lib/helpers/validateScheduleRequest";
import { ApiErrorResponse } from "@/lib/types/error";
import { useScheduledStore } from "@/store/enterprise/scheduledStore";
import { SubmitEvent } from "react";

export const useScheduleRequest = () => {
  const router = useRouter();

  const { scheduledForm, scheduleImages } = useScheduledStore(
    useShallow((state) => ({
      scheduledForm: state.scheduledForm,
      scheduleImages: state.scheduleImages,
    })),
  );

  const addScheduleImages = useScheduledStore(
    (state) => state.addScheduleImages,
  );
  const resetSchedule = useScheduledStore((state) => state.resetSchedule);

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      const error = validateImage(file);
      if (error) return toast.error(error);
    }

    const previews = files.map((file) => URL.createObjectURL(file));

    addScheduleImages(files, previews);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleRequest,
    onSuccess: () => {
      resetSchedule();
      router.push(routes?.enterprise?.success);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error scheduling a request", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const scheduleRquestValid = validateScheduleRequest(scheduledForm);

    if (!scheduleRquestValid) return;

    mutate({ form: scheduledForm, images: scheduleImages });
  };

  return { handleChangeImages, handleSubmit, isPending };
};
