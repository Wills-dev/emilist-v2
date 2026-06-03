import { useRouter } from "next/navigation";
import { useStore, FlowType } from "@/store/authStore";
import { routes } from "../helpers/routes";

interface ProtectedSubmitOptions {
  useModal?: boolean;
}

export function useProtectedSubmit(
  flowType: FlowType,
  currentPath: string,
  options: ProtectedSubmitOptions = {},
) {
  const { useModal = false } = options;
  const router = useRouter();
  const setPendingFlow = useStore((state) => state.setPendingFlow);

  const guardedSubmit = (
    formData: Record<string, unknown>,
    onAuthorized: (data: Record<string, unknown>) => void,
  ) => {
    const { currentUser } = useStore.getState();

    if (!currentUser) {
      // Save form data and open login modal OR redirect to auth page
      setPendingFlow(flowType, formData, currentPath, useModal);

      if (!useModal) {
        router.push(
          `${routes.login}?redirect=${encodeURIComponent(currentPath)}&flow=${flowType}`,
        );
      }
      // If useModal=true, setPendingFlow already set activeModal='login'
      return;
    }

    if (flowType !== "register-expert" && !currentUser.profileComplete) {
      // Save form data and open profile modal OR redirect
      setPendingFlow(flowType, formData, currentPath, useModal);

      if (!useModal) {
        router.push(
          `${routes.completeProfile}?redirect=${encodeURIComponent(currentPath)}`,
        );
      } else {
        useStore.getState().openModal("complete-profile");
      }
      return;
    }

    onAuthorized(formData);
  };

  return { guardedSubmit };
}
