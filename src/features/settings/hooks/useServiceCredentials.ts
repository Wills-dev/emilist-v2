"use client";
import { useRef, useState, type MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { deleteBusinessItem } from "@/features/businesses/api/deleteBusinessItem";
import { businessKeys } from "@/features/businesses/queries/businessKeys";
import { serviceCredentials, credentialKeys, type CredentialType } from "../helpers/serviceCredentials";
import type { UserExpertService } from "../types/expertService";

export const useServiceCredentials = (expert: UserExpertService, onUpdate: (expert: UserExpertService) => void) => {
  const sections = serviceCredentials(expert);
  const [target, setTarget] = useState<{ type: CredentialType; id: string; title: string } | null>(null);
  const pending = useRef(false);
  const client = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  const mutation = useMutation({
    mutationFn: deleteBusinessItem,
    onSuccess: async (_, variables) => {
      const key = credentialKeys[variables.itemType as CredentialType];
      onUpdate({ ...expert, [key]: expert[key].filter((item) => item.id !== variables.itemId) });
      setTarget(null);
      await Promise.all([client.invalidateQueries({ queryKey: ["user-businesses", userId] }), client.invalidateQueries({ queryKey: businessKeys.all })]);
      toast.success("Credential deleted successfully.");
    },
    onError: promiseErrorFunction,
    onSettled: () => { pending.current = false; },
  });
  const requestDelete = (event: MouseEvent<HTMLButtonElement>) => {
    if (pending.current) return;
    const type = event.currentTarget.dataset.type as CredentialType;
    const id = event.currentTarget.dataset.id;
    const item = sections.find((section) => section.type === type)?.items.find((item) => item.id === id);
    if (item?.id) setTarget({ type, id: item.id, title: item.title });
  };
  const changeOpen = (open: boolean) => { if (!open && !pending.current) setTarget(null); };
  const confirmDelete = () => {
    if (!target || pending.current) return;
    pending.current = true;
    mutation.mutate({ businessId: expert.id, itemId: target.id, itemType: target.type });
  };
  return { sections, target, busy: mutation.isPending, requestDelete, changeOpen, confirmDelete };
};
