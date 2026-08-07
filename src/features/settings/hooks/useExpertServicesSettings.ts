"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { userExpertServices } from "../constants/expertServices";
import { updateExpertBusiness } from "../api";

export const useExpertServicesSettings = () => {
  const [experts, setExperts] = useState(userExpertServices);
  const [activeId, setActiveId] = useState(userExpertServices[0].id);
  const activeExpert = experts.find((expert) => expert.id === activeId) ?? experts[0];
  const updateExpertLocally = (updated: typeof activeExpert) =>
    setExperts((items) =>
      items.map((item) => (item.id === updated.id ? updated : item)),
    );
  const mutation = useMutation({ mutationFn: updateExpertBusiness, onSuccess: (_, updated) => { setExperts((items) => items.map((item) => item.id === updated.id ? updated : item)); toast.success("Expert service updated successfully."); }, onError: promiseErrorFunction });
  return { experts, activeId, setActiveId, activeExpert, updateExpertLocally, saveExpert: mutation.mutate, isSaving: mutation.isPending };
};
