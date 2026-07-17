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

  const guardedSubmit = <T extends object>(
    formData: T,
    onAuthorized: (data: T) => void,
  ) => {
    const { currentUser } = useStore.getState();

    if (!currentUser) {
      setPendingFlow(
        flowType,
        formData as Record<string, unknown>,
        currentPath,
        useModal,
      );
      if (!useModal) {
        router.push(
          `${routes.login}?redirect=${encodeURIComponent(currentPath)}&flow=${flowType}`,
        );
      }
      return;
    }

    if (flowType !== "register-expert" && !currentUser.isProfileComplete) {
      setPendingFlow(
        flowType,
        formData as Record<string, unknown>,
        currentPath,
        useModal,
      );
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
