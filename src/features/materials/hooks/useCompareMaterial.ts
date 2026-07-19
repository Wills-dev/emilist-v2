import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { compareMaterial } from "../api";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";

export const useCompareMaterial = () => {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending } = useMutation({
    mutationFn: compareMaterial,
    onSuccess: () => {
      toast.success("Material added for comparison.");
      router.push(routes.dashboardLinks.materialsCompare);
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleCompare = (materialId: string) => {
    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }

    mutate(materialId);
  };

  return { handleCompare, isComparing: isPending };
};
